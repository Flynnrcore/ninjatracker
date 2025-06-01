const BackgroundAnimation = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden will-change-transform">
      {[...Array(30)].map((_, i) => (
        <div
          key={i}
          className="absolute text-2xl opacity-70"
          style={{
            left: `${Math.random() * 100}%`,
            animation: `falling-notes ${10 + Math.random() * 10}s linear infinite`,
            fontSize: `${Math.random() * 40}px`,
          }}
        >
          {['♪', '♫', '♩', '♬'][Math.floor(Math.random() * 4)]}
        </div>
      ))}
    </div>
  );
};

export default BackgroundAnimation;
