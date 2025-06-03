import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';

type TTimerButton = {
  label: string;
  onClick: () => void;
  variant: 'primary' | 'secondary' | 'danger';
};

const TimerButton = ({ label, onClick, variant }: TTimerButton) => {
  const variantStyles = {
    primary: 'bg-yellow-500 hover:bg-yellow-400 focus:ring-yellow-400 text-white',
    secondary: 'bg-gray-600 hover:bg-gray-700 focus:ring-gray-500 text-white',
    danger: 'bg-red-600 hover:bg-red-700 focus:ring-red-500 text-white',
  };

  return (
    <Button
      type="button"
      onClick={onClick}
      className={`h-12 rounded-md px-6 py-2 focus:ring-2 focus:ring-offset-2 focus:outline-none ${variantStyles[variant]}`}>
      {label}
    </Button>
  );
};

const formatTimeUnit = (num: number) => num.toString().padStart(2, '0');

type TTimeInput = {
  id: string;
  value: number;
  min: number;
  max: number;
  label: string;
  onChange: (value: number) => void;
};

const TimeInput = ({ id, value, min, max, label, onChange }: TTimeInput) => (
  <div className="w-1/3">
    <Input
      id={id}
      type="number"
      min={min}
      max={max}
      value={formatTimeUnit(value)}
      onChange={e => onChange(Number(e.target.value))}
      className="h-12 w-full bg-white text-center text-2xl"
    />
    <label htmlFor={id} className="block text-center font-medium text-gray-600">
      {label}
    </label>
  </div>
);

const Timer = () => {
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const { hours, minutes, seconds } = useMemo(
    () => ({
      hours: Math.floor(totalSeconds / 3600),
      minutes: Math.floor((totalSeconds % 3600) / 60),
      seconds: totalSeconds % 60,
    }),
    [totalSeconds],
  );

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const handleReset = useCallback(() => {
    setTotalSeconds(0);
  }, []);

  const handleStartPause = useCallback(() => {
    setIsRunning(prev => !prev);
  }, []);

  const handleTimeChange = useCallback((type: 'hours' | 'minutes' | 'seconds', value: number) => {
    const clampedValue = Math.max(0, Math.min(type === 'hours' ? 24 : 59, value));

    setTotalSeconds(prev => {
      const current = {
        hours: Math.floor(prev / 3600),
        minutes: Math.floor((prev % 3600) / 60),
        seconds: prev % 60,
      };

      switch (type) {
        case 'hours':
          return clampedValue * 3600 + current.minutes * 60 + current.seconds;
        case 'minutes':
          return current.hours * 3600 + clampedValue * 60 + current.seconds;
        case 'seconds':
          return current.hours * 3600 + current.minutes * 60 + clampedValue;
        default:
          return prev;
      }
    });
  }, []);

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

  return (
    <div className="w-full">
      <div className="flex flex-col items-center space-y-2">
        <label htmlFor="timer">Таймер тренировки:</label>
        <div className="flex w-full items-start justify-center gap-6">
          {isRunning ? (
            <TimerButton label="⏸︎" onClick={handleStartPause} variant="danger" />
          ) : (
            <TimerButton label="●" onClick={handleStartPause} variant="primary" />
          )}
          <div className="flex w-1/2 items-center justify-between gap-4">
            <TimeInput
              id="timerHours"
              value={hours}
              min={0}
              max={24}
              label="Часы"
              onChange={value => handleTimeChange('hours', value)}
            />
            <TimeInput
              id="timerMinutes"
              value={minutes}
              min={0}
              max={59}
              label="Минуты"
              onChange={value => handleTimeChange('minutes', value)}
            />
            <TimeInput
              id="timerSeconds"
              value={seconds}
              min={0}
              max={59}
              label="Секунды"
              onChange={value => handleTimeChange('seconds', value)}
            />
          </div>
          <TimerButton label="■" onClick={handleReset} variant="secondary" />
        </div>
      </div>
    </div>
  );
};

export default Timer;
