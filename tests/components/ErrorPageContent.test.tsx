import React from 'react';
import { render, screen } from '@testing-library/react';
import ErrorPageContent from '../../src/components/ErrorPageContent';
import { MemoryRouter } from 'react-router-dom';

describe('ErrorPageContent', () => {
  it('отображает картинку, сообщение и ссылку', () => {
    render(
      <MemoryRouter>
        <ErrorPageContent picUrl="/test-error.png" message="Ошибка!" />
      </MemoryRouter>,
    );
    expect(screen.getByAltText(/error img/i)).toBeTruthy();
    expect(screen.getByText(/ошибка!/i)).toBeTruthy();
    expect(screen.getByRole('link', { name: /вернуться на главную/i })).toBeTruthy();
  });

  it('отображает children', () => {
    render(
      <MemoryRouter>
        <ErrorPageContent picUrl="/test-error.png" message="Ошибка!">
          <div>Доп. информация</div>
        </ErrorPageContent>
      </MemoryRouter>,
    );
    expect(screen.getByText(/доп. информация/i)).toBeTruthy();
  });
});
