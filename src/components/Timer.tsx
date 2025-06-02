import { useEffect, useRef, useState, useCallback, useMemo } from 'react';

type TTimerButton = {
  label: string;
  onClick: () => void;
  variant: 'primary' | 'secondary' | 'danger';
};

const TimerButton = ({ label, onClick, variant }: TTimerButton) => {
  const variantStyles = {
    primary: 'bg-green-600 hover:bg-green-700 focus:ring-green-500',
    secondary: 'bg-gray-600 hover:bg-gray-700 focus:ring-gray-500',
    danger: 'bg-red-600 hover:bg-red-700 focus:ring-red-500',
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-md px-4 py-2 text-white focus:ring-2 focus:ring-offset-2 focus:outline-none ${variantStyles[variant]}`}>
      {label}
    </button>
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
    <input
      id={id}
      type="number"
      min={min}
      max={max}
      value={formatTimeUnit(value)}
      onChange={e => onChange(Number(e.target.value))}
      className="w-full text-center"
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

  const startButtonLabel = totalSeconds === 0 ? 'Начать тренировку' : 'Продолжить тренировку';

  return (
    <div className="mx-auto space-y-4 rounded-lg border-1 border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex flex-col items-center space-y-2">
        <label htmlFor="timer">Таймер тренировки:</label>
        <div className="flex w-1/2 gap-4">
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
      </div>

      <div className="flex justify-center gap-3">
        {isRunning ? (
          <TimerButton label="Пауза / Остановить" onClick={handleStartPause} variant="danger" />
        ) : (
          <TimerButton label={startButtonLabel} onClick={handleStartPause} variant="primary" />
        )}
        <TimerButton label="Сбросить" onClick={handleReset} variant="secondary" />
      </div>
    </div>
  );
};

export default Timer;
