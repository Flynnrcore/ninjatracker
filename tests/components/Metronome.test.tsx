import React from 'react';
import { describe, it, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import Metronome from '../../src/components/Metronome';
// import userEvent from '@testing-library/user-event';

const mockHandleBeatsPerMeasureChange = vi.fn();
const mockToggleMetronome = vi.fn();
const mockHandleBpmChange = vi.fn();

const defaultState = {
  bpm: 120,
  beatsPerMeasure: 4,
  isRunning: false,
};

vi.mock('@/hooks/useMetronome', () => ({
  __esModule: true,
  default: () => ({
    state: defaultState,
    toggleMetronome: mockToggleMetronome,
    handleBpmChange: mockHandleBpmChange,
    handleBeatsPerMeasureChange: mockHandleBeatsPerMeasureChange,
  }),
}));

describe('Тест компонента Metronome', () => {
  beforeEach(() => {
    mockHandleBeatsPerMeasureChange.mockClear();
    mockToggleMetronome.mockClear();
    mockHandleBpmChange.mockClear();
  });

  it('проврека рендера элементов метронома', () => {
    render(<Metronome />);
    expect(screen.getByAltText(/Ниндзя с метрономом/i)).toBeInTheDocument();
    expect(screen.getByText(/Метроном/i)).toBeInTheDocument();
    expect(screen.getByText(/120 BPM/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /▶/ })).toBeInTheDocument();
    expect(screen.getByLabelText(/Тактовый размер/i)).toBeInTheDocument();
  });

  it('проверка работы кнопки скрытия/открытия метронома', () => {
    render(<Metronome />);
    const toggleBtn = screen.getByRole('button', { name: /Метроном/i });
    act(() => {
      fireEvent.click(toggleBtn);
    });
    expect(toggleBtn).toBeInTheDocument();
  });

  it('проверка изменения темпа через клики кнопок + или -', () => {
    render(<Metronome />);
    const plusBtn = screen.getByRole('button', { name: '+' });
    const minusBtn = screen.getByRole('button', { name: '-' });
    fireEvent.click(plusBtn);
    expect(mockHandleBpmChange).toHaveBeenCalledWith(121);
    fireEvent.click(minusBtn);
    expect(mockHandleBpmChange).toHaveBeenCalledWith(119);
  });

  /* it('проверка работы слайдера темпа метронома', async () => {
    render(<Metronome />);
    const slider = screen.getByRole('slider');
    await userEvent.type(slider, '{ArrowRight}');
    expect(mockHandleBpmChange).toHaveBeenCalled();
  }); */

  it('проверка изменения размера тактов метронома', () => {
    render(<Metronome />);
    const select = screen.getByLabelText(/Тактовый размер/i);
    fireEvent.change(select, { target: { value: '3' } });
    expect(mockHandleBeatsPerMeasureChange).toHaveBeenCalledWith(3);
  });

  it('проверка работы кнопок старт и стоп метронома', () => {
    render(<Metronome />);
    const startBtn = screen.getByRole('button', { name: /▶/ });
    fireEvent.click(startBtn);
    expect(mockToggleMetronome).toHaveBeenCalled();
  });
});
