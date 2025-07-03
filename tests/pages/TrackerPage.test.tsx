import React, { Suspense } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import TrackerPage from '../../src/pages/TrackerPage';
import { AuthContext } from '../../src/context/AuthContext';
import { MemoryRouter } from 'react-router-dom';
import { mockContext } from '../testUtils/mockAuthContext';

describe('Тест страницы DashboardPage', () => {
  const renderWithProviders = () =>
    render(
      <MemoryRouter>
        <AuthContext.Provider value={{ ...mockContext }}>
          <Suspense fallback={<div>Загрузка</div>}>
            <TrackerPage />
          </Suspense>
        </AuthContext.Provider>
      </MemoryRouter>,
    );

  it('отображает данные после загрузки', async () => {
    renderWithProviders();
    await waitFor(
      () => {
        expect(screen.getByText(/Переменный штрих и легато/i)).toBeTruthy();
      },
      { timeout: 10000, interval: 100 },
    );
  });
});
