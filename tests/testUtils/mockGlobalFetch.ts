import { vi } from 'vitest';

export function createMockResponse({ ok = true, status = 200, json = async () => ({}), ...rest } = {}) {
  return {
    ok,
    status,
    json,
    text: async () => '',
    headers: new Headers(),
    redirected: false,
    statusText: '',
    type: 'basic',
    url: '',
    clone: () => this,
    body: null,
    bodyUsed: false,
    arrayBuffer: async () => new ArrayBuffer(0),
    blob: async () => new Blob(),
    formData: async () => new FormData(),
    ...rest,
  } as unknown as Response;
}

function myMockFetch(input: RequestInfo | URL) {
  const url = input instanceof Request ? input.url : input.toString();
  if (url.includes('api/csrf-token')) {
    return Promise.resolve({
      ok: true,
      status: 200,
      json: async () => ({ csrfToken: 'test-csrf-token' }),
      text: async () => '',
    } as unknown as Response);
  }
  if (url.includes('/api/session')) {
    return Promise.resolve({
      ok: true,
      status: 200,
      json: async () => ({
        id: 25,
        email: 'test',
        name: 'test',
        createdAt: '2025-06-28T18:48:49.603Z',
      }),
      text: async () => '',
    } as unknown as Response);
  }
  if (url.includes('/api/trainings/stats')) {
    return Promise.resolve({
      ok: true,
      status: 200,
      json: async () => ({
        alltime: 42551,
        trainTypes: {
          improvisation: 3,
          exercises: 6,
          songs: 5,
          theory: 3,
          rhythm: 1,
          recording: 2,
        },
        totalCount: 13,
        avgDuration: 3273,
        maxDuration: 4328,
        minDuration: 2252,
        streak: 2,
        difficulties: [{ date: '2025-04-24T21:00:00.000Z', difficulty: 4, timer: 3247 }],
      }),
      text: async () => '',
    } as unknown as Response);
  }
  if (url.includes('/api/trainings')) {
    return Promise.resolve({
      ok: true,
      status: 200,
      json: async () => [
        {
          id: 74,
          createdAt: '2025-07-01T08:42:56.754Z',
          userId: 25,
          name: 'Переменный штрих и легато',
          description: 'Тренировка ПШ и легато на 190Bpm',
          date: '2025-07-01T08:42:17.916Z',
          type: ['exercises'],
          difficulty: 5,
          instrument: 'eguitar',
          timer: 4272,
        },
      ],
      text: async () => '',
    } as unknown as Response);
  }
  // fallback для других запросов
  return Promise.resolve({
    ok: false,
    status: 404,
    json: async () => ({}),
    text: async () => '',
  } as unknown as Response);
}

export function mockGlobalFetch() {
  vi.stubGlobal('fetch', myMockFetch);
}

export function restoreGlobalFetch() {
  vi.unstubAllGlobals();
}
