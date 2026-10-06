import React, { useState } from 'react';
import { AppHeader } from './AppHeader';
import { HomeHeroBanner } from './HomeHeroBanner';
import { ConfidentialityBadge } from './ConfidentialityBadge';
import { Clock, Shield, X, ArrowRight, Compass } from 'lucide-react';
import { ScreenId } from '../types';

interface ScreenInicioProps {
  onStart: () => void;
  onNavigate: (screen: ScreenId) => void;
  maxUnlockedScreen: ScreenId;
  hasCompletedEvaluation: boolean;
}

export const ScreenInicio: React.FC<ScreenInicioProps> = ({
  onStart,
  onNavigate,
  maxUnlockedScreen,
  hasCompletedEvaluation,
}) => {
  const [showHowItWorks, setShowHowItWorks] = useState(false);

  const canGoToEvaluation = maxUnlockedScreen !== 'inicio';
  const canGoToMap = maxUnlockedScreen === 'mapa' || maxUnlockedScreen === 'contacto' || hasCompletedEvaluation;

  return (
    <div className="min-h-screen bg-[#F8F5EF] flex flex-col justify-between py-5 px-4 sm:px-6 md:px-8">
      {/* Título y subtítulo arriba y debajo el menú */}
      <AppHeader
        currentScreen="inicio"
        onNavigate={onNavigate}
        maxUnlockedScreen={maxUnlockedScreen}
        hasCompletedEvaluation={hasCompletedEvaluation}
      />

      {/* Imagen / Banner visual entre el menú y lo que sigue */}
      <HomeHeroBanner />

      {/* Main Hero Container */}
      <main className="w-full max-w-xl mx-auto my-auto py-2 sm:py-4">
        <div className="bg-[#FAF8F4] border border-[#E4DFD5] rounded-2xl p-6 sm:p-10 shadow-[0_2px_12px_-4px_rgba(38,51,49,0.05)]">
          {/* Subtle time / format reassurance */}
          <div className="flex items-center gap-2 text-xs font-medium text-[#687572] mb-5">
            <span className="inline-flex items-center gap-1.5 bg-[#F0ECE4] text-[#356B68] px-2.5 py-1 rounded-md border border-[#E4DFD5]/60">
              <Clock className="w-3.5 h-3.5 text-[#356B68]" />
              Evaluación inicial · 3–5 minutos
            </span>
          </div>

          {/* Main Headline */}
          <h2 className="text-2xl sm:text-3xl md:text-[34px] font-bold text-[#263331] leading-[1.25] tracking-tight mb-4 text-balance">
            ¿Quieres entender mejor lo que estás viviendo?
          </h2>

          {/* Short explanation */}
          <p className="text-base sm:text-lg text-[#687572] leading-relaxed font-normal mb-8">
            En unos minutos podrás ordenar qué quieres explorar, qué estaba ocurriendo en tu vida y qué te gustaría trabajar.
          </p>

          {/* Calming visual focal line: reflection motif */}
          <div className="relative my-6 py-4 px-4 bg-[#F0ECE4]/60 rounded-xl border border-[#E4DFD5]/70 flex items-center gap-3.5">
            <div className="w-8 h-8 rounded-lg bg-[#356B68]/10 flex items-center justify-center shrink-0">
              <Compass className="w-4 h-4 text-[#356B68]" />
            </div>
            <p className="text-xs sm:text-sm text-[#263331] leading-snug">
              Un espacio pausado para poner palabras a tu experiencia antes de iniciar cualquier proceso.
            </p>
          </div>

          {/* Dominant Primary Action Button & Navigation Options */}
          <div className="space-y-3 pt-2">
            <button
              type="button"
              onClick={onStart}
              className="w-full min-h-[54px] bg-[#356B68] hover:bg-[#285451] active:scale-[0.985] text-[#F8F5EF] font-semibold text-base sm:text-lg rounded-xl px-6 py-3.5 shadow-[0_4px_16px_rgba(53,107,104,0.18)] transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#356B68] focus:ring-offset-2"
            >
              <span>{canGoToEvaluation ? 'Continuar mi evaluación' : 'Comenzar mi evaluación'}</span>
              <ArrowRight className="w-5 h-5 text-[#C9A66B]" />
            </button>

            {/* Debajo del botón de llamado a la acción: texto resaltado de confidencialidad */}
            <ConfidentialityBadge />

            {/* If user already completed evaluation, allow direct jump forward to Map */}
            {canGoToMap && (
              <button
                type="button"
                onClick={() => onNavigate('mapa')}
                className="w-full min-h-[48px] bg-[#F0ECE4] hover:bg-[#E8E3D9] text-[#263331] font-semibold text-sm rounded-xl px-4 py-2.5 border border-[#E4DFD5] transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Ver directamente mi mapa inicial</span>
                <ArrowRight className="w-4 h-4 text-[#356B68]" />
              </button>
            )}

            {/* Secondary text link: ¿Cómo funciona? */}
            <div className="text-center pt-1">
              <button
                type="button"
                onClick={() => setShowHowItWorks(true)}
                className="text-sm font-medium text-[#687572] hover:text-[#263331] underline decoration-[#E4DFD5] hover:decoration-[#356B68] underline-offset-4 transition-colors py-1 px-3 cursor-pointer"
              >
                ¿Cómo funciona?
              </button>
            </div>
          </div>

          {/* Discreet Reassuring Notice */}
          <div className="mt-8 pt-6 border-t border-[#E4DFD5]/80 flex items-start gap-2.5 text-xs text-[#687572] leading-relaxed">
            <Shield className="w-4 h-4 text-[#C9A66B] shrink-0 mt-0.5" />
            <p>
              Esta evaluación tiene carácter <strong className="font-medium text-[#263331]">orientativo y reflexivo</strong>. No constituye un diagnóstico médico ni reemplaza la atención de un profesional de la salud.
            </p>
          </div>
        </div>
      </main>

      {/* Gentle Footer */}
      <footer className="w-full max-w-xl mx-auto py-3 text-center text-xs text-[#687572]">
        <p>Herramienta diseñada para acompañar tu proceso de autoconocimiento.</p>
      </footer>

      {/* "¿Cómo funciona?" Modal / Sheet */}
      {showHowItWorks && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#263331]/40 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setShowHowItWorks(false)}
        >
          <div
            className="w-full max-w-lg bg-[#FAF8F4] border border-[#E4DFD5] rounded-2xl p-6 sm:p-8 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-[#E4DFD5]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#C9A66B]" />
                <h3 className="text-lg font-semibold text-[#263331]">¿Cómo funciona Mapa Emocional?</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowHowItWorks(false)}
                className="p-1 rounded-lg text-[#687572] hover:text-[#263331] hover:bg-[#F0ECE4] transition-colors"
                aria-label="Cerrar explicación"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-5 space-y-4 text-sm text-[#263331] leading-relaxed">
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#356B68]/10 text-[#356B68] font-semibold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  1
                </span>
                <div>
                  <h4 className="font-semibold text-[#263331]">Respondes con calma</h4>
                  <p className="text-xs sm:text-sm text-[#687572]">
                    Un cuestionario breve de 7 preguntas para identificar qué situación, malestar o síntoma deseas explorar y en qué contexto vital apareció.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#356B68]/10 text-[#356B68] font-semibold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  2
                </span>
                <div>
                  <h4 className="font-semibold text-[#263331]">Recibes tu mapa inicial</h4>
                  <p className="text-xs sm:text-sm text-[#687572]">
                    El sistema estructura tus respuestas y destaca áreas de reflexión desde la perspectiva de Biodescodificación, sin emitir juicios ni diagnósticos médicos.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#356B68]/10 text-[#356B68] font-semibold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  3
                </span>
                <div>
                  <h4 className="font-semibold text-[#263331]">Decides profundizar</h4>
                  <p className="text-xs sm:text-sm text-[#687572]">
                    Con tu mapa claro, podrás contactar a un profesional y llevar estos puntos ordenados a una primera sesión.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-[#E4DFD5] flex justify-end">
              <button
                type="button"
                onClick={() => {
                  setShowHowItWorks(false);
                  onStart();
                }}
                className="w-full sm:w-auto px-5 py-2.5 bg-[#356B68] hover:bg-[#285451] text-[#F8F5EF] text-sm font-semibold rounded-xl transition-colors cursor-pointer"
              >
                Comenzar ahora
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

