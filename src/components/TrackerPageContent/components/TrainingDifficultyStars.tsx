import { cn } from '@/lib/utils';
import { Star } from 'lucide-react';
import { MAX_DIFFICULTY_LEVEL, DEFAULT_STAR_SIZE } from '@/constants/consts';

interface TrainingDifficultyStarsProps {
  difficulty: number;
  maxLevel?: number;
  size?: number;
}

export const TrainingDifficultyStars = ({
  difficulty,
  maxLevel = MAX_DIFFICULTY_LEVEL,
  size = DEFAULT_STAR_SIZE,
}: TrainingDifficultyStarsProps) => {
  return (
    <div className="flex items-center">
      {Array.from({ length: maxLevel }, (_, i) => i + 1).map(level => (
        <Star
          key={level}
          size={size}
          className={cn('fill-current', level <= difficulty ? 'text-yellow-500' : 'text-gray-300')}
        />
      ))}
    </div>
  );
};
