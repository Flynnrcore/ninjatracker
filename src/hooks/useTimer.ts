import { useEffect, useRef, useState, useCallback, useMemo } from 'react';

type TimeType = 'hours' | 'minutes' | 'seconds';

export const useTimer = () => {
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Разбиваем время на часы, минуты, секунды
  const { hours, minutes, seconds } = useMemo(
    () => ({
      hours: Math.floor(totalSeconds / 3600),
      minutes: Math.floor((totalSeconds % 3600) / 60),
      seconds: totalSeconds % 60,
    }),
    [totalSeconds],
  );

  // Очистка таймера
  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  // Сброс таймера
  const handleReset = useCallback(() => {
    setTotalSeconds(0);
  }, []);

  // Старт/пауза
  const handleStartPause = useCallback(() => {
    setIsRunning(prev => !prev);
  }, []);

  // Обработка изменения времени
  const handleTimeChange = useCallback((type: TimeType, value: number) => {
    const max = type === 'hours' ? 24 : 59;
    const clampedValue = Math.max(0, Math.min(max, value));

    setTotalSeconds(prev => {
      const current = {
        hours: Math.floor(prev / 3600),
        minutes: Math.floor((prev % 3600) / 60),
        seconds: prev % 60,
      };

      return type === 'hours'
        ? clampedValue * 3600 + current.minutes * 60 + current.seconds
        : type === 'minutes'
          ? current.hours * 3600 + clampedValue * 60 + current.seconds
          : current.hours * 3600 + current.minutes * 60 + clampedValue;
    });
  }, []);

  // Эффект для запуска/остановки таймера
  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTotalSeconds(prev => prev + 1);
      }, 1000);
    } else {
      clearTimer();
    }

    return clearTimer;
  }, [isRunning, clearTimer]);

  return {
    totalSeconds,
    isRunning,
    hours,
    minutes,
    seconds,
    handleStartPause,
    handleReset,
    handleTimeChange,
  };
};
