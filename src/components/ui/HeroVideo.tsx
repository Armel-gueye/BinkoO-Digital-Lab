import React from 'react';

interface HeroVideoProps {
  videoUrl: string;
  posterUrl?: string;
  className?: string;
}

export const HeroVideo: React.FC<HeroVideoProps> = ({
  videoUrl,
  posterUrl,
  className = ""
}) => {
  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      <video
        autoPlay
        muted
        loop
        playsInline
        poster={posterUrl}
        className="w-full h-full object-cover scale-[1.55] transform-gpu"
        style={{ filter: 'brightness(1.05)' }}
        aria-hidden="true"
      >
        <source src={videoUrl} type="video/mp4" />
        {/* Fallback support for older browsers */}
        Votre navigateur ne prend pas en charge la vidéo.
      </video>
    </div>
  );
};

export default HeroVideo;
