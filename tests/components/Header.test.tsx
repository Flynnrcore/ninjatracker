import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from '../../src/components/Header/Header';
import { useAuth } from '../../src/hooks/useAuth';
import { useAuthContext } from '../../src/context/AuthContext';
import { useScrollEffect } from '../../src/hooks/useScrollEffect';
import { vi } from 'vitest';

vi.mock('../../src/hooks/useAuth');
vi.mock('../../src/context/AuthContext');
vi.mock('../../src/hooks/useScrollEffect');

vi.mock('../../src/components/Header', () => ({
  __esModule: true,
  Logo: () => <div data-testid="logo">Logo</div>,
  Navigation: (props: { [key: string]: unknown }) => (
    <div data-testid="navigation">{props.isAuthenticated ? 'auth' : 'guest'}</div>
  ),
  MobileMenu: (props: { [key: string]: unknown }) => (
    <div data-testid="mobile-menu">
      {props.isOpen ? 'open' : 'closed'}
      <button onClick={props.onLogout as () => void}>Logout</button>
      <button onClick={props.onToggle as () => void}>Toggle</button>
    </div>
  ),
}));

describe('Header', () => {
  const logout = vi.fn();
  const login = vi.fn();
  const register = vi.fn();

  beforeEach(() => {
    vi.mocked(useAuth).mockReturnValue({ logout, login, register, loading: false });
    vi.mocked(useScrollEffect).mockReturnValue(false);
    logout.mockClear();
    login.mockClear();
    register.mockClear();
  });

  it('рендерит логотип, навигацию и мобильное меню', () => {
    vi.mocked(useAuthContext).mockReturnValue({ user: null, loading: false });
    render(<Header />);
    expect(screen.getByTestId('logo')).toBeInTheDocument();
    expect(screen.getByTestId('navigation')).toBeInTheDocument();
    expect(screen.getByTestId('mobile-menu')).toBeInTheDocument();
  });

  it('показывает пункты меню для гостя', () => {
    vi.mocked(useAuthContext).mockReturnValue({ user: null, loading: false });
    render(<Header />);
    expect(screen.getByTestId('navigation')).toHaveTextContent('guest');
  });

  it('показывает пункты меню для авторизованного пользователя', () => {
    vi.mocked(useAuthContext).mockReturnValue({ user: { id: 1, name: 'Test' }, loading: false });
    render(<Header />);
    expect(screen.getByTestId('navigation')).toHaveTextContent('auth');
  });

  it('вызывает logout и закрывает мобильное меню при клике', () => {
    vi.mocked(useAuthContext).mockReturnValue({ user: { id: 1 }, loading: false });
    render(<Header />);
    fireEvent.click(screen.getByText('Toggle'));
    fireEvent.click(screen.getByText('Logout'));
    expect(logout).toHaveBeenCalled();
  });

  it('открывает и закрывает мобильное меню по клику', () => {
    vi.mocked(useAuthContext).mockReturnValue({ user: null, loading: false });
    render(<Header />);
    expect(screen.getByTestId('mobile-menu')).toHaveTextContent('closed');
    fireEvent.click(screen.getByText('Toggle'));
    expect(screen.getByTestId('mobile-menu')).toHaveTextContent('open');
  });

  it('применяет класс тени при скролле', () => {
    vi.mocked(useAuthContext).mockReturnValue({ user: null, loading: false });
    vi.mocked(useScrollEffect).mockReturnValue(true);
    const { container } = render(<Header />);
    expect(container.querySelector('header')).toHaveClass('shadow-md');
  });

  it('передаёт loading в Navigation и MobileMenu', () => {
    vi.mocked(useAuthContext).mockReturnValue({ user: null, loading: true });
    render(<Header />);
    expect(screen.getByTestId('navigation')).toBeInTheDocument();
    expect(screen.getByTestId('mobile-menu')).toBeInTheDocument();
  });
});
