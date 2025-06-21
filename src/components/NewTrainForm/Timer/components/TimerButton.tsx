import { Button } from '@/components/ui';
import { cn } from '@/lib/utils';
import type { TTimerButton } from '@/types';

const TimerButton = ({ label, onClick, variant, className, size = 'md' }: TTimerButton) => {
  const variantStyles = {
    primary: 'bg-yellow-500 hover:bg-yellow-400 focus-visible:ring-yellow-400 text-white',
    secondary: 'bg-gray-600 hover:bg-gray-700 focus-visible:ring-gray-500 text-white',
    danger: 'bg-red-600 hover:bg-red-700 focus-visible:ring-red-500 text-white',
  };

  const sizeStyles = {
    sm: 'h-8 px-4 py-1 text-sm',
    md: 'h-10 px-5 py-2 text-base',
    lg: 'h-12 px-6 py-3 text-lg',
  };

  return (
    <Button
      type="button"
      onClick={onClick}
      className={cn(
        'rounded-md font-medium transition-all',
        'focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
        'active:scale-95',
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}>
      {label}
    </Button>
  );
};

export default TimerButton;
