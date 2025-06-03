import { useState } from 'react';

const StarRating = ({
  value,
  onChange,
  name,
  id,
}: {
  value: number;
  onChange: (val: number) => void;
  name?: string;
  id?: string;
}) => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div id={id} className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map(star => (
        <button
          key={star}
          type="button"
          className={`difficulty-star text-2xl transition-colors ${
            (hovered ?? value) >= star ? 'text-yellow-400' : 'text-gray-300'
          }`}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(null)}
          onClick={() => onChange(star)}
          aria-label={`Оценка ${star}`}>
          ★
        </button>
      ))}
      {name && <input type="hidden" name={name} value={value} />}
    </div>
  );
};

export default StarRating;
