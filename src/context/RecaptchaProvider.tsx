import React from 'react';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

type RecaptchaProviderWrapperProps = {
  children: React.ReactNode;
};

export function RecaptchaProvider({ children }: RecaptchaProviderWrapperProps) {
  return React.createElement(
    GoogleReCaptchaProvider as React.ComponentType<{ reCaptchaKey: string }>,
    { reCaptchaKey: import.meta.env.VITE_RECAPTCHA_SITE_KEY! },
    children
  );
}