import { Button } from '../../ui/button';

type TTimerButton = {
  label: string;
  onClick: () => void;
  variant: 'primary' | 'secondary' | 'danger';
};

const TimerButton = ({ label, onClick, variant }: TTimerButton) => {
  const variantStyles = {
    primary: 'bg-yellow-500 hover:bg-yellow-400 focus:ring-yellow-400 text-white',
    secondary: 'bg-gray-600 hover:bg-gray-700 focus:ring-gray-500 text-white',
    danger: 'bg-red-600 hover:bg-red-700 focus:ring-red-500 text-white',
  };

  return (
    <Button
      type="button"
      onClick={onClick}
      className={`h-12 rounded-md px-6 py-2 focus:ring-2 focus:ring-offset-2 focus:outline-none ${variantStyles[variant]}`}>
      {label}
    </Button>
  );
};

export default TimerButton;
