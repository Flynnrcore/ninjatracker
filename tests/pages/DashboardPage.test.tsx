import React, { Suspense } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import DashboardPage from '../../src/pages/DashboardPage';
import { AuthContext } from '../../src/context/AuthContext';
import { MemoryRouter } from 'react-router-dom';
import { mockContext } from '../testUtils/mockAuthContext';

describe('Тест страницы DashboardPage', () => {
  const renderWithProviders = () =>
    render(
      <MemoryRouter>
        <AuthContext.Provider value={{ ...mockContext }}>
          <Suspense fallback={<div>Загрузка</div>}>
            <DashboardPage />
          </Suspense>
        </AuthContext.Provider>
      </MemoryRouter>,
    );

  it('отображает "Общее количество тренировок" после загрузки', async () => {
    renderWithProviders();
    await waitFor(
      () => {
        expect(screen.getByText(/Общее количество тренировок/i)).toBeTruthy();
      },
      { timeout: 10000, interval: 100 },
    );
  });
});
