import { useId, useMemo } from 'react';
import generateNotes from '@/lib/generateNotes';

const BackgroundAnimation = ({ countNotes = 30 }: { countNotes?: number }) => {
  const id = useId();
  const notes = useMemo(() => generateNotes(countNotes), [countNotes]);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden will-change-transform">
      {notes.map((note, i) => (
        <div
          key={`${id}-${i}`}
          className="absolute text-2xl opacity-70"
          style={{
            top: '-5%',
            left: note.left,
            animation: `falling-notes ${note.duration}s linear infinite`,
            animationDelay: note.animationDelay,
            fontSize: note.fontSize,
          }}>
          {note.symbol}
        </div>
      ))}
    </div>
  );
};

export default BackgroundAnimation;
