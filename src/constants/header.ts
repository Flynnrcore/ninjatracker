import type { MenuItem } from '@/components/Header/types';

export const HEADER_MENU_ITEMS: MenuItem[] = [
  { path: '/dashboard', label: 'Дашборд' },
  { path: '/tracker', label: 'Тренировки' },
];

export const HEADER_CONSTANTS = {
  SCROLL_THRESHOLD: 10,
  THROTTLE_MS: 16,
  ICON_SIZE: 28,
} as const; 