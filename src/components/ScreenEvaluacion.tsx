import React, { useState } from 'react';
import { AppHeader } from './AppHeader';
import { ConfidentialityBadge } from './ConfidentialityBadge';
import { EvaluationData, ScreenId } from '../types';
import { ArrowLeft, ArrowRight, Check, Sparkles } from 'lucide-react';

interface ScreenEvaluacionProps {
  initialData?: EvaluationData;
  onComplete: (data: EvaluationData) => void;
  onBackToStart: () => void;
  onNavigate: (screen: ScreenId) => void;
  maxUnlockedScreen: ScreenId;
  hasCompletedEvaluation: boolean;
}

export const ScreenEvaluacion: React.FC<ScreenEvaluacionProps> = ({
  initialData,
  onComplete,
  onBackToStart,
  onNavigate,
  maxUnlockedScreen,
  hasCompletedEvaluation,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const totalSteps = 7;

  const canGoToMap = maxUnlockedScreen === 'mapa' || maxUnlockedScreen === 'contacto' || hasCompletedEvaluation;
  const canGoToContact = maxUnlockedScreen === 'contacto';

  const [formData, setFormData] = useState<EvaluationData>(
    initialData || {
      explorationType: 'Un síntoma o malestar',
      situationDetail: '',
      duration: 'Hace meses',
      impactLevel: 3,
      contextEvent: 'Cambio importante',
      contextCustomNote: '',
      primaryEmotion: 'Inquietud o preocupación',
      emotionCustomNote: '',
      desiredOutcome: 'Comprender mejor lo que estoy viviendo',
    }
  );

  const [fieldError, setFieldError] = useState<string | null>(null);

  // Question 1 Options
  const q1Options = [
    'Un síntoma o malestar',
    'Un diagnóstico que ya tengo',
    'Una situación emocional',
    'Una relación',
    'Un conflicto personal',
    'Otro',
  ];

  // Question 3 Options
  const q3Options = [
    'Hace pocos días',
    'Hace semanas',
    'Hace meses',
    'Hace años',
    'Aparece por períodos',
  ];

  // Question 4 Scale Definitions (1 to 5)
  const q4Scale = [
    { value: 1, label: 'Leve o puntual', sub: 'Apenas interfiere en mi día' },
    { value: 2, label: 'Moderado bajo', sub: 'Presente pero manejable' },
    { value: 3, label: 'Notable en el día a día', sub: 'Ocupa mi atención constante' },
    { value: 4, label: 'Significativo y desgastante', sub: 'Afecta mi descanso y ánimo' },
    { value: 5, label: 'Muy limitante', sub: 'Condiciona mis actividades habituales' },
  ];

  // Question 5 Options
  const q5Options = [
    'Cambio importante',
    'Conflicto familiar',
    'Relación de pareja',
    'Trabajo o dinero',
    'Pérdida o separación',
    'Miedo o incertidumbre',
    'Otro',
    'Prefiero contarlo con mis palabras',
  ];

  // Question 6 Options
  const q6Options = [
    'Miedo',
    'Tristeza',
    'Rabia',
    'Culpa',
    'Soledad',
    'Impotencia',
    'Rechazo',
    'Confusión',
    'Otra',
  ];

  // Question 7 Options
  const q7Options = [
    'Comprender mejor lo que estoy viviendo',
    'Encontrar una nueva perspectiva',
    'Identificar qué quiero trabajar',
    'Sentirme más claro/a',
    'Profundizarlo con un profesional',
  ];

  const handleNext = () => {
    setFieldError(null);

    // Validation for question 2 (text field)
    if (currentStep === 2) {
      if (!formData.situationDetail.trim()) {
        setFieldError('Por favor, describe en unas palabras qué te gustaría explorar.');
        return;
      }
    }

    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    } else {
      // Reached the end!
      onComplete(formData);
    }
  };

  const handleBack = () => {
    setFieldError(null);
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    } else {
      onBackToStart();
    }
  };

  const progressPercent = Math.round((currentStep / totalSteps) * 100);

  return (
    <div className="min-h-screen bg-[#F8F5EF] flex flex-col justify-between py-5 px-4 sm:px-6 md:px-8">
      {/* Título y subtítulo arriba y debajo el menú */}
      <AppHeader
        currentScreen="evaluacion"
        onNavigate={onNavigate}
        maxUnlockedScreen={maxUnlockedScreen}
        hasCompletedEvaluation={hasCompletedEvaluation}
      />

      {/* Controles de avance de preguntas y barra de progreso */}
      <div className="w-full max-w-xl mx-auto pt-1 pb-2">
        <div className="flex items-center justify-between mb-2">
          <button
            type="button"
            onClick={handleBack}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-[#687572] hover:text-[#263331] p-1 rounded-lg transition-colors cursor-pointer"
            aria-label="Paso anterior"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{currentStep === 1 ? 'Volver a Inicio' : 'Pregunta anterior'}</span>
          </button>

          {canGoToMap && (
            <button
              type="button"
              onClick={() => onNavigate('mapa')}
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#356B68] hover:text-[#285451] bg-[#FAF8F4] border border-[#356B68]/30 px-2.5 py-1 rounded-md transition-colors cursor-pointer"
            >
              <span>Ir al Mapa</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#C9A66B]" />
            </button>
          )}
        </div>

        {/* Thin progress bar underneath */}
        <div className="w-full">
          <div className="flex items-center justify-between text-[11px] font-medium text-[#687572] mb-1.5">
            <span>Evaluación · Pregunta {currentStep} de {totalSteps}</span>
            <span className="text-[#356B68] font-semibold">{progressPercent}%</span>
          </div>
          <div
            className="w-full h-1.5 bg-[#E4DFD5] rounded-full overflow-hidden"
            role="progressbar"
            aria-valuenow={progressPercent}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="h-full bg-[#356B68] transition-all duration-300 ease-out rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Questionnaire Card */}
      <main className="w-full max-w-xl mx-auto my-auto py-4">
        <div className="bg-[#FAF8F4] border border-[#E4DFD5] rounded-2xl p-6 sm:p-8 shadow-[0_2px_10px_-3px_rgba(38,51,49,0.04)]">
          {/* QUESTION 1 */}
          {currentStep === 1 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div>
                <span className="text-xs font-semibold tracking-wider text-[#C9A66B] uppercase mb-1 block">
                  Paso 1
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-[#263331] leading-snug">
                  ¿Qué quieres explorar principalmente?
                </h2>
                <p className="text-xs sm:text-sm text-[#687572] mt-1.5">
                  Elige la categoría que mejor describa el motivo de tu consulta o interés.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-2.5 pt-1">
                {q1Options.map((opt) => {
                  const isSelected = formData.explorationType === opt;
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setFormData({ ...formData, explorationType: opt })}
                      className={`w-full min-h-[52px] text-left px-4 py-3 rounded-xl border transition-all duration-150 flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? 'bg-[#F0ECE4] border-[#356B68] ring-1 ring-[#356B68] text-[#263331]'
                          : 'bg-[#FAF8F4] border-[#E4DFD5] text-[#263331] hover:bg-[#F0ECE4]/60'
                      }`}
                    >
                      <span className="text-sm sm:text-base font-medium">{opt}</span>
                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                          isSelected
                            ? 'border-[#356B68] bg-[#356B68] text-[#F8F5EF]'
                            : 'border-[#687572]/40 bg-transparent'
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* QUESTION 2 */}
          {currentStep === 2 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div>
                <span className="text-xs font-semibold tracking-wider text-[#C9A66B] uppercase mb-1 block">
                  Paso 2
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-[#263331] leading-snug">
                  ¿Qué situación, síntoma o diagnóstico quieres explorar?
                </h2>
                <p className="text-xs sm:text-sm text-[#687572] mt-1.5">
                  Escríbelo con tus propias palabras, de forma sencilla y directa.
                </p>
              </div>

              <div className="space-y-2 pt-1">
                <label htmlFor="situationDetail" className="block text-xs font-semibold text-[#263331]">
                  Describe brevemente tu motivo de exploración
                </label>
                <textarea
                  id="situationDetail"
                  rows={4}
                  value={formData.situationDetail}
                  onChange={(e) => {
                    setFormData({ ...formData, situationDetail: e.target.value });
                    if (fieldError) setFieldError(null);
                  }}
                  placeholder="Ej. Tensión en la espalda alta desde hace semanas, dificultad recurrente para expresar lo que siento, angustia al tomar decisiones en el trabajo..."
                  className="w-full p-4 rounded-xl border border-[#E4DFD5] bg-[#F8F5EF] text-[#263331] text-sm sm:text-base leading-relaxed placeholder:text-[#687572]/70 focus:outline-none focus:border-[#356B68] focus:ring-1 focus:ring-[#356B68] transition-all resize-none"
                />
                <p className="text-[11px] text-[#687572]">
                  No es necesario usar términos técnicos ni médicos. Expresa cómo lo sientes tú.
                </p>
                {fieldError && (
                  <p className="text-xs text-[#b91c1c] font-medium pt-1">{fieldError}</p>
                )}
              </div>
            </div>
          )}

          {/* QUESTION 3 */}
          {currentStep === 3 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div>
                <span className="text-xs font-semibold tracking-wider text-[#C9A66B] uppercase mb-1 block">
                  Paso 3
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-[#263331] leading-snug">
                  ¿Desde cuándo lo estás viviendo?
                </h2>
                <p className="text-xs sm:text-sm text-[#687572] mt-1.5">
                  El tiempo de evolución nos ayuda a contextualizar su desarrollo.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-2.5 pt-1">
                {q3Options.map((opt) => {
                  const isSelected = formData.duration === opt;
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setFormData({ ...formData, duration: opt })}
                      className={`w-full min-h-[52px] text-left px-4 py-3 rounded-xl border transition-all duration-150 flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? 'bg-[#F0ECE4] border-[#356B68] ring-1 ring-[#356B68] text-[#263331]'
                          : 'bg-[#FAF8F4] border-[#E4DFD5] text-[#263331] hover:bg-[#F0ECE4]/60'
                      }`}
                    >
                      <span className="text-sm sm:text-base font-medium">{opt}</span>
                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                          isSelected
                            ? 'border-[#356B68] bg-[#356B68] text-[#F8F5EF]'
                            : 'border-[#687572]/40 bg-transparent'
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* QUESTION 4 */}
          {currentStep === 4 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div>
                <span className="text-xs font-semibold tracking-wider text-[#C9A66B] uppercase mb-1 block">
                  Paso 4
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-[#263331] leading-snug">
                  ¿Cuánto impacto tiene actualmente en tu vida?
                </h2>
                <p className="text-xs sm:text-sm text-[#687572] mt-1.5">
                  Evalúa cómo repercute en tu energía, bienestar o tranquilidad diaria.
                </p>
              </div>

              <div className="space-y-2.5 pt-1">
                {q4Scale.map((item) => {
                  const isSelected = formData.impactLevel === item.value;
                  return (
                    <button
                      key={item.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, impactLevel: item.value })}
                      className={`w-full min-h-[56px] text-left px-4 py-3 rounded-xl border transition-all duration-150 flex items-center gap-3.5 cursor-pointer ${
                        isSelected
                          ? 'bg-[#F0ECE4] border-[#356B68] ring-1 ring-[#356B68]'
                          : 'bg-[#FAF8F4] border-[#E4DFD5] hover:bg-[#F0ECE4]/60'
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm shrink-0 ${
                          isSelected
                            ? 'bg-[#356B68] text-[#F8F5EF]'
                            : 'bg-[#E4DFD5]/60 text-[#687572]'
                        }`}
                      >
                        {item.value}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="text-sm sm:text-base font-semibold text-[#263331]">
                          {item.label}
                        </div>
                        <div className="text-xs text-[#687572] truncate">{item.sub}</div>
                      </div>

                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                          isSelected
                            ? 'border-[#356B68] bg-[#356B68] text-[#F8F5EF]'
                            : 'border-[#687572]/40 bg-transparent'
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* QUESTION 5 */}
          {currentStep === 5 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div>
                <span className="text-xs font-semibold tracking-wider text-[#C9A66B] uppercase mb-1 block">
                  Paso 5
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-[#263331] leading-snug">
                  Cuando comenzó o se intensificó, ¿qué estaba ocurriendo en tu vida?
                </h2>
                <p className="text-xs sm:text-sm text-[#687572] mt-1.5">
                  En Biodescodificación observamos el contexto vital que rodeó el inicio del proceso.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                {q5Options.map((opt) => {
                  const isSelected = formData.contextEvent === opt;
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setFormData({ ...formData, contextEvent: opt })}
                      className={`min-h-[50px] text-left px-3.5 py-2.5 rounded-xl border transition-all duration-150 flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? 'bg-[#F0ECE4] border-[#356B68] ring-1 ring-[#356B68] text-[#263331]'
                          : 'bg-[#FAF8F4] border-[#E4DFD5] text-[#263331] hover:bg-[#F0ECE4]/60'
                      }`}
                    >
                      <span className="text-xs sm:text-sm font-medium">{opt}</span>
                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ml-2 ${
                          isSelected
                            ? 'border-[#356B68] bg-[#356B68] text-[#F8F5EF]'
                            : 'border-[#687572]/40 bg-transparent'
                        }`}
                      >
                        {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                      </div>
                    </button>
                  );
                })}
              </div>

              {(formData.contextEvent === 'Prefiero contarlo con mis palabras' ||
                formData.contextEvent === 'Otro') && (
                <div className="pt-2 animate-in fade-in duration-150">
                  <label htmlFor="contextCustomNote" className="block text-xs font-semibold text-[#263331] mb-1">
                    Describe ese momento vital (opcional):
                  </label>
                  <input
                    id="contextCustomNote"
                    type="text"
                    value={formData.contextCustomNote || ''}
                    onChange={(e) => setFormData({ ...formData, contextCustomNote: e.target.value })}
                    placeholder="Ej. Estaba atravesando una mudanza de ciudad y cambio de empleo..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E4DFD5] bg-[#F8F5EF] text-xs sm:text-sm text-[#263331] focus:outline-none focus:border-[#356B68]"
                  />
                </div>
              )}
            </div>
          )}

          {/* QUESTION 6 */}
          {currentStep === 6 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div>
                <span className="text-xs font-semibold tracking-wider text-[#C9A66B] uppercase mb-1 block">
                  Paso 6
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-[#263331] leading-snug">
                  ¿Qué emoción aparece con más frecuencia cuando piensas en esto?
                </h2>
                <p className="text-xs sm:text-sm text-[#687572] mt-1.5">
                  Identificar la emoción sentida es uno de los puentes principales de comprensión.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1">
                {q6Options.map((opt) => {
                  const isSelected = formData.primaryEmotion === opt;
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setFormData({ ...formData, primaryEmotion: opt })}
                      className={`min-h-[50px] text-center px-3 py-3 rounded-xl border transition-all duration-150 flex flex-col items-center justify-center cursor-pointer ${
                        isSelected
                          ? 'bg-[#F0ECE4] border-[#356B68] ring-1 ring-[#356B68] text-[#356B68] font-semibold'
                          : 'bg-[#FAF8F4] border-[#E4DFD5] text-[#263331] hover:bg-[#F0ECE4]/60 font-medium'
                      }`}
                    >
                      <span className="text-sm">{opt}</span>
                    </button>
                  );
                })}
              </div>

              {formData.primaryEmotion === 'Otra' && (
                <div className="pt-2 animate-in fade-in duration-150">
                  <label htmlFor="emotionCustomNote" className="block text-xs font-semibold text-[#263331] mb-1">
                    Indica qué emoción o sensación sientes:
                  </label>
                  <input
                    id="emotionCustomNote"
                    type="text"
                    value={formData.emotionCustomNote || ''}
                    onChange={(e) => setFormData({ ...formData, emotionCustomNote: e.target.value })}
                    placeholder="Ej. Inquietud difusa, nostalgia, sensación de ahogo..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E4DFD5] bg-[#F8F5EF] text-xs sm:text-sm text-[#263331] focus:outline-none focus:border-[#356B68]"
                  />
                </div>
              )}
            </div>
          )}

          {/* QUESTION 7 (FINAL QUESTION) */}
          {currentStep === 7 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div>
                <span className="text-xs font-semibold tracking-wider text-[#C9A66B] uppercase mb-1 block">
                  Paso 7 · Final
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-[#263331] leading-snug">
                  ¿Qué te gustaría conseguir al trabajar esta situación?
                </h2>
                <p className="text-xs sm:text-sm text-[#687572] mt-1.5">
                  Definir tu intención marca la dirección del mapa y de tu posible sesión.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-2.5 pt-1">
                {q7Options.map((opt) => {
                  const isSelected = formData.desiredOutcome === opt;
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setFormData({ ...formData, desiredOutcome: opt })}
                      className={`w-full min-h-[52px] text-left px-4 py-3 rounded-xl border transition-all duration-150 flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? 'bg-[#F0ECE4] border-[#356B68] ring-1 ring-[#356B68] text-[#263331]'
                          : 'bg-[#FAF8F4] border-[#E4DFD5] text-[#263331] hover:bg-[#F0ECE4]/60'
                      }`}
                    >
                      <span className="text-sm sm:text-base font-medium">{opt}</span>
                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                          isSelected
                            ? 'border-[#356B68] bg-[#356B68] text-[#F8F5EF]'
                            : 'border-[#687572]/40 bg-transparent'
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Primary Navigation Action Button at Bottom */}
          <div className="pt-6 mt-6 border-t border-[#E4DFD5]/70 flex flex-col sm:flex-row items-center gap-3">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={handleBack}
                className="w-full sm:w-auto px-5 min-h-[50px] rounded-xl border border-[#E4DFD5] bg-[#F0ECE4] hover:bg-[#E8E3D9] text-[#263331] text-sm font-semibold transition-colors cursor-pointer"
              >
                Anterior
              </button>
            )}

            <button
              type="button"
              onClick={handleNext}
              className="w-full flex-1 min-h-[52px] bg-[#356B68] hover:bg-[#285451] active:scale-[0.985] text-[#F8F5EF] font-semibold text-base rounded-xl px-6 py-3 shadow-[0_4px_14px_rgba(53,107,104,0.18)] transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#356B68] focus:ring-offset-2"
            >
              {currentStep === totalSteps ? (
                <>
                  <span>Ver mi mapa inicial</span>
                  <Sparkles className="w-4 h-4 text-[#C9A66B]" />
                </>
              ) : (
                <>
                  <span>Continuar</span>
                  <ArrowRight className="w-4 h-4 text-[#C9A66B]" />
                </>
              )}
            </button>
          </div>

          {/* Resaltado de confidencialidad debajo de la llamada a la acción */}
          <div className="pt-3">
            <ConfidentialityBadge />
          </div>
        </div>
      </main>

      {/* Gentle helper note */}
      <footer className="w-full max-w-xl mx-auto py-2 text-center text-xs text-[#687572]">
        <span>Respuestas protegidas y de uso confidencial para tu mapa.</span>
      </footer>
    </div>
  );
};
