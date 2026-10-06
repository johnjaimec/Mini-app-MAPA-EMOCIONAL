import React from 'react';
import { ScreenId } from '../types';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface NavigationHeaderProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  maxUnlockedScreen: ScreenId;
}

const SCREENS: { id: ScreenId; label: string; shortLabel: string; stepNumber: number }[] = [
  { id: 'inicio', label: 'Inicio', shortLabel: 'Inicio', stepNumber: 1 },
  { id: 'evaluacion', label: 'Evaluación', shortLabel: 'Evaluación', stepNumber: 2 },
  { id: 'mapa', label: 'Tu Mapa', shortLabel: 'Mapa', stepNumber: 3 },
  { id: 'contacto', label: 'Contacto', shortLabel: 'Contacto', stepNumber: 4 },
];

export const NavigationHeader: React.FC<NavigationHeaderProps> = ({
  currentScreen,
  onNavigate,
  maxUnlockedScreen,
}) => {
  const currentIndex = SCREENS.findIndex((s) => s.id === currentScreen);
  const maxIndex = SCREENS.findIndex((s) => s.id === maxUnlockedScreen);

  const canGoBack = currentIndex > 0;
  const canGoForward = currentIndex < SCREENS.length - 1 && currentIndex < maxIndex;

  const handlePrev = () => {
    if (canGoBack) {
      onNavigate(SCREENS[currentIndex - 1].id);
    }
  };

  const handleNext = () => {
    if (canGoForward) {
      onNavigate(SCREENS[currentIndex + 1].id);
    }
  };

  return (
    <header className="w-full max-w-xl mx-auto pt-2 pb-3 mb-2">
      {/* Top Brand row with Back/Forward shortcuts */}
      <div className="flex items-center justify-between gap-2 mb-3">
        {/* Back button */}
        <button
          type="button"
          onClick={handlePrev}
          disabled={!canGoBack}
          aria-label="Ir a la pantalla anterior"
          className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            canGoBack
              ? 'text-[#263331] hover:text-[#356B68] hover:bg-[#F0ECE4] border border-[#E4DFD5] bg-[#FAF8F4] cursor-pointer'
              : 'text-[#687572]/40 border border-transparent cursor-not-allowed opacity-0 pointer-events-none'
          }`}
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span className="hidden xs:inline sm:inline">Atrás</span>
        </button>

        {/* Center Logo */}
        <div className="flex-1 flex justify-center">
          <BrandLogo size="sm" />
        </div>

        {/* Forward button */}
        <button
          type="button"
          onClick={handleNext}
          disabled={!canGoForward}
          aria-label="Ir a la pantalla siguiente"
          className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            canGoForward
              ? 'text-[#356B68] hover:text-[#285451] hover:bg-[#F0ECE4] border border-[#356B68]/30 bg-[#FAF8F4] cursor-pointer'
              : 'text-[#687572]/40 border border-transparent cursor-not-allowed opacity-0 pointer-events-none'
          }`}
        >
          <span className="hidden xs:inline sm:inline">Adelante</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Screen Sequence Stepper with unboxed metadata discipline */}
      <nav aria-label="Navegación entre pantallas" className="bg-[#FAF8F4] border border-[#E4DFD5] rounded-xl p-1.5 shadow-[0_1px_3px_rgba(38,51,49,0.03)]">
        <div className="grid grid-cols-4 gap-1 items-center">
          {SCREENS.map((screen, idx) => {
            const isCurrent = screen.id === currentScreen;
            const isUnlocked = idx <= maxIndex;

            return (
              <button
                key={screen.id}
                type="button"
                onClick={() => isUnlocked && onNavigate(screen.id)}
                disabled={!isUnlocked}
                title={
                  isUnlocked
                    ? `Ir a ${screen.label}`
                    : `Completa los pasos anteriores para acceder a ${screen.label}`
                }
                className={`py-1.5 px-1 sm:px-2 rounded-lg text-center transition-all text-[11px] sm:text-xs font-medium flex flex-col sm:flex-row items-center justify-center gap-1 ${
                  isCurrent
                    ? 'bg-[#356B68] text-[#F8F5EF] font-semibold shadow-xs'
                    : isUnlocked
                    ? 'text-[#263331] hover:bg-[#F0ECE4] hover:text-[#356B68] cursor-pointer'
                    : 'text-[#687572]/50 cursor-not-allowed'
                }`}
              >
                <span
                  className={`w-4 h-4 rounded-full text-[10px] flex items-center justify-center font-bold shrink-0 ${
                    isCurrent
                      ? 'bg-[#FAF8F4] text-[#356B68]'
                      : isUnlocked
                      ? 'bg-[#F0ECE4] text-[#263331]'
                      : 'bg-[#E4DFD5]/50 text-[#687572]/60'
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
    </header>
  );
};
