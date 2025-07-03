import { render, screen } from '@testing-library/react';
import ErrorPage from '../../src/pages/ErrorPage';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

describe('Тест страницы ErrorPage', () => {
  it('', async () => {
    render(
      <MemoryRouter>
        <ErrorPage picUrl="/test-error.png" message="Ошибка!" />
      </MemoryRouter>,
    );
    expect(await screen.findByText(/Ошибка!/i)).toBeTruthy();
    expect(await screen.getByRole('link', { name: /вернуться на главную/i })).toBeTruthy();
  });
});
