
import React, { useState, useRef, useCallback } from 'react';
import { getStylistAdvice } from '../services/geminiService';
import { StylistRecommendation } from '../types';

const VirtualStylist: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [recommendation, setRecommendation] = useState<StylistRecommendation | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraActive(true);
        setRecommendation(null);
      }
    } catch (err) {
      alert("Camera permission denied or not available.");
    }
  };

  const captureAndAnalyze = useCallback(async () => {
    if (!videoRef.current || !canvasRef.current) return;
    
    setIsAnalyzing(true);
    const context = canvasRef.current.getContext('2d');
    if (!context) return;

    canvasRef.current.width = videoRef.current.videoWidth;
    canvasRef.current.height = videoRef.current.videoHeight;
    context.drawImage(videoRef.current, 0, 0);
    
    const dataUrl = canvasRef.current.toDataURL('image/jpeg', 0.8);
    const base64 = dataUrl.split(',')[1];
    
    const advice = await getStylistAdvice(base64);
    setRecommendation(advice);
    setIsAnalyzing(false);
    
    // Stop camera
    const stream = videoRef.current.srcObject as MediaStream;
    stream.getTracks().forEach(track => track.stop());
    setIsCameraActive(false);
  }, []);

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-10 right-10 z-40 bg-black text-white w-20 h-20 rounded-full flex items-center justify-center text-[10px] font-bold uppercase tracking-widest hover:scale-110 transition-transform shadow-2xl"
      >
        Stylist
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
          <div className="relative bg-white w-full max-w-xl p-8 lg:p-12 shadow-2xl rounded-none flex flex-col items-center">
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 text-2xl hover:opacity-50"
            >
              ✕
            </button>
            
            <h2 className="text-3xl font-black brand-font uppercase mb-4 text-center">AI Virtual Stylist</h2>
            <p className="text-[12px] text-neutral-500 tracking-wide mb-8 text-center max-w-sm">
              Discover your perfect frame shape with our Gemini-powered style analysis.
            </p>

            {!isCameraActive && !recommendation && (
              <button 
                onClick={startCamera}
                className="bg-black text-white px-10 py-4 text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-neutral-800 transition-colors"
              >
                Scan My Face
              </button>
            )}

            {isCameraActive && (
              <div className="relative w-full aspect-square bg-neutral-100 mb-8 overflow-hidden rounded-full max-w-sm">
                <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover scale-x-[-1]" />
                <button 
                  onClick={captureAndAnalyze}
                  disabled={isAnalyzing}
                  className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white text-black px-6 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-xl disabled:opacity-50"
                >
                  {isAnalyzing ? 'Analyzing...' : 'Analyze Face'}
                </button>
              </div>
            )}

            <canvas ref={canvasRef} className="hidden" />

            {recommendation && (
              <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="p-6 bg-neutral-50 border border-neutral-100">
                  <h4 className="text-[11px] font-bold uppercase tracking-widest text-neutral-400 mb-2">Recommendation</h4>
                  <p className="text-[14px] leading-relaxed italic mb-6">"{recommendation.reasoning}"</p>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-1">Best Shapes</h4>
                      <ul className="text-[13px] font-medium uppercase">
                        {recommendation.suggestedShapes.map(s => <li key={s}>• {s}</li>)}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-1">Color Palette</h4>
                      <ul className="text-[13px] font-medium uppercase">
                        {recommendation.suggestedColors.map(c => <li key={c}>• {c}</li>)}
                      </ul>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => { setRecommendation(null); startCamera(); }}
                  className="mt-6 w-full text-[11px] font-bold underline uppercase tracking-widest"
                >
                  Try Again
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default VirtualStylist;
