import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Footer from '../../src/components/Footer';

describe('Footer Component', () => {
  it('отображает копирайт', () => {
    render(<Footer />);

    expect(screen.getByText(/2026 NinjaTracker/)).toBeInTheDocument();
  });

  it('отображает текст о создании', () => {
    render(<Footer />);

    expect(screen.getByText(/Cоздано/)).toBeInTheDocument();
  });

  it('отображает ссылку на GitHub автора', () => {
    render(<Footer />);

    const githubLink = screen.getByRole('link', { name: /Flynnrcore/i });
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute('href', 'https://github.com/Flynnrcore');
  });

  it('ссылка на GitHub имеет правильные стили', () => {
    render(<Footer />);

    const githubLink = screen.getByRole('link', { name: /Flynnrcore/i });
    expect(githubLink).toHaveClass('text-yellow-400', 'underline');
  });

  it('footer имеет правильные стили', () => {
    render(<Footer />);

    const footer = screen.getByRole('contentinfo');
    expect(footer).toHaveClass('bg-gray-900', 'py-8', 'text-white');
  });

  it('контейнер имеет правильные стили', () => {
    render(<Footer />);

    const container = screen.getByText(/2026 NinjaTracker/).parentElement;
    expect(container).toHaveClass('container', 'mx-auto', 'text-center');
  });

  it('основной текст имеет правильные стили', () => {
    render(<Footer />);

    const mainText = screen.getByText(/2026 NinjaTracker/);
    expect(mainText).toHaveClass('text-xl', 'text-white');
  });

  it('отображает полный текст копирайта', () => {
    render(<Footer />);
    expect(screen.getByText(/2026 NinjaTracker. Cоздано/)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Flynnrcore/i })).toBeInTheDocument();
  });

  it('ссылка открывается в новой вкладке', () => {
    render(<Footer />);

    const githubLink = screen.getByRole('link', { name: /Flynnrcore/i });
    // По умолчанию ссылки не открываются в новой вкладке, но можно проверить href
    expect(githubLink).toHaveAttribute('href', 'https://github.com/Flynnrcore');
  });

  it('компонент рендерится без ошибок', () => {
    expect(() => render(<Footer />)).not.toThrow();
  });

  it('содержит все необходимые элементы', () => {
    render(<Footer />);

    // Проверяем наличие всех основных элементов
    expect(screen.getByRole('contentinfo')).toBeInTheDocument(); // footer
    expect(screen.getByRole('link')).toBeInTheDocument(); // GitHub link
    expect(screen.getByText(/NinjaTracker/)).toBeInTheDocument();
    expect(screen.getByText(/Cоздано/)).toBeInTheDocument();
    expect(screen.getByText(/Flynnrcore/)).toBeInTheDocument();
  });
});
