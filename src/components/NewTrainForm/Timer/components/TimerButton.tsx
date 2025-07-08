import { Button, Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui';
import { cn } from '@/lib/utils';
import type { TTimerButton } from '@/types';

const TimerButton = ({ label, onClick, variant, className, tooltip }: TTimerButton) => {
  const variantStyles = {
    primary: 'bg-yellow-500 hover:bg-yellow-400 focus-visible:ring-yellow-400 text-white',
    secondary: 'bg-gray-600 hover:bg-gray-700 focus-visible:ring-gray-500 text-white',
    danger: 'bg-red-600 hover:bg-red-700 focus-visible:ring-red-500 text-white',
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          aria-label={tooltip || ''}
          type="button"
          onClick={onClick}
          className={cn(
            'rounded-md font-medium transition-all',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
            'active:scale-95',
            variantStyles[variant],
            'h-[72px] w-full text-2xl sm:w-[100px] sm:text-4xl',
            className,
          )}>
          {label}
        </Button>
      </TooltipTrigger>
      <TooltipContent>{tooltip}</TooltipContent>
    </Tooltip>
  );
};

export default TimerButton;
