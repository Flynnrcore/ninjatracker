import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from '../../ui/tooltip';
import { formatTimeUnit } from '@/utils/TimeFn';
import TimerButton from './TimerButton';
import TimeInput from './TimeInput';

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
      <fieldset className="flex flex-col items-center space-y-2">
        <legend className="text-center">Таймер тренировки:</legend>
        <input
          type="hidden"
          name="time"
          id="timer"
          value={`${formatTimeUnit(hours)}:${formatTimeUnit(minutes)}:${formatTimeUnit(seconds)}`}
        />
        <div className="flex w-full items-start justify-center gap-6">
          {isRunning ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <TimerButton label="⏸︎" onClick={handleStartPause} variant="danger" />
              </TooltipTrigger>
              <TooltipContent>Остановить таймер</TooltipContent>
            </Tooltip>
          ) : (
            <Tooltip>
              <TooltipTrigger asChild>
                <TimerButton label="●" onClick={handleStartPause} variant="primary" />
              </TooltipTrigger>
              <TooltipContent>Включить таймер</TooltipContent>
            </Tooltip>
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
          <Tooltip>
            <TooltipTrigger asChild>
              <TimerButton label="■" onClick={handleReset} variant="secondary" />
            </TooltipTrigger>
            <TooltipContent>Сбросить таймер</TooltipContent>
          </Tooltip>
        </div>
      </fieldset>
    </div>
  );
};

export default Timer;
