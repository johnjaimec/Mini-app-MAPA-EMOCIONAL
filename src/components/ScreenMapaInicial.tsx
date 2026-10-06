import React from 'react';
import { AppHeader } from './AppHeader';
import { ConfidentialityBadge } from './ConfidentialityBadge';
import { EvaluationData, ScreenId } from '../types';
import { generateEmotionalMap } from '../utils/mapGenerator';
import {
  ArrowRight,
  ArrowLeft,
  Shield,
  Clock,
  Activity,
  Layers,
  Sparkles,
  Compass,
} from 'lucide-react';

interface ScreenMapaInicialProps {
  evaluationData: EvaluationData;
  onContinueToContact: () => void;
  onEditAnswers: () => void;
  onNavigate: (screen: ScreenId) => void;
  maxUnlockedScreen: ScreenId;
}

export const ScreenMapaInicial: React.FC<ScreenMapaInicialProps> = ({
  evaluationData,
  onContinueToContact,
  onEditAnswers,
  onNavigate,
  maxUnlockedScreen,
}) => {
  const mapData = generateEmotionalMap(evaluationData);

  return (
    <div className="min-h-screen bg-[#F8F5EF] flex flex-col justify-between py-5 px-4 sm:px-6 md:px-8">
      {/* Título y subtítulo arriba y debajo el menú */}
      <AppHeader
        currentScreen="mapa"
        onNavigate={onNavigate}
        maxUnlockedScreen={maxUnlockedScreen}
        hasCompletedEvaluation={true}
      />

      {/* Barra de navegación rápida contextual */}
      <div className="w-full max-w-xl mx-auto pt-1 pb-2 flex items-center justify-between">
        <button
          type="button"
          onClick={onEditAnswers}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-[#687572] hover:text-[#263331] py-1.5 px-2.5 rounded-lg border border-[#E4DFD5] bg-[#FAF8F4] hover:bg-[#F0ECE4] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Volver a Evaluación</span>
        </button>

        <button
          type="button"
          onClick={onContinueToContact}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#356B68] hover:text-[#285451] py-1.5 px-2.5 rounded-lg border border-[#356B68]/30 bg-[#FAF8F4] hover:bg-[#F0ECE4] transition-colors cursor-pointer"
        >
          <span>Avanzar a Contacto</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#C9A66B]" />
        </button>
      </div>

      {/* Main Container */}
      <main className="w-full max-w-xl mx-auto my-auto py-2">
        {/* Title & Introduction Banner */}
        <div className="mb-6 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider text-[#C9A66B] uppercase mb-1.5">
            <Compass className="w-4 h-4 text-[#C9A66B]" />
            <span>Resultado de tu evaluación</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#263331] tracking-tight leading-tight">
            TU MAPA INICIAL
          </h1>
          <p className="text-sm sm:text-base text-[#687572] mt-2 font-normal">
            Tus respuestas nos ayudan a ordenar lo que quieres explorar.
          </p>
        </div>

        {/* Visually connected result sections */}
        <div className="space-y-4">
          {/* SECTION 1: Lo que quieres explorar */}
          <section className="bg-[#FAF8F4] border border-[#E4DFD5] rounded-2xl p-5 sm:p-6 shadow-[0_2px_8px_-2px_rgba(38,51,49,0.04)]">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#356B68] mb-2.5">
              <span className="w-2 h-2 rounded-full bg-[#356B68]" />
              <h3>Lo que quieres explorar</h3>
            </div>

            <div className="bg-[#F0ECE4]/70 border border-[#E4DFD5]/80 rounded-xl p-4">
              <div className="text-xs font-medium text-[#687572] mb-1">
                {mapData.explorationTypeLabel}
              </div>
              <p className="text-base sm:text-lg font-semibold text-[#263331] leading-snug">
                "{mapData.situationTitle}"
              </p>
            </div>
          </section>

          {/* SECTION 2: Cómo lo estás viviendo */}
          <section className="bg-[#FAF8F4] border border-[#E4DFD5] rounded-2xl p-5 sm:p-6 shadow-[0_2px_8px_-2px_rgba(38,51,49,0.04)]">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#356B68] mb-3">
              <span className="w-2 h-2 rounded-full bg-[#356B68]" />
              <h3>Cómo lo estás viviendo</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Duration card */}
              <div className="bg-[#F0ECE4]/50 border border-[#E4DFD5]/80 rounded-xl p-3.5 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#356B68]/10 text-[#356B68] flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-[#687572]">Tiempo transcurrido</div>
                  <div className="text-sm font-semibold text-[#263331] mt-0.5">
                    {mapData.durationLabel}
                  </div>
                </div>
              </div>

              {/* Impact card */}
              <div className="bg-[#F0ECE4]/50 border border-[#E4DFD5]/80 rounded-xl p-3.5 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#C9A66B]/15 text-[#765a26] flex items-center justify-center shrink-0">
                  <Activity className="w-4 h-4 text-[#C9A66B]" />
                </div>
                <div className="flex-1">
                  <div className="text-xs text-[#687572]">Impacto actual</div>
                  <div className="text-sm font-semibold text-[#263331] mt-0.5 flex items-center justify-between">
                    <span>{mapData.impactLabel}</span>
                    <span className="text-xs font-bold text-[#356B68] bg-[#FAF8F4] px-1.5 py-0.5 rounded border border-[#E4DFD5]">
                      {mapData.impactScore} / 5
                    </span>
                  </div>

                  {/* Impact visual bar */}
                  <div className="w-full h-1.5 bg-[#E4DFD5] rounded-full mt-2 overflow-hidden">
                    <div
                      className="h-full bg-[#C9A66B] rounded-full"
                      style={{ width: `${(mapData.impactScore / 5) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 3: Área que podrías explorar */}
          <section className="bg-[#FAF8F4] border border-[#E4DFD5] rounded-2xl p-5 sm:p-6 shadow-[0_2px_8px_-2px_rgba(38,51,49,0.04)] relative overflow-hidden">
            {/* Subtle left calm accent bar */}
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#356B68]" />

            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#356B68] mb-2.5">
              <Sparkles className="w-3.5 h-3.5 text-[#C9A66B]" />
              <h3>Área que podrías explorar</h3>
            </div>

            <h4 className="text-base sm:text-lg font-bold text-[#263331] mb-2 leading-snug">
              {mapData.exploratoryAreaHeading}
            </h4>

            <p className="text-sm sm:text-base text-[#263331] leading-relaxed font-normal bg-[#F0ECE4]/60 p-4 rounded-xl border border-[#E4DFD5]/70">
              {mapData.exploratoryAreaText}
            </p>
          </section>

          {/* SECTION 4: Lo que puedes llevar a una sesión */}
          <section className="bg-[#FAF8F4] border border-[#E4DFD5] rounded-2xl p-5 sm:p-6 shadow-[0_2px_8px_-2px_rgba(38,51,49,0.04)]">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#356B68] mb-3">
              <Layers className="w-4 h-4 text-[#356B68]" />
              <h3>Lo que puedes llevar a una sesión</h3>
            </div>

            <p className="text-xs sm:text-sm text-[#687572] mb-4">
              Tres puntos ordenados para iniciar la conversación de forma enfocada:
            </p>

            <div className="space-y-3">
              {/* Point 1 */}
              <div className="flex items-start gap-3 p-3.5 bg-[#F0ECE4]/40 rounded-xl border border-[#E4DFD5]/60">
                <span className="w-5 h-5 rounded-full bg-[#356B68] text-[#F8F5EF] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  1
                </span>
                <p className="text-xs sm:text-sm text-[#263331] leading-relaxed">
                  {mapData.sessionPoints.situation}
                </p>
              </div>

              {/* Point 2 */}
              <div className="flex items-start gap-3 p-3.5 bg-[#F0ECE4]/40 rounded-xl border border-[#E4DFD5]/60">
                <span className="w-5 h-5 rounded-full bg-[#356B68] text-[#F8F5EF] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  2
                </span>
                <p className="text-xs sm:text-sm text-[#263331] leading-relaxed">
                  {mapData.sessionPoints.contextAndEmotion}
                </p>
              </div>

              {/* Point 3 */}
              <div className="flex items-start gap-3 p-3.5 bg-[#F0ECE4]/40 rounded-xl border border-[#E4DFD5]/60">
                <span className="w-5 h-5 rounded-full bg-[#356B68] text-[#F8F5EF] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  3
                </span>
                <p className="text-xs sm:text-sm text-[#263331] leading-relaxed">
                  {mapData.sessionPoints.desiredGoal}
                </p>
              </div>
            </div>
          </section>

          {/* Small, visually discreet safety notice */}
          <div className="p-4 rounded-xl bg-[#F0ECE4]/70 border border-[#E4DFD5] flex items-start gap-2.5 text-xs text-[#687572] leading-relaxed">
            <Shield className="w-4 h-4 text-[#C9A66B] shrink-0 mt-0.5" />
            <p>
              Este resultado es orientativo y se basa en las respuestas que proporcionaste. No constituye un diagnóstico médico ni determina la causa de una enfermedad. Si tienes un problema de salud, consulta también con un profesional sanitario.
            </p>
          </div>

          {/* Main Prominent Call To Action & Navigation Controls */}
          <div className="pt-3 space-y-3">
            <button
              type="button"
              onClick={onContinueToContact}
              className="w-full min-h-[56px] bg-[#356B68] hover:bg-[#285451] active:scale-[0.985] text-[#F8F5EF] font-semibold text-base sm:text-lg rounded-xl px-6 py-4 shadow-[0_6px_20px_rgba(53,107,104,0.22)] transition-all duration-150 flex items-center justify-center gap-2.5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#356B68] focus:ring-offset-2"
            >
              <span>Quiero profundizar con el profesional</span>
              <ArrowRight className="w-5 h-5 text-[#C9A66B]" />
            </button>

            {/* Resaltado de confidencialidad debajo de la llamada a la acción */}
            <ConfidentialityBadge />

            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-1 border-t border-[#E4DFD5]/60">
              <button
                type="button"
                onClick={onEditAnswers}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-[#687572] hover:text-[#263331] py-1.5 px-2 rounded-lg transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Modificar respuestas de la evaluación</span>
              </button>

              <button
                type="button"
                onClick={() => onNavigate('inicio')}
                className="text-xs font-medium text-[#687572] hover:text-[#263331] py-1.5 px-2 rounded-lg transition-colors cursor-pointer"
              >
                <span>Volver a la portada de Inicio</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Gentle Footer */}
      <footer className="w-full max-w-xl mx-auto py-3 text-center text-xs text-[#687572]">
        <p>Mapa Emocional · Orientación y orden personal</p>
      </footer>
    </div>
  );
};
