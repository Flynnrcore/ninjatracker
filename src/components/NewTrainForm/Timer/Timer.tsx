import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from '../../ui/tooltip';
import TimerButton from './TimerButton';
import TimeInput from './TimeInput';

const Timer = () => {
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
  const handleTimeChange = useCallback((type: 'hours' | 'minutes' | 'seconds', value: number) => {
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

  return (
    <div className="w-full px-2 sm:px-4">
      <fieldset className="flex flex-col items-center space-y-4">
        <legend className="sr-only">Таймер тренировки</legend>

        <input type="hidden" name="time" id="timer" value={totalSeconds} />

        <div className="flex w-full flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-6">
          <Tooltip>
            <TooltipTrigger asChild>
              <TimerButton
                label={isRunning ? '⏸︎' : '▶'}
                onClick={handleStartPause}
                variant={isRunning ? 'danger' : 'primary'}
                size="lg"
                aria-label={isRunning ? 'Пауза' : 'Старт'}
              />
            </TooltipTrigger>
            <TooltipContent>{isRunning ? 'Остановить таймер' : 'Запустить таймер'}</TooltipContent>
          </Tooltip>

          <div className="flex w-full flex-col items-center gap-4 sm:w-auto sm:flex-row sm:gap-6">
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
              <TimerButton label="↻" onClick={handleReset} variant="secondary" size="lg" aria-label="Сбросить" />
            </TooltipTrigger>
            <TooltipContent>Сбросить таймер</TooltipContent>
          </Tooltip>
        </div>
      </fieldset>
    </div>
  );
};

export default Timer;
