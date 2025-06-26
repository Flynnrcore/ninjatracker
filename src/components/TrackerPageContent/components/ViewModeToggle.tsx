import { cn } from '@/lib/utils';
import type { TViewModeToggle } from '@/types';

export const ViewModeToggle = ({ viewMode, onViewModeChange }: TViewModeToggle) => {
  return (
    <div className="flex gap-2">
      <button
        onClick={() => onViewModeChange('table')}
        className={cn(
          'px-3 py-1.5 text-sm font-medium transition-colors',
          viewMode === 'table' ? 'border-b-2 border-yellow-400 text-black' : 'text-stone-500 hover:text-black',
        )}
        aria-label="Табличный вид">
        Таблица
      </button>
      <button
        onClick={() => onViewModeChange('cards')}
        className={cn(
          'px-3 py-1.5 text-sm font-medium transition-colors',
          viewMode === 'cards' ? 'border-b-2 border-yellow-400 text-black' : 'text-stone-500 hover:text-black',
        )}
        aria-label="Вид карточек">
        Карточки
      </button>
    </div>
  );
};
