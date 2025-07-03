import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MobileMenu } from '../../src/components/Header/components/MobileMenu';
import { vi } from 'vitest';

vi.mock('../../src/components/Header/components/Navigation', () => ({
  Navigation: (props: { [key: string]: unknown }) => (
    <div data-testid="navigation-mock">
      {props.isMobile ? 'mobile' : 'desktop'}
      {props.isAuthenticated ? 'auth' : 'guest'}
      <button onClick={props.onLogout as () => void}>Logout</button>
    </div>
  ),
}));

describe('MobileMenu', () => {
  const menuItems = [{ path: '/test', label: 'Test' }];
  const onToggle = vi.fn();
  const onLogout = vi.fn();

  beforeEach(() => {
    onToggle.mockClear();
    onLogout.mockClear();
  });

  it('рендерит кнопку открытия меню', () => {
    render(
      <MobileMenu
        isOpen={false}
        onToggle={onToggle}
        menuItems={menuItems}
        isAuthenticated={false}
        onLogout={onLogout}
      />,
    );
    expect(screen.getByRole('button', { name: /Открыть меню/i })).toBeInTheDocument();
    expect(screen.queryByTestId('navigation-mock')).not.toBeInTheDocument();
  });

  it('открывает меню и отображает Navigation', () => {
    render(
      <MobileMenu isOpen={true} onToggle={onToggle} menuItems={menuItems} isAuthenticated={true} onLogout={onLogout} />,
    );
    expect(screen.getByRole('button', { name: /Закрыть меню/i })).toBeInTheDocument();
    expect(screen.getByTestId('navigation-mock')).toHaveTextContent('mobile');
    expect(screen.getByTestId('navigation-mock')).toHaveTextContent('auth');
  });

  it('вызывает onToggle при клике по кнопке', () => {
    render(
      <MobileMenu
        isOpen={false}
        onToggle={onToggle}
        menuItems={menuItems}
        isAuthenticated={false}
        onLogout={onLogout}
      />,
    );
    fireEvent.click(screen.getByRole('button'));
    expect(onToggle).toHaveBeenCalled();
  });

  it('вызывает onLogout при клике по кнопке Logout внутри Navigation', () => {
    render(
      <MobileMenu isOpen={true} onToggle={onToggle} menuItems={menuItems} isAuthenticated={true} onLogout={onLogout} />,
    );
    fireEvent.click(screen.getByText('Logout'));
    expect(onLogout).toHaveBeenCalled();
  });
});
