import { useState, useEffect, useRef, useCallback } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { PATH } from '@/constants/paths';

const MIN_BPM = 40;
const MAX_BPM = 280;

const RHYTHM_PRESETS = [
  { name: '1/4', value: 1 },
  { name: '2/4', value: 2 },
  { name: '3/4', value: 3 },
  { name: '4/4', value: 4 },
  { name: '6/8', value: 6 },
];

const Metronome = ({ className }: { className?: string }) => {
  const [bpm, setBpm] = useState(120);
  const [isRunning, setIsRunning] = useState(false);
  const [beatCount, setBeatCount] = useState(0);
  const [beatsPerMeasure, setBeatsPerMeasure] = useState(4);
  const [hiddenMetronome, setHiddenMetronome] = useState(false);
  const [animate, setAnimate] = useState(false);

  const audioContextRef = useRef<AudioContext | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const beatCountRef = useRef(beatCount);

  // Синхронизация beatCountRef
  useEffect(() => {
    beatCountRef.current = beatCount;
  }, [beatCount]);

  // Анимация кнопки при монтировании
  useEffect(() => {
    setAnimate(true);
    const timeout = setTimeout(() => setAnimate(false), 3700);
    return () => clearTimeout(timeout);
  }, []);

  // Сброс счетчика при смене размера такта или bpm
  useEffect(() => {
    setBeatCount(0);
  }, [beatsPerMeasure, bpm]);

  // Таймер метронома
  useEffect(() => {
    if (isRunning) {
      const interval = (60 / bpm) * 1000;
      timerRef.current = setInterval(playBeat, interval);
    } else {
      clearTimer();
    }
    return clearTimer;
  }, [isRunning, bpm, beatsPerMeasure]);

  // Инициализация AudioContext
  const initAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    }

    if (audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }
  }, []);

  // Очистка таймера
  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  // Воспроизведение звука
  const playSound = useCallback((frequency: number, duration: number) => {
    if (!audioContextRef.current) return;
    const oscillator = audioContextRef.current.createOscillator();
    const gainNode = audioContextRef.current.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.value = frequency;
    gainNode.gain.value = 0.5;

    oscillator.connect(gainNode);
    gainNode.connect(audioContextRef.current.destination);

    oscillator.start();
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContextRef.current.currentTime + duration);
    oscillator.stop(audioContextRef.current.currentTime + duration);
  }, []);

  // Воспроизведение доли
  const playBeat = useCallback(() => {
    const isStrongBeat = beatCountRef.current % beatsPerMeasure === 0;
    playSound(isStrongBeat ? 1200 : 800, isStrongBeat ? 0.1 : 0.05);
    setBeatCount(prev => (prev + 1) % beatsPerMeasure);
  }, [beatsPerMeasure, playSound]);

  // Старт/стоп метронома
  const toggleMetronome = useCallback(() => {
    initAudioContext();
    setIsRunning(prev => {
      if (!prev) setBeatCount(0);
      return !prev;
    });
  }, [initAudioContext]);

  // Управление BPM
  const handleBpmChange = useCallback((value: number) => {
    setBpm(Math.max(MIN_BPM, Math.min(MAX_BPM, value)));
  }, []);

  return (
    <div
      className={`absolute top-1/2 right-0 flex items-center ${animate ? 'animate-bounce-left-twice' : ''} ${hiddenMetronome ? 'w-0' : ''}`}>
      <Button
        type="button"
        onClick={() => setHiddenMetronome(!hiddenMetronome)}
        className={`right-0 flex h-[140px] w-4 flex-col gap-6 rounded-tr-none rounded-br-none border-1 border-gray-100 bg-white text-black shadow-2xl duration-300 hover:border-0 hover:bg-yellow-400 hover:text-white ${hiddenMetronome ? 'absolute right-0' : ''} `}>
        <span className="mb-6 rotate-90 transform pl-12 whitespace-nowrap">Метроном</span>
        {hiddenMetronome ? <span className="text-2xl">&#10563;</span> : <span className="text-2xl">&#10562;</span>}
      </Button>
      <div
        className={`top-0 right-full z-10 mr-4 mb-4 flex flex-col items-center gap-2 rounded-lg border border-gray-100 bg-white p-2 shadow-md transition-all duration-300 ease-in-out ${hiddenMetronome ? 'pointer-events-none translate-x-4 opacity-0' : 'translate-x-0 opacity-100'} ${className} `}>
        <img className="h-25" src={PATH.METRONOME_IMG} alt="Metronome Icon" />
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <div className="flex items-center justify-center gap-2">
            <Button
              type="button"
              onClick={() => handleBpmChange(bpm - 1)}
              className="bg-white-600 flex h-8 w-8 items-center justify-center rounded-full border-1 border-black text-black duration-300 hover:bg-black hover:text-white hover:shadow-xl">
              -
            </Button>
            <p className="font-mono text-xl">{bpm} BPM</p>
            <Button
              type="button"
              onClick={() => handleBpmChange(bpm + 1)}
              className="bg-white-600 flex h-8 w-8 items-center justify-center rounded-full border-1 border-black text-black duration-300 hover:bg-black hover:text-white hover:shadow-xl">
              +
            </Button>
          </div>
          <Slider
            defaultValue={[120]}
            step={1}
            onValueChange={value => handleBpmChange(value[0])}
            min={MIN_BPM}
            max={MAX_BPM}
            value={[bpm]}
          />
        </div>
        <div className="w-full">
          <label htmlFor="tsize">Тактовый размер</label>
          <Select
            disabled
            onValueChange={value => setBeatsPerMeasure(parseInt(value))}
            defaultValue={String(beatsPerMeasure)}>
            <SelectTrigger id="tsize" className="w-full">
              <SelectValue placeholder="Размер" />
            </SelectTrigger>
            <SelectContent side="top" sideOffset={8} align="start">
              {RHYTHM_PRESETS.map(preset => (
                <SelectItem key={preset.value} value={String(preset.value)}>
                  {preset.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button
          type="button"
          onClick={toggleMetronome}
          className={`w-full rounded-lg px-6 py-6 text-4xl text-white ${
            isRunning ? 'bg-red-600 hover:bg-red-700' : 'bg-yellow-500 hover:bg-yellow-400'
          }`}>
          {isRunning ? '■' : '▶'}
        </Button>
      </div>
    </div>
  );
};

export default Metronome;
