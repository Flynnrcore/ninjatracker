// tests/setupTests.ts

import '@testing-library/jest-dom';
import { mockGlobalFetch, restoreGlobalFetch } from './testUtils/mockGlobalFetch';

beforeEach(() => {
  mockGlobalFetch();
});

afterEach(() => {
  restoreGlobalFetch();
});

global.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};
