import { useId, useMemo } from 'react';
import generateNotes from '../utils/generateNotes';

const BackgroundAnimation = ({ countNotes = 30 }) => {
  const id = useId();
  const notes = useMemo(() => generateNotes(countNotes), [countNotes]);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden will-change-transform">
      {notes.map((note, i) => (
        <div
          key={`${id}-${i}`}
          className="absolute text-2xl opacity-70"
          style={{
            left: note.left,
            animation: `falling-notes ${note.duration}s linear infinite`,
            fontSize: note.fontSize,
          }}>
          {note.symbol}
        </div>
      ))}
    </div>
  );
};

export default BackgroundAnimation;
