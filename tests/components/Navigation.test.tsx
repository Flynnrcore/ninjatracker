import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Navigation } from '../../src/components/Header/components/Navigation';
import { vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';

vi.mock('../../src/components/AuthForm/AuthForm', () => ({
  __esModule: true,
  default: (props: { [key: string]: unknown }) => (
    <div data-testid="authform-mock">AuthForm {props.loader ? 'loading' : ''}</div>
  ),
}));
vi.mock('../../src/components/ui/button', () => ({
  Button: (props: { [key: string]: unknown }) => <button {...props}>{props.children as React.ReactNode}</button>,
}));

const menuItems = [
  { path: '/one', label: 'One' },
  { path: '/two', label: 'Two' },
];

describe('Navigation', () => {
  const onLogout = vi.fn();
  const onItemClick = vi.fn();

  beforeEach(() => {
    onLogout.mockClear();
    onItemClick.mockClear();
  });

  it('рендерит пункты меню', () => {
    render(
      <MemoryRouter>
        <Navigation menuItems={menuItems} isAuthenticated={false} onLogout={onLogout} />
      </MemoryRouter>,
    );
    expect(screen.getByText('One')).toBeInTheDocument();
    expect(screen.getByText('Two')).toBeInTheDocument();
  });

  it('вызывает onItemClick при клике по пункту меню', () => {
    render(
      <MemoryRouter>
        <Navigation menuItems={menuItems} isAuthenticated={false} onLogout={onLogout} onItemClick={onItemClick} />
      </MemoryRouter>,
    );
    fireEvent.click(screen.getByText('One'));
    expect(onItemClick).toHaveBeenCalled();
  });

  it('отображает AuthForm для гостя', () => {
    render(
      <MemoryRouter>
        <Navigation menuItems={menuItems} isAuthenticated={false} onLogout={onLogout} loading={true} />
      </MemoryRouter>,
    );
    expect(screen.getByTestId('authform-mock')).toHaveTextContent('AuthForm loading');
  });

  it('отображает кнопку Выйти для авторизованного пользователя', () => {
    render(
      <MemoryRouter>
        <Navigation menuItems={menuItems} isAuthenticated={true} onLogout={onLogout} />
      </MemoryRouter>,
    );
    expect(screen.getByText('Выйти')).toBeInTheDocument();
  });

  it('вызывает onLogout при клике по кнопке Выйти', () => {
    render(
      <MemoryRouter>
        <Navigation menuItems={menuItems} isAuthenticated={true} onLogout={onLogout} />
      </MemoryRouter>,
    );
    fireEvent.click(screen.getByText('Выйти'));
    expect(onLogout).toHaveBeenCalled();
  });

  it('isMobile=true корректно отображает мобильный класс', () => {
    render(
      <MemoryRouter>
        <Navigation menuItems={menuItems} isAuthenticated={false} onLogout={onLogout} isMobile={true} />
      </MemoryRouter>,
    );
    // Проверяем, что есть мобильный контейнер
    expect(screen.getByRole('navigation').className).not.toContain('hidden');
  });
});
