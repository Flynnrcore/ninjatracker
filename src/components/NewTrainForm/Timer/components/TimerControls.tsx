import { useCallback } from 'react';
import TimerButton from './TimerButton';

interface TimerControlsProps {
  isRunning: boolean;
  onStartPause: () => void;
  onReset: () => void;
}

const TimerControls = ({ isRunning, onStartPause, onReset }: TimerControlsProps) => {
  const renderStartPauseButton = useCallback(
    () => (
      <TimerButton
        label={isRunning ? '⏸︎' : '▶'}
        onClick={onStartPause}
        variant={isRunning ? 'danger' : 'primary'}
        aria-label={isRunning ? 'Пауза' : 'Старт'}
        className="order-2 sm:order-1"
        tooltip={isRunning ? 'Остановить таймер' : 'Запустить таймер'}
      />
    ),
    [isRunning, onStartPause],
  );

  const renderResetButton = useCallback(
    () => (
      <TimerButton
        label="↻"
        onClick={onReset}
        variant="secondary"
        aria-label="Сбросить"
        className="order-3 sm:order-3"
        tooltip="Сбросить таймер"
      />
    ),
    [onReset],
  );

  return (
    <>
      {renderStartPauseButton()}
      {renderResetButton()}
    </>
  );
};

export default TimerControls;
