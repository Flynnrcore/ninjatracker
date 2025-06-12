import { useState } from 'react';

type TStarRating = {
  value: number;
  onChange: (val: number) => void;
};

const StarRating = ({ value, onChange }: TStarRating) => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <fieldset className="mt-3 flex flex-col items-center">
      <legend className="text-center">Сложность:</legend>
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map(star => (
          <button
            key={star}
            type="button"
            className={`difficulty-star text-4xl transition-colors ${
              (hovered ?? value) >= star ? 'text-yellow-400' : 'text-gray-300'
            }`}
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => onChange(star)}
            aria-label={`Оценка ${star}`}>
            ★
          </button>
        ))}
        <input type="hidden" name="difficulty" value={value} />
      </div>
    </fieldset>
  );
};

export default StarRating;
