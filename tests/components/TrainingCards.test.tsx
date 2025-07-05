import React from 'react';
import { describe, it, vi, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TrainingCards } from '../../src/components/TrackerPageContent/components/TrainingCards';

vi.mock('@/constants/consts', () => ({
  INSTRUMENTS: {
    guitar: 'Гитара',
    piano: 'Пианино',
    drums: 'Ударные',
  },
}));

vi.mock('@/lib/TimeFn', () => ({
  getFormattedTime: vi.fn((time) => time ? `${time} мин` : null),
}));

vi.mock('@/constants/paths', () => ({
  withBaseUrl: vi.fn((path) => `/public/${path}`),
}));

vi.mock('../../src/components/TrackerPageContent/components/TrainingDifficultyStars', () => ({
  TrainingDifficultyStars: ({ difficulty }: { difficulty: number }) => (
    <div data-testid="difficulty-stars">Difficulty: {difficulty}</div>
  ),
}));

vi.mock('../../src/components/TrackerPageContent/components/TrainingTypeTags', () => ({
  TrainingTypeTags: ({ types }: { types: string[] }) => (
    <div data-testid="training-type-tags">Types: {types.join(', ')}</div>
  ),
}));

const mockTrainings = [
  {
    id: '1',
    name: 'Тренировка гитары',
    description: 'Изучение новых аккордов и техник игры',
    date: '2024-01-15',
    instrument: 'guitar',
    type: ['technique', 'theory'],
    difficulty: 3,
    timer: 45,
  },
  {
    id: '2',
    name: 'Практика пианино',
    description: 'Работа над гаммами и арпеджио',
    date: '2024-01-16',
    instrument: 'piano',
    type: ['scales', 'practice'],
    difficulty: 4,
    timer: 60,
  },
];

const mockOnDeleteTraining = vi.fn();

describe('TrainingCards Component', () => {
  beforeEach(() => {
    mockOnDeleteTraining.mockClear();
  });

  it('отображает сообщение при отсутствии тренировок', () => {
    render(<TrainingCards trainings={[]} onDeleteTraining={mockOnDeleteTraining} />);
    
    expect(screen.getByText('Нет данных для отображения')).toBeInTheDocument();
  });

  it('отображает карточки тренировок', () => {
    render(<TrainingCards trainings={mockTrainings} onDeleteTraining={mockOnDeleteTraining} />);
    
    expect(screen.getByText('Тренировка гитары')).toBeInTheDocument();
    expect(screen.getByText('Практика пианино')).toBeInTheDocument();
    expect(screen.getByText('Изучение новых аккордов и техник игры')).toBeInTheDocument();
    expect(screen.getByText('Работа над гаммами и арпеджио')).toBeInTheDocument();
  });

  it('отображает изображения инструментов', () => {
    render(<TrainingCards trainings={mockTrainings} onDeleteTraining={mockOnDeleteTraining} />);
    
    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(2);
    
    expect(images[0]).toHaveAttribute('src', '/public/trainType/guitar.webp');
    expect(images[0]).toHaveAttribute('alt', 'Гитара');
    expect(images[1]).toHaveAttribute('src', '/public/trainType/piano.webp');
    expect(images[1]).toHaveAttribute('alt', 'Пианино');
  });

  it('отображает даты тренировок', () => {
    render(<TrainingCards trainings={mockTrainings} onDeleteTraining={mockOnDeleteTraining} />);
    
    expect(screen.getByText('15.01.2024')).toBeInTheDocument();
    expect(screen.getByText('16.01.2024')).toBeInTheDocument();
  });

  it('отображает названия инструментов', () => {
    render(<TrainingCards trainings={mockTrainings} onDeleteTraining={mockOnDeleteTraining} />);
    
    expect(screen.getByText('Гитара')).toBeInTheDocument();
    expect(screen.getByText('Пианино')).toBeInTheDocument();
  });

  it('отображает время тренировок', () => {
    render(<TrainingCards trainings={mockTrainings} onDeleteTraining={mockOnDeleteTraining} />);
    
    expect(screen.getByText('Время тренировки: 45 мин')).toBeInTheDocument();
    expect(screen.getByText('Время тренировки: 60 мин')).toBeInTheDocument();
  });

  it('отображает компоненты сложности', () => {
    render(<TrainingCards trainings={mockTrainings} onDeleteTraining={mockOnDeleteTraining} />);
    
    const difficultyStars = screen.getAllByTestId('difficulty-stars');
    expect(difficultyStars).toHaveLength(2);
    expect(difficultyStars[0]).toHaveTextContent('Difficulty: 3');
    expect(difficultyStars[1]).toHaveTextContent('Difficulty: 4');
  });

  it('отображает теги типов тренировок', () => {
    render(<TrainingCards trainings={mockTrainings} onDeleteTraining={mockOnDeleteTraining} />);
    
    const typeTags = screen.getAllByTestId('training-type-tags');
    expect(typeTags).toHaveLength(2);
    expect(typeTags[0]).toHaveTextContent('Types: technique, theory');
    expect(typeTags[1]).toHaveTextContent('Types: scales, practice');
  });

  it('вызывает функцию удаления при клике на кнопку удаления', () => {
    render(<TrainingCards trainings={mockTrainings} onDeleteTraining={mockOnDeleteTraining} />);
    
    const deleteButtons = screen.getAllByRole('button', { name: /удалить тренировку/i });
    expect(deleteButtons).toHaveLength(2);
    
    fireEvent.click(deleteButtons[0]);
    expect(mockOnDeleteTraining).toHaveBeenCalledWith('1');
    
    fireEvent.click(deleteButtons[1]);
    expect(mockOnDeleteTraining).toHaveBeenCalledWith('2');
  });

  it('отображает дефис когда время тренировки отсутствует', () => {
    const trainingsWithoutTime = [
      {
        ...mockTrainings[0],
        timer: null,
      },
    ];
    
    render(<TrainingCards trainings={trainingsWithoutTime} onDeleteTraining={mockOnDeleteTraining} />);
    
    expect(screen.getByText('Время тренировки: -')).toBeInTheDocument();
  });

  it('правильно обрабатывает тренировки без описания', () => {
    const trainingsWithoutDescription = [
      {
        ...mockTrainings[0],
        description: '',
      },
    ];
    
    render(<TrainingCards trainings={trainingsWithoutDescription} onDeleteTraining={mockOnDeleteTraining} />);
    
    expect(screen.getByText('Тренировка гитары')).toBeInTheDocument();
    // Описание пустое, но компонент не должен падать
  });

  it('правильно обрабатывает тренировки с неизвестным инструментом', () => {
    const trainingsWithUnknownInstrument = [
      {
        ...mockTrainings[0],
        instrument: 'unknown',
      },
    ];
    
    render(<TrainingCards trainings={trainingsWithUnknownInstrument} onDeleteTraining={mockOnDeleteTraining} />);
    
    // Компонент должен отображаться без ошибок
    expect(screen.getByText('Тренировка гитары')).toBeInTheDocument();
  });
}); 