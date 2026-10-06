import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  centered?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ size = 'md', centered = false }) => {
  const isSm = size === 'sm';
  const isLg = size === 'lg';

  return (
    <div className={`flex items-center gap-3 ${centered ? 'justify-center' : ''}`}>
      {/* Subtle mark suggesting mapping, path, and reflection without mystical or medical crosses */}
      <div
        className={`relative flex items-center justify-center rounded-xl bg-[#F0ECE4] border border-[#E4DFD5] ${
          isSm ? 'w-9 h-9' : isLg ? 'w-12 h-12' : 'w-10 h-10'
        } transition-transform duration-200`}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={isSm ? 'w-5 h-5' : isLg ? 'w-7 h-7' : 'w-6 h-6'}
        >
          {/* Subtle outer curved contour (landscape/horizon/topography) */}
          <path
            d="M6 21C9 15 14 13 18 16C22 19 25 15 26 12"
            stroke="#356B68"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Subtle inner reflection contour */}
          <path
            d="M7 24C11 20 15 18 19 20C22.5 21.8 24.5 19.5 25.5 18"
            stroke="#C9A66B"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.85"
          />
          {/* Focal anchor node */}
          <circle cx="18" cy="16" r="2.2" fill="#356B68" />
        </svg>
      </div>

      <div className="flex flex-col">
        <span
          className={`font-semibold tracking-tight text-[#263331] leading-tight ${
            isSm ? 'text-base' : isLg ? 'text-xl' : 'text-lg'
          }`}
        >
          Mapa Emocional
        </span>
        <span className="text-[11px] text-[#687572] tracking-normal font-normal">
          Biodescodificación · Evaluación inicial
        </span>
      </div>
    </div>
  );
};
