import React, { Suspense } from 'react';
import { AuthContext } from '../../src/context/AuthContext';
import { mockContext } from '../testUtils/mockAuthContext';
import NewTrainPage from '../../src/pages/NewTrainPage';
import { MemoryRouter } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';

describe('Тест страницы NewTrainPage', () => {
  const renderWithProviders = () =>
    render(
      <MemoryRouter>
        <AuthContext.Provider value={{ ...mockContext }}>
          <Suspense fallback={<div>Загрузка</div>}>
            <NewTrainPage />
          </Suspense>
        </AuthContext.Provider>
      </MemoryRouter>,
    );

  it('отображает форму тренировки', async () => {
    renderWithProviders();
    await waitFor(
      () => {
        expect(screen.findByText(/Таймер тренировки/i)).toBeTruthy();
      },
      { timeout: 10000, interval: 100 }
    );
  });
});
