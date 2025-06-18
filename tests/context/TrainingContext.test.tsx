import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useTrainings, TrainingsProvider } from '../../src/context/TrainingContext';

const TestComponent = () => {
  const { trainings, addTraining } = useTrainings();

  return (
    <div>
      <div data-testid="count">{trainings.length}</div>
      <button
        onClick={() =>
          addTraining({
            id: 'test-id',
            name: 'Тест',
            description: 'Описание',
            date: new Date().toISOString(),
            difficulty: 3,
            instrument: 'Гитара',
            timer: 120,
            type: ['exercises'],
          })
        }>
        Добавить
      </button>
    </div>
  );
};

describe('TrainingsProvider', () => {
  it('testing add trainData', () => {
    render(
      <TrainingsProvider>
        <TestComponent />
      </TrainingsProvider>,
    );

    // Проверка начального состояния (в начальном состоянии 19 тренировок)
    expect(screen.getByTestId('count').textContent).toBe('19');

    // Добавление тренировки
    fireEvent.click(screen.getByText('Добавить'));

    // Проверка состояния после добавления тренировки
    expect(screen.getByTestId('count').textContent).toBe('20');
  });
});
