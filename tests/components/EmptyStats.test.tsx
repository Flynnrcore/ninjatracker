import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import EmptyStats from '../../src/components/DashboardPageContent/components/EmptyStats';

describe('EmptyStats Component', () => {
  it('отображает оба сообщения о пустой статистике', () => {
    render(<EmptyStats />);
    expect(screen.getByText('Нет данных')).toBeInTheDocument();
    expect(screen.getByText('Начни новую тренировку чтобы увидеть статистику!')).toBeInTheDocument();
  });

  it('рендерится без ошибок', () => {
    expect(() => render(<EmptyStats />)).not.toThrow();
  });

  it('имеет правильные стили', () => {
    render(<EmptyStats />);
    const container = screen.getByText('Нет данных').parentElement;
    expect(container).toHaveClass('flex', 'h-full', 'w-full', 'flex-col', 'items-center', 'justify-center');
  });

  it('текст имеет правильные стили', () => {
    render(<EmptyStats />);
    const mainText = screen.getByText('Нет данных');
    const subText = screen.getByText('Начни новую тренировку чтобы увидеть статистику!');
    expect(mainText).toHaveClass('text-md', 'text-gray-400');
    expect(subText).toHaveClass('text-sm', 'text-gray-400');
  });
}); 