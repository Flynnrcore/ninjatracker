import { render, screen } from '@testing-library/react';
import { AuthProvider, useAuthContext } from '../../src/context/AuthContext';
import React from 'react';

function TestComponent() {
  const { user } = useAuthContext();
  return <div>{user ? user.name : 'Пользователь не авторизован'}</div>;
}

describe('проверка AuthContext', () => {
  it('проверка авторизации', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    );
    expect(screen.getByText('Пользователь не авторизован')).toBeTruthy();
  });
});
