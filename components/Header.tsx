
import React, { useState, useEffect } from 'react';

interface HeaderProps {
  onLogoClick?: () => void;
  onSupportClick?: () => void;
  onOpticalClick?: () => void;
  isSolid?: boolean;
  cartCount?: number;
}

const Header: React.FC<HeaderProps> = ({ 
  onLogoClick, 
  onSupportClick, 
  onOpticalClick, 
  isSolid = false,
  cartCount = 0
}) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const showSolidHeader = isSolid || isScrolled;
  const textColor = showSolidHeader ? 'text-black' : 'text-white';
  const iconStroke = showSolidHeader ? 'black' : 'white';

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${showSolidHeader ? 'bg-white shadow-sm' : 'bg-transparent'}`}>
      <div className={`relative w-full h-[34px] flex items-center justify-center overflow-hidden transition-colors duration-500 ${showSolidHeader ? 'border-b border-black/5' : 'border-b border-white/10'}`}>
        <div className={`absolute inset-0 z-0 transition-opacity duration-1000 ${showSolidHeader ? 'opacity-0' : 'opacity-40'}`}>
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-full object-cover grayscale brightness-50"
          >
            <source src="https://assets.mixkit.co/videos/preview/mixkit-waves-of-black-silk-fabric-42476-large.mp4" type="video/mp4" />
          </video>
        </div>
        
        <span className={`relative z-10 text-[10px] tracking-[0.05em] font-medium uppercase transition-colors duration-500 ${showSolidHeader ? 'text-black/60' : 'text-white/90'}`}>
          Official Online Store Open • Worldwide Shipping
        </span>
      </div>
      
      <div className="container mx-auto px-5 lg:px-10 flex justify-between items-center h-[70px] relative">
        <nav className={`hidden xl:flex items-center gap-8 ${textColor}`}>
          <button onClick={onOpticalClick} className="nav-text hover:opacity-50 transition-opacity uppercase tracking-widest font-bold">Optical</button>
          <button onClick={onSupportClick} className="nav-text hover:opacity-50 transition-opacity uppercase tracking-widest font-bold">Support</button>
        </nav>

        <div className="absolute left-1/2 -translate-x-1/2">
          <button 
            onClick={onLogoClick} 
            className={`text-[26px] lg:text-[28px] font-[900] tracking-tight transition-colors duration-500 uppercase ${textColor} hover:opacity-70 brand-font`}
          >
            TURNOUT
          </button>
        </div>

        <nav className={`flex items-center gap-6 ${textColor}`}>
          <div className="hidden md:flex items-center gap-5 mr-1">
            <button className="nav-text uppercase hover:opacity-50 transition-opacity tracking-widest">Lang</button>
            <button className="nav-text uppercase hover:opacity-50 transition-opacity tracking-widest">Account</button>
          </div>
          
          <div className="flex items-center gap-5">
            <button className="hover:opacity-50 transition-opacity">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={iconStroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
            <button className="hover:opacity-50 transition-opacity relative">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={iconStroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
              <span className={`absolute -top-1.5 -right-1.5 text-[7px] font-black w-3.5 h-3.5 rounded-full flex items-center justify-center border transition-all duration-500 ${showSolidHeader ? 'bg-black text-white border-white' : 'bg-white text-black border-black'}`}>
                {cartCount}
              </span>
            </button>
            <button className="xl:hidden hover:opacity-50 transition-opacity">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={iconStroke} strokeWidth="2" strokeLinecap="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
