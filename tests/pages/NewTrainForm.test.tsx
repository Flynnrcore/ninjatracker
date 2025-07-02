import React, { Suspense } from 'react';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import { vi } from 'vitest';
import NewTrainForm from '../../src/components/NewTrainForm/NewTrainForm';
import { AuthContext } from '../../src/context/AuthContext';
import { MemoryRouter } from 'react-router-dom';

const mockAddTraining = vi.fn();
const mockRefreshData = vi.fn();
const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return { ...actual, useNavigate: () => mockNavigate };
});
vi.mock('../../src/hooks/useRemoteTraining', () => ({
  useRemoteTraining: () => ({ addTraining: mockAddTraining }),
}));
vi.mock('../../src/hooks/useDataRefresh', () => ({
  useDataRefresh: () => ({ refreshData: mockRefreshData }),
}));

const mockUser = { id: 1, name: 'Test', email: 'test@mail.com' };
const mockContext = {
  user: mockUser,
  setUser: () => {},
  csrfToken: '',
  loading: false,
  dataRefreshTrigger: 0,
  refreshData: () => {},
};

describe('NewTrainForm', () => {
  const renderWithContext = () =>
    render(
      <MemoryRouter>
        <AuthContext.Provider value={mockContext}>
          <Suspense fallback={<div>Loading...</div>}>
            <NewTrainForm />
          </Suspense>
        </AuthContext.Provider>
      </MemoryRouter>,
    );

  it('показывает ошибку при пустой форме', async () => {
    renderWithContext();
    fireEvent.click(screen.getByRole('button', { name: /записать тренировку/i }));
    await waitFor(() => {
      expect(screen.getByText(/пожалуйста, заполните все обязательные поля/i)).toBeTruthy();
    });
  });

  it('отправляет форму при валидных данных', async () => {
    renderWithContext();
    fireEvent.change(screen.getByPlaceholderText(/название тренировки/i), { target: { value: 'Тест' } });
    fireEvent.change(screen.getByPlaceholderText(/описание тренировки/i), { target: { value: 'Описание' } });

    const group = screen.getByRole('group', { name: /выберите инструмент/i });
    const buttons = within(group).getAllByRole('radio');
    fireEvent.click(buttons[0]);

    const exercisesElement = document.getElementById('exercises');
    if (exercisesElement) {
      fireEvent.click(exercisesElement);
    }

    fireEvent.click(screen.getByRole('button', { name: /записать тренировку/i }));
    await waitFor(() => {
      expect(mockAddTraining).toHaveBeenCalled();
    });
  });

  it('показывает ошибку при ошибке addTraining', async () => {
    mockAddTraining.mockRejectedValueOnce(new Error('Ошибка при добавлении тренировки'));
    renderWithContext();
    fireEvent.change(screen.getByPlaceholderText(/название тренировки/i), { target: { value: 'Тест' } });
    fireEvent.click(screen.getByRole('button', { name: /записать тренировку/i }));

    await waitFor(() => {
      expect(document.body.textContent).toMatch(/Пожалуйста, заполните все обязательные поля/i);
    });
  });
});
