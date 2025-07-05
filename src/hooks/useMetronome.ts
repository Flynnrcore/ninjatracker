import { MIN_BPM, MAX_BPM } from '@/constants/metronome';
import type { TMetronomeState, TMetronomeAction } from '@/types';
import { useReducer, useRef, useEffect, useCallback } from 'react';

const metronomeReducer = (state: TMetronomeState, action: TMetronomeAction) => {
  switch (action.type) {
    case 'SET_BPM':
      return { ...state, bpm: action.payload };
    case 'SET_IS_RUNNING':
      return { ...state, isRunning: action.payload };
    case 'SET_BEAT_COUNT':
      return { ...state, beatCount: action.payload };
    case 'SET_BEATS_PER_MEASURE':
      return { ...state, beatsPerMeasure: action.payload };
    default:
      return state;
  }
};

// Хук для управления аудио
const useAudioManager = () => {
  const audioContextRef = useRef<AudioContext | null>(null);

  const initAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    }

    if (audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }
  }, []);

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

  return { initAudioContext, playSound };
};

// Хук для управления таймером
const useTimerManager = () => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startTimer = useCallback((callback: () => void, interval: number) => {
    clearTimer();
    timerRef.current = setInterval(callback, interval);
  }, [clearTimer]);

  return { clearTimer, startTimer };
};

// Хук для управления состоянием метронома
const useMetronomeState = () => {
  const [state, dispatch] = useReducer(metronomeReducer, {
    bpm: 120,
    isRunning: false,
    beatCount: 0,
    beatsPerMeasure: 4,
  });

  const beatCountRef = useRef(state.beatCount);

  const handleBpmChange = useCallback((value: number) => {
    dispatch({ type: 'SET_BPM', payload: Math.max(MIN_BPM, Math.min(MAX_BPM, value)) });
  }, []);

  const handleBeatsPerMeasureChange = useCallback((value: number) => {
    dispatch({ type: 'SET_BEATS_PER_MEASURE', payload: value });
  }, []);

  const resetBeatCount = useCallback(() => {
    dispatch({ type: 'SET_BEAT_COUNT', payload: 0 });
    beatCountRef.current = 0;
  }, []);

  const incrementBeatCount = useCallback(() => {
    const newBeatCount = (beatCountRef.current + 1) % state.beatsPerMeasure;
    dispatch({ type: 'SET_BEAT_COUNT', payload: newBeatCount });
  }, [state.beatsPerMeasure]);

  const toggleRunning = useCallback(() => {
    dispatch({ type: 'SET_IS_RUNNING', payload: !state.isRunning });
  }, [state.isRunning]);

  // Синхронизация beatCountRef
  useEffect(() => {
    beatCountRef.current = state.beatCount;
  }, [state.beatCount]);

  // Сброс счетчика при смене размера такта или bpm
  useEffect(() => {
    resetBeatCount();
  }, [state.beatsPerMeasure, state.bpm, resetBeatCount]);

  return {
    state,
    dispatch,
    beatCountRef,
    handleBpmChange,
    handleBeatsPerMeasureChange,
    resetBeatCount,
    incrementBeatCount,
    toggleRunning,
  };
};

const useMetronome = () => {
  const { 
    state, 
    dispatch, 
    beatCountRef, 
    handleBpmChange, 
    handleBeatsPerMeasureChange,
    resetBeatCount, 
    incrementBeatCount, 
    toggleRunning 
  } = useMetronomeState();
  const { initAudioContext, playSound } = useAudioManager();
  const { clearTimer, startTimer } = useTimerManager();

  const playBeat = useCallback(() => {
    const isStrongBeat = beatCountRef.current % state.beatsPerMeasure === 0;
    playSound(isStrongBeat ? 1200 : 800, isStrongBeat ? 0.1 : 0.05);
    incrementBeatCount();
  }, [state.beatsPerMeasure, playSound, incrementBeatCount]);

  const toggleMetronome = useCallback(() => {
    initAudioContext();
    if (state.isRunning) {
      clearTimer();
    } else {
      resetBeatCount();
    }
    toggleRunning();
  }, [initAudioContext, state.isRunning, clearTimer, resetBeatCount, toggleRunning]);

  // Таймер метронома
  useEffect(() => {
    if (state.isRunning) {
      const interval = (60 / state.bpm) * 1000;
      startTimer(playBeat, interval);
    } else {
      clearTimer();
    }
    return clearTimer;
  }, [state.isRunning, state.bpm, state.beatsPerMeasure, clearTimer, playBeat, startTimer]);

  return { 
    state, 
    dispatch, 
    toggleMetronome, 
    handleBpmChange,
    handleBeatsPerMeasureChange 
  };
};

export default useMetronome;
