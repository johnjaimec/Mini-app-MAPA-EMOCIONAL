import React from 'react';
import { Sparkles, HeartHandshake, Compass } from 'lucide-react';

export const HomeHeroBanner: React.FC = () => {
  return (
    <div className="w-full max-w-xl mx-auto my-3 overflow-hidden rounded-2xl border border-[#E4DFD5] bg-[#FAF8F4] shadow-[0_2px_12px_-4px_rgba(38,51,49,0.06)] transition-all">
      {/* Visual illustration container with warm organic backdrop */}
      <div className="relative w-full h-44 sm:h-52 bg-gradient-to-b from-[#EBF2F1] via-[#F4EFE6] to-[#FAF8F4] overflow-hidden flex items-center justify-between px-5 sm:px-8">
        {/* Soft background ambient glows */}
        <div
          className="absolute -top-12 -left-12 w-48 h-48 rounded-full bg-[#356B68]/10 blur-2xl pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute top-2 -right-8 w-44 h-44 rounded-full bg-[#C9A66B]/15 blur-2xl pointer-events-none"
          aria-hidden="true"
        />

        {/* Left text invitation */}
        <div className="relative z-10 max-w-[62%] sm:max-w-[64%]">
          <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-wider text-[#356B68] uppercase bg-[#FAF8F4]/90 backdrop-blur-xs px-2.5 py-1 rounded-md border border-[#E4DFD5] mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A66B]" />
            <span>Escucha a tu cuerpo</span>
          </div>

          <h3 className="text-base sm:text-lg font-bold text-[#263331] leading-snug">
            Cada síntoma tiene un sentido biológico y emocional
          </h3>

          <p className="text-xs sm:text-sm text-[#687572] mt-1.5 leading-relaxed font-normal">
            Descubre qué momento vital activó esta respuesta y obtén la claridad para dar el siguiente paso.
          </p>
        </div>

        {/* Right artistic SVG illustration: mindful body awareness & mapping */}
        <div className="relative z-10 w-28 sm:w-36 h-36 sm:h-44 flex items-center justify-center shrink-0">
          <svg
            viewBox="0 0 160 160"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full drop-shadow-sm"
            aria-hidden="true"
          >
            {/* Soft concentric resonance rings (body resonance / emotional field) */}
            <circle cx="80" cy="80" r="66" stroke="#E4DFD5" strokeWidth="1" strokeDasharray="3 3" opacity="0.7" />
            <circle cx="80" cy="80" r="50" stroke="#C9A66B" strokeWidth="1" opacity="0.35" />
            <circle cx="80" cy="80" r="36" stroke="#356B68" strokeWidth="1.2" opacity="0.25" />

            {/* Stylized serene posture / upper body silhouette contour */}
            {/* Head */}
            <ellipse cx="80" cy="46" rx="14" ry="17" fill="#F0ECE4" stroke="#356B68" strokeWidth="2" />
            
            {/* Neck & Shoulders */}
            <path
              d="M72 61C68 66 52 72 44 86C38 96 38 116 38 124H122C122 116 122 96 116 86C108 72 92 66 88 61"
              fill="#F0ECE4"
              stroke="#356B68"
              strokeWidth="2"
              strokeLinejoin="round"
            />

            {/* Hand gently resting over chest (mindful body listening) */}
            <path
              d="M62 108C68 100 82 86 94 92C99 94 96 102 91 106C85 110 74 116 68 118"
              stroke="#C9A66B"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Radiant golden heart/awareness node */}
            <circle cx="86" cy="92" r="5" fill="#C9A66B" />
            <circle cx="86" cy="92" r="10" stroke="#C9A66B" strokeWidth="1" opacity="0.6" />

            {/* Organic topographical wave indicating 'el camino del mapa' */}
            <path
              d="M24 135C45 125 65 138 90 130C110 123 130 133 144 128"
              stroke="#356B68"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M20 144C40 136 68 146 95 138C118 132 135 142 148 138"
              stroke="#C9A66B"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.8"
            />
          </svg>
        </div>
      </div>

      {/* Supporting bottom caption that invites the potential client */}
      <div className="bg-[#FAF8F4] px-4 py-2.5 border-t border-[#E4DFD5]/80 flex items-center justify-between text-xs text-[#687572]">
        <div className="flex items-center gap-2">
          <HeartHandshake className="w-4 h-4 text-[#356B68]" />
          <span className="font-medium text-[#263331]">
            Un espacio de escucha profunda para ordenar lo que sientes
          </span>
        </div>

        <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-[#356B68] font-semibold">
          <Compass className="w-3.5 h-3.5 text-[#C9A66B]" />
          Orientación inicial
        </span>
      </div>
    </div>
  );
};
