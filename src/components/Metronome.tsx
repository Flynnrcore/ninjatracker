import { useState, useEffect } from 'react';
import { Button, Slider } from '@/components/ui';
import { PATH } from '@/constants/paths';
import { MIN_BPM, MAX_BPM } from '@/constants/metronome';
import useMetronome from '@/hooks/useMetronome';

const RHYTHM_PRESETS = [
  { name: '1/4', value: 1 },
  { name: '2/4', value: 2 },
  { name: '3/4', value: 3 },
  { name: '4/4', value: 4 },
  { name: '6/8', value: 6 },
];

const Metronome = ({ className }: { className?: string }) => {
  const { state, dispatch, toggleMetronome, handleBpmChange } = useMetronome();

  const [hiddenMetronome, setHiddenMetronome] = useState(false);
  const [animate, setAnimate] = useState(false);

  // Анимация кнопки при монтировании
  useEffect(() => {
    setAnimate(true);
    const timeout = setTimeout(() => setAnimate(false), 3700);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      className={`absolute top-1/2 right-0 flex items-center ${animate ? 'animate-bounce-left-twice' : ''} ${hiddenMetronome ? 'w-0' : ''}`}>
      <Button
        type="button"
        onClick={() => setHiddenMetronome(!hiddenMetronome)}
        className={`metronome-button ${hiddenMetronome ? 'absolute right-0' : ''} `}>
        <span className="mb-6 rotate-90 transform pl-12 whitespace-nowrap">Метроном</span>
        {hiddenMetronome ? <span className="text-2xl">&#10563;</span> : <span className="text-2xl">&#10562;</span>}
      </Button>
      <div
        className={`metronome-wrapper ${hiddenMetronome ? 'pointer-events-none translate-x-4 opacity-0' : 'translate-x-0 opacity-100'} ${className} `}>
        <img className="h-25" src={PATH.METRONOME_IMG} alt="Metronome Icon" />
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <div className="flex items-center justify-center gap-2">
            <Button type="button" onClick={() => handleBpmChange(state.bpm - 1)} className="circle-button">
              -
            </Button>
            <p className="font-mono text-xl">{state.bpm} BPM</p>
            <Button type="button" onClick={() => handleBpmChange(state.bpm + 1)} className="circle-button">
              +
            </Button>
          </div>
          <Slider
            defaultValue={[120]}
            step={1}
            onValueChange={value => handleBpmChange(value[0])}
            min={MIN_BPM}
            max={MAX_BPM}
            value={[state.bpm]}
          />
        </div>
        <div className="w-full">
          <label htmlFor="tsize">Тактовый размер</label>
          <select
            name="tsize"
            id="tsize"
            className="input"
            value={state.beatsPerMeasure}
            onChange={e => dispatch({ type: 'SET_BEATS_PER_MEASURE', payload: parseInt(e.target.value) })}>
            {RHYTHM_PRESETS.map(preset => (
              <option key={preset.value} value={preset.value}>
                {preset.name}
              </option>
            ))}
          </select>
        </div>
        <Button
          type="button"
          onClick={toggleMetronome}
          className={`w-full rounded-lg px-6 py-6 text-4xl text-white ${
            state.isRunning ? 'bg-red-600 hover:bg-red-700' : 'bg-yellow-500 hover:bg-yellow-400'
          }`}>
          {state.isRunning ? '■' : '▶'}
        </Button>
      </div>
    </div>
  );
};

export default Metronome;
