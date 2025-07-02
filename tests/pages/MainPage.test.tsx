import { render, screen } from '@testing-library/react';
import MainPage from '../../src/pages/MainPage';
import React, { Suspense } from 'react';
import { MemoryRouter } from 'react-router-dom';

describe('тест страницы MainPage', () => {
  it('проверка отображения', async () => {
    render(
      <MemoryRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <MainPage />
        </Suspense>
      </MemoryRouter>,
    );
    expect(await screen.findByText('Ваш личный музыкальный трекер')).toBeInTheDocument();
  });
});
