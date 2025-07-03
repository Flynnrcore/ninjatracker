import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { RecaptchaProvider } from '../../src/context/RecaptchaProvider';
import { vi } from 'vitest';

beforeAll(() => {
  process.env.VITE_RECAPTCHA_SITE_KEY = 'test-key';
});

vi.mock('react-google-recaptcha-v3', () => ({
  GoogleReCaptchaProvider: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) => (
    <div data-testid="recaptcha-provider-mock" {...props}>
      {children}
    </div>
  ),
}));

describe('RecaptchaProvider', () => {
  it('рендерит детей внутри GoogleReCaptchaProvider', () => {
    render(
      <RecaptchaProvider>
        <div data-testid="child">Child</div>
      </RecaptchaProvider>,
    );
    expect(screen.getByTestId('recaptcha-provider-mock')).toHaveAttribute('reCaptchaKey', expect.any(String));
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('передает siteKey в GoogleReCaptchaProvider', () => {
    render(
      <RecaptchaProvider>
        <div>Test</div>
      </RecaptchaProvider>,
    );
    expect(screen.getByTestId('recaptcha-provider-mock')).toHaveAttribute('reCaptchaKey', expect.any(String));
  });
});
