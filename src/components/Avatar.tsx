import { useEffect, useState } from 'react';

interface AvatarProps {
  isSpeaking: boolean;
  isListening: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export default function Avatar({ isSpeaking, isListening, size = 'lg' }: AvatarProps) {
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    if (isSpeaking || isListening) {
      setPulse(true);
    } else {
      setPulse(false);
    }
  }, [isSpeaking, isListening]);

  const sizeClasses = {
    sm: 'w-20 h-20',
    md: 'w-32 h-32',
    lg: 'w-48 h-48',
  };

  return (
    <div className="relative flex items-center justify-center">
      {/* Outer glow ring */}
      <div className={`absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/20 to-cyan-500/20 blur-xl transition-all duration-500 ${pulse ? 'scale-125 opacity-100' : 'scale-100 opacity-50'}`} />
      
      {/* Animated rings */}
      {(isSpeaking || isListening) && (
        <>
          <div className="absolute inset-0 rounded-full border-2 border-purple-400/30 animate-ping" />
          <div className="absolute inset-2 rounded-full border border-cyan-400/20 animate-pulse" />
        </>
      )}
      
      {/* Main avatar container */}
      <div className={`${sizeClasses[size]} relative rounded-full bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-purple-500/50 flex items-center justify-center overflow-hidden shadow-2xl shadow-purple-500/20`}>
        {/* Avatar face SVG */}
        <svg viewBox="0 0 200 200" className="w-full h-full">
          {/* Background gradient */}
          <defs>
            <linearGradient id="faceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient id="eyeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a78bfa" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
          </defs>
          
          {/* Face circle */}
          <circle cx="100" cy="100" r="90" fill="url(#faceGrad)" />
          
          {/* Hair */}
          <path d="M30 80 Q50 20 100 25 Q150 20 170 80 Q165 50 100 45 Q35 50 30 80" fill="#4c1d95" opacity="0.8" />
          
          {/* Eyes */}
          <g className={isSpeaking ? 'animate-pulse' : ''}>
            <ellipse cx="75" cy="90" rx="12" ry="14" fill="url(#eyeGrad)" opacity="0.9" />
            <ellipse cx="125" cy="90" rx="12" ry="14" fill="url(#eyeGrad)" opacity="0.9" />
            <circle cx="75" cy="88" r="5" fill="white" opacity="0.8" />
            <circle cx="125" cy="88" r="5" fill="white" opacity="0.8" />
          </g>
          
          {/* Eyebrows */}
          <path d="M58 72 Q75 65 90 72" stroke="#a78bfa" strokeWidth="2.5" fill="none" opacity="0.7" />
          <path d="M110 72 Q125 65 142 72" stroke="#a78bfa" strokeWidth="2.5" fill="none" opacity="0.7" />
          
          {/* Nose */}
          <path d="M97 100 Q100 110 103 100" stroke="#a78bfa" strokeWidth="1.5" fill="none" opacity="0.5" />
          
          {/* Mouth */}
          {isSpeaking ? (
            <ellipse cx="100" cy="130" rx="15" ry="10" fill="#7c3aed" opacity="0.6">
              <animate attributeName="ry" values="10;6;10;8;10" dur="0.5s" repeatCount="indefinite" />
            </ellipse>
          ) : (
            <path d="M85 128 Q100 138 115 128" stroke="#a78bfa" strokeWidth="2.5" fill="none" opacity="0.7" />
          )}
          
          {/* Decorative elements */}
          <circle cx="55" cy="110" r="8" fill="#ec4899" opacity="0.15" />
          <circle cx="145" cy="110" r="8" fill="#ec4899" opacity="0.15" />
          
          {/* Headset */}
          <path d="M35 85 Q30 60 50 50" stroke="#06b6d4" strokeWidth="3" fill="none" opacity="0.6" />
          <path d="M165 85 Q170 60 150 50" stroke="#06b6d4" strokeWidth="3" fill="none" opacity="0.6" />
          <circle cx="35" cy="90" r="8" fill="#06b6d4" opacity="0.4" />
          <path d="M35 98 Q40 120 55 130" stroke="#06b6d4" strokeWidth="2" fill="none" opacity="0.4" />
          <circle cx="55" cy="132" r="5" fill="#06b6d4" opacity="0.5" />
        </svg>
      </div>
      
      {/* Status indicator */}
      <div className={`absolute bottom-2 right-2 w-5 h-5 rounded-full border-2 border-slate-900 ${
        isSpeaking ? 'bg-green-400 animate-pulse' : 
        isListening ? 'bg-red-400 animate-pulse' : 
        'bg-gray-500'
      }`} />
    </div>
  );
}
