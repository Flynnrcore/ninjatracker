import { getFormattedTime, formatTimeUnit } from '../../src/utils/TimeFn';

// Проверка функций форматирования времени
describe('getFormattedTime', () => {
  it('formats seconds to HH:MM:SS', () => {
    expect(getFormattedTime(3661)).toBe('01:01:01');
    expect(getFormattedTime(59)).toBe('00:00:59');
    expect(getFormattedTime(0)).toBe('00:00:00');
  });
});

describe('formatTimeUnit', () => {
  it('pads single digits with zero', () => {
    expect(formatTimeUnit(5)).toBe('05');
    expect(formatTimeUnit(12)).toBe('12');
  });
});