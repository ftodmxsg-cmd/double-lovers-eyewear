
import React from 'react';

const Hero: React.FC = () => {
  // Use a fashion video that prominently features eyewear
  const videoUrl = "https://assets.mixkit.co/videos/preview/mixkit-fashion-model-posing-in-sunglasses-34440-large.mp4";

  return (
    <section className="relative h-screen w-full bg-black overflow-hidden select-none">
      {/* Mirrored Video Background */}
      <div className="absolute inset-0 flex">
        <div className="w-1/2 h-full overflow-hidden relative">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="absolute inset-0 w-full h-full object-cover grayscale brightness-75"
          >
            <source src={videoUrl} type="video/mp4" />
          </video>
        </div>
        <div className="w-1/2 h-full overflow-hidden relative">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="absolute inset-0 w-full h-full object-cover scale-x-[-1] grayscale brightness-75"
          >
            <source src={videoUrl} type="video/mp4" />
          </video>
        </div>
      </div>
      
      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-end pb-[14vh] text-white">
        <h2 className="text-[20px] lg:text-[24px] font-[900] tracking-[0.5em] mb-12 uppercase">
          25FW COLLECTION
        </h2>
        
        <div className="flex items-center gap-16">
          <button className="text-[12px] font-bold tracking-[0.2em] uppercase hover:opacity-50 transition-all duration-300 border-b border-transparent hover:border-white pb-1">
            SHOP NOW
          </button>
          <div className="w-[1px] h-4 bg-white/20"></div>
          <button className="text-[12px] font-bold tracking-[0.2em] uppercase hover:opacity-50 transition-all duration-300 border-b border-transparent hover:border-white pb-1">
            COLLECTION
          </button>
        </div>
      </div>
      
      {/* Progress Circle in Bottom Right */}
      <div className="absolute bottom-12 right-12 flex items-center justify-center">
        <div className="relative w-12 h-12">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle 
              cx="50" cy="50" r="45" 
              fill="none" 
              stroke="rgba(255,255,255,0.15)" 
              strokeWidth="2"
            />
            <circle 
              cx="50" cy="50" r="45" 
              fill="none" 
              stroke="white" 
              strokeWidth="3"
              strokeLinecap="round"
              className="progress-ring-circle"
            />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Hero;
