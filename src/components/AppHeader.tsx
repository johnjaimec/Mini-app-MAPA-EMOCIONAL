import React from 'react';
import { ScreenId } from '../types';

interface AppHeaderProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  maxUnlockedScreen: ScreenId;
  hasCompletedEvaluation?: boolean;
}

const SCREENS: { id: ScreenId; label: string; shortLabel: string; stepNumber: number }[] = [
  { id: 'inicio', label: 'Inicio', shortLabel: 'Inicio', stepNumber: 1 },
  { id: 'evaluacion', label: 'Evaluación', shortLabel: 'Evaluación', stepNumber: 2 },
  { id: 'mapa', label: 'Tu Mapa', shortLabel: 'Tu Mapa', stepNumber: 3 },
  { id: 'contacto', label: 'Contacto', shortLabel: 'Contacto', stepNumber: 4 },
];

export const AppHeader: React.FC<AppHeaderProps> = ({
  currentScreen,
  onNavigate,
  maxUnlockedScreen,
  hasCompletedEvaluation = false,
}) => {
  const maxIndex = SCREENS.findIndex((s) => s.id === maxUnlockedScreen);

  // Consider map accessible if hasCompletedEvaluation is true
  const isScreenUnlocked = (screenId: ScreenId, index: number) => {
    if (index === 0) return true;
    if (screenId === 'mapa' && hasCompletedEvaluation) return true;
    if (screenId === 'contacto' && (maxUnlockedScreen === 'contacto' || hasCompletedEvaluation)) return true;
    return index <= maxIndex;
  };

  return (
    <header className="w-full max-w-xl mx-auto pt-2 pb-3 mb-1 text-center">
      {/* Sutil marca visual de reflejo y mapa */}
      <div className="flex justify-center mb-2.5" aria-hidden="true">
        <div className="w-9 h-9 rounded-xl bg-[#F0ECE4] border border-[#E4DFD5] flex items-center justify-center">
          <svg viewBox="0 0 32 32" fill="none" className="w-5 h-5">
            <path
              d="M6 21C9 15 14 13 18 16C22 19 25 15 26 12"
              stroke="#356B68"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M7 24C11 20 15 18 19 20C22.5 21.8 24.5 19.5 25.5 18"
              stroke="#C9A66B"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.85"
            />
            <circle cx="18" cy="16" r="2.2" fill="#356B68" />
          </svg>
        </div>
      </div>

      {/* Título: centrado y con fuente de texto más grande */}
      <h1 className="text-xl sm:text-2xl md:text-[26px] font-bold text-[#263331] uppercase tracking-tight text-center leading-tight px-2 text-balance">
        MAPA EMOCIONAL - LO QUE TU CUERPO HABLA
      </h1>

      {/* Renglón de separación entre el título y el subtítulo */}
      <div className="h-2.5 sm:h-3" aria-hidden="true" />

      {/* Subtítulo: centrado */}
      <p className="text-sm sm:text-base text-[#687572] font-normal leading-relaxed text-center px-4 max-w-lg mx-auto">
        Identifica la emoción no resuelta que está manifestando tu cuerpo.
      </p>

      {/* Debajo el menú */}
      <div className="mt-4">
        <nav
          aria-label="Menú de pantallas del proceso"
          className="bg-[#FAF8F4] border border-[#E4DFD5] rounded-xl p-1 shadow-[0_1px_3px_rgba(38,51,49,0.03)]"
        >
          <div className="grid grid-cols-4 gap-1 items-center text-center">
            {SCREENS.map((screen, idx) => {
              const isCurrent = screen.id === currentScreen;
              const unlocked = isScreenUnlocked(screen.id, idx);

              return (
                <button
                  key={screen.id}
                  type="button"
                  onClick={() => unlocked && onNavigate(screen.id)}
                  disabled={!unlocked}
                  title={
                    unlocked
                      ? `Ir a ${screen.label}`
                      : `Completa los pasos anteriores para acceder a ${screen.label}`
                  }
                  className={`py-1.5 px-1 sm:px-2 rounded-lg text-center transition-all text-[11px] sm:text-xs font-medium flex flex-col sm:flex-row items-center justify-center gap-1 ${
                    isCurrent
                      ? 'bg-[#356B68] text-[#F8F5EF] font-semibold shadow-xs'
                      : unlocked
                      ? 'text-[#263331] hover:bg-[#F0ECE4] hover:text-[#356B68] cursor-pointer'
                      : 'text-[#687572]/45 cursor-not-allowed'
                  }`}
                >
                  <span
                    className={`w-4 h-4 rounded-full text-[10px] flex items-center justify-center font-bold shrink-0 ${
                      isCurrent
                        ? 'bg-[#FAF8F4] text-[#356B68]'
                        : unlocked
                        ? 'bg-[#F0ECE4] text-[#263331]'
                        : 'bg-[#E4DFD5]/40 text-[#687572]/50'
                    }`}
                  >
                    {screen.stepNumber}
                  </span>
                  <span className="truncate">{screen.shortLabel}</span>
                </button>
              );
            })}
          </div>
        </nav>
      </div>
    </header>
  );
};
