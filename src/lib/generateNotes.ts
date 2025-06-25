const NOTES = ['♪', '♫', '♩', '♬'];

const generateNotes = (count: number) =>
  Array.from({ length: count }).map(() => ({
    left: `${Math.random() * 100}%`,
    duration: 12 + Math.random() * 10,
    fontSize: `${10 + Math.random() * 40}px`,
    symbol: NOTES[Math.floor(Math.random() * NOTES.length)],
  }));

export default generateNotes;
