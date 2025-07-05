import { useCallback } from 'react';
import TimeInput from './components/TimeInput';
import TimerControls from './components/TimerControls';
import { useTimer } from '@/hooks';

const Timer = () => {
  const { totalSeconds, isRunning, hours, minutes, seconds, handleStartPause, handleReset, handleTimeChange } =
    useTimer();

  const renderTimeInputs = useCallback(
    () => (
      <div className="order-1 flex w-full flex-col items-center gap-4 sm:order-2 sm:w-auto sm:flex-row sm:gap-6">
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
    ),
    [hours, minutes, seconds, handleTimeChange],
  );

  return (
    <div className="w-full px-2 sm:px-4">
      <fieldset className="flex flex-col items-center space-y-4">
        <legend className="text-center">Таймер тренировки</legend>

        <input type="hidden" name="time" id="timer" value={totalSeconds} />

        <div className="flex w-full flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-6">
          <TimerControls isRunning={isRunning} onStartPause={handleStartPause} onReset={handleReset} />
          {renderTimeInputs()}
        </div>
      </fieldset>
    </div>
  );
};

export default Timer;
