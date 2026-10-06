import React, { useState } from 'react';
import { AppHeader } from './AppHeader';
import { ConfidentialityBadge } from './ConfidentialityBadge';
import { EvaluationData, ContactData, ScreenId } from '../types';
import { generateEmotionalMap } from '../utils/mapGenerator';
import {
  ArrowLeft,
  CheckCircle2,
  MessageCircle,
  Copy,
  Check,
  Lock,
  ExternalLink,
} from 'lucide-react';

interface ScreenContactoProps {
  evaluationData: EvaluationData;
  onBackToMap: () => void;
  onNavigate: (screen: ScreenId) => void;
  maxUnlockedScreen: ScreenId;
}

export const ScreenContacto: React.FC<ScreenContactoProps> = ({
  evaluationData,
  onBackToMap,
  onNavigate,
  maxUnlockedScreen,
}) => {
  const [formData, setFormData] = useState<ContactData>({
    name: '',
    phone: '',
    email: '',
    consentAccepted: false,
  });

  // Professional's WhatsApp number (configured to +57 3108168751)
  const [professionalPhone, setProfessionalPhone] = useState<string>('+57 3108168751');
  const [isEditingPhone, setIsEditingPhone] = useState<boolean>(false);
  const [tempPhone, setTempPhone] = useState<string>('+57 3108168751');

  const [errors, setErrors] = useState<{
    name?: string;
    phone?: string;
    consent?: string;
  }>({});

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [copiedSummary, setCopiedSummary] = useState<boolean>(false);

  const mapData = generateEmotionalMap(evaluationData);

  // Clean phone number for WhatsApp api (only digits)
  const getCleanPhone = (phoneStr: string) => {
    return phoneStr.replace(/[^0-9]/g, '');
  };

  // Generate the rich, professional WhatsApp message
  const buildWhatsAppMessage = () => {
    const userName = formData.name.trim() || 'Un consultante';
    const userPhone = formData.phone.trim() || 'No especificado';
    const userEmail = formData.email?.trim() ? `\n- Email: ${formData.email.trim()}` : '';

    return `Hola, he completado mi evaluación en Mapa Emocional y me gustaría profundizar en lo que apareció en mi mapa en una sesión.

*Mis datos de contacto:*
- Nombre: ${userName}
- Mi WhatsApp: ${userPhone}${userEmail}

*Resumen de mi Mapa Inicial:*
- Lo que quiero explorar: "${mapData.situationTitle}"
- Tiempo vivido: ${mapData.durationLabel} (Impacto: ${mapData.impactScore}/5)
- Contexto y emoción clave: ${mapData.sessionPoints.contextAndEmotion}
- Objetivo para la sesión: ${mapData.sessionPoints.desiredGoal}

¿Podríamos coordinar fecha y hora para una sesión? Muchas gracias.`;
  };

  const cleanProPhone = getCleanPhone(professionalPhone) || '573108168751';
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${cleanProPhone}&text=${encodeURIComponent(
    buildWhatsAppMessage()
  )}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: typeof errors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Por favor, introduce tu nombre.';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Por favor, proporciona tu número de teléfono.';
    } else if (formData.phone.trim().length < 6) {
      newErrors.phone = 'Introduce un número de teléfono válido.';
    }

    if (!formData.consentAccepted) {
      newErrors.consent = 'Es necesario aceptar el consentimiento para contactar al profesional.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitted(true);

    // DIRECT REDIRECTION TO PROFESSIONAL'S WHATSAPP
    const targetUrl = `https://api.whatsapp.com/send?phone=${cleanProPhone}&text=${encodeURIComponent(
      buildWhatsAppMessage()
    )}`;

    // Open WhatsApp in a new tab/app immediately
    const win = window.open(targetUrl, '_blank', 'noopener,noreferrer');
    if (!win || win.closed || typeof win.closed === 'undefined') {
      // If browser blocked popup, fallback to location href or show immediate click button
      window.location.href = targetUrl;
    }
  };

  const handleCopySummary = async () => {
    const text = buildWhatsAppMessage();
    try {
      await navigator.clipboard.writeText(text);
      setCopiedSummary(true);
      setTimeout(() => setCopiedSummary(false), 2500);
    } catch {
      setCopiedSummary(true);
      setTimeout(() => setCopiedSummary(false), 2500);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F5EF] flex flex-col justify-between py-5 px-4 sm:px-6 md:px-8">
      {/* Título y subtítulo arriba y debajo el menú */}
      <AppHeader
        currentScreen="contacto"
        onNavigate={onNavigate}
        maxUnlockedScreen={maxUnlockedScreen}
        hasCompletedEvaluation={true}
      />

      {/* Controles de navegación contextual */}
      <div className="w-full max-w-xl mx-auto pt-1 pb-2 flex items-center justify-between">
        <button
          type="button"
          onClick={onBackToMap}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-[#687572] hover:text-[#263331] py-1.5 px-2.5 rounded-lg border border-[#E4DFD5] bg-[#FAF8F4] hover:bg-[#F0ECE4] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Volver a Tu Mapa</span>
        </button>

        <button
          type="button"
          onClick={() => onNavigate('inicio')}
          className="text-xs font-medium text-[#687572] hover:text-[#263331] py-1.5 px-2 rounded-lg transition-colors cursor-pointer"
        >
          <span>Ir al Inicio</span>
        </button>
      </div>

      {/* Main Container */}
      <main className="w-full max-w-xl mx-auto my-auto py-2">
        {!isSubmitted ? (
          <div className="bg-[#FAF8F4] border border-[#E4DFD5] rounded-2xl p-6 sm:p-9 shadow-[0_2px_12px_-3px_rgba(38,51,49,0.05)]">
            {/* Top Headings required by prompt */}
            <div className="mb-6">
              <span className="text-xs font-semibold tracking-wider text-[#C9A66B] uppercase mb-1.5 block">
                Paso final · Conexión directa
              </span>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#263331] tracking-tight leading-snug">
                Tu evaluación ya está lista.
              </h1>
              <p className="text-sm sm:text-base text-[#687572] mt-3 leading-relaxed font-normal">
                Si quieres profundizar en lo que apareció en tu mapa, puedes contactar con el profesional y llevar esta información a una sesión.
              </p>
            </div>

            {/* Quick summary recap card */}
            <div className="bg-[#F0ECE4]/60 border border-[#E4DFD5]/80 rounded-xl p-3.5 mb-5 text-xs text-[#687572]">
              <span className="font-semibold text-[#263331] block mb-0.5">
                Resumen que se enviará al WhatsApp del Profesional:
              </span>
              <p className="truncate text-[#356B68] font-medium">
                "{mapData.situationTitle}" · {mapData.durationLabel} (Impacto: {mapData.impactScore}/5)
              </p>
            </div>

            {/* Contact Form */}
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              {/* Tu nombre */}
              <div>
                <label htmlFor="name" className="block text-xs font-semibold text-[#263331] mb-1.5">
                  Tu nombre <span className="text-[#356B68]">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  autoComplete="name"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                    if (errors.name) setErrors({ ...errors, name: undefined });
                  }}
                  placeholder="Ej. Carmen Navarro"
                  className={`w-full min-h-[50px] px-4 rounded-xl border bg-[#F8F5EF] text-sm sm:text-base text-[#263331] focus:outline-none transition-colors ${
                    errors.name
                      ? 'border-[#b91c1c] focus:ring-1 focus:ring-[#b91c1c]'
                      : 'border-[#E4DFD5] focus:border-[#356B68] focus:ring-1 focus:ring-[#356B68]'
                  }`}
                />
                {errors.name && (
                  <p className="text-xs text-[#b91c1c] mt-1 font-medium">{errors.name}</p>
                )}
              </div>

              {/* WhatsApp */}
              <div>
                <label htmlFor="phone" className="block text-xs font-semibold text-[#263331] mb-1.5">
                  Tu WhatsApp <span className="text-[#356B68]">*</span>
                </label>
                <input
                  id="phone"
                  type="tel"
                  autoComplete="tel"
                  value={formData.phone}
                  onChange={(e) => {
                    setFormData({ ...formData, phone: e.target.value });
                    if (errors.phone) setErrors({ ...errors, phone: undefined });
                  }}
                  placeholder="Ej. +34 612 34 56 78"
                  className={`w-full min-h-[50px] px-4 rounded-xl border bg-[#F8F5EF] text-sm sm:text-base text-[#263331] focus:outline-none transition-colors ${
                    errors.phone
                      ? 'border-[#b91c1c] focus:ring-1 focus:ring-[#b91c1c]'
                      : 'border-[#E4DFD5] focus:border-[#356B68] focus:ring-1 focus:ring-[#356B68]'
                  }`}
                />
                <span className="text-[11px] text-[#687572] mt-1 block">
                  Para que el profesional pueda identificarte y responder a tu mensaje.
                </span>
                {errors.phone && (
                  <p className="text-xs text-[#b91c1c] mt-1 font-medium">{errors.phone}</p>
                )}
              </div>

              {/* Email (opcional) */}
              <div>
                <label htmlFor="email" className="block text-xs font-semibold text-[#263331] mb-1.5">
                  Email (opcional)
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="tu@email.com"
                  className="w-full min-h-[50px] px-4 rounded-xl border border-[#E4DFD5] bg-[#F8F5EF] text-sm sm:text-base text-[#263331] focus:outline-none focus:border-[#356B68] focus:ring-1 focus:ring-[#356B68] transition-colors"
                />
              </div>

              {/* Consent Checkbox */}
              <div className="pt-1">
                <label className="flex items-start gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={formData.consentAccepted}
                    onChange={(e) => {
                      setFormData({ ...formData, consentAccepted: e.target.checked });
                      if (errors.consent) setErrors({ ...errors, consent: undefined });
                    }}
                    className="mt-0.5 w-5 h-5 rounded border-[#E4DFD5] text-[#356B68] focus:ring-[#356B68] cursor-pointer accent-[#356B68]"
                  />
                  <span className="text-xs sm:text-sm text-[#263331] leading-relaxed">
                    Acepto que mis datos sean utilizados para contactarme sobre la evaluación y la sesión.
                  </span>
                </label>
                {errors.consent && (
                  <p className="text-xs text-[#b91c1c] mt-1.5 font-medium pl-8">{errors.consent}</p>
                )}
              </div>

              {/* Destination Professional WhatsApp indicator with optional edit */}
              <div className="pt-2">
                <div className="flex items-center justify-between bg-[#F0ECE4]/50 border border-[#E4DFD5] rounded-xl px-3.5 py-2.5 text-xs text-[#687572]">
                  <div className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 text-[#356B68]" />
                    <span>
                      Destino:{' '}
                      <strong className="text-[#263331] font-semibold">
                        WhatsApp Profesional ({professionalPhone})
                      </strong>
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setTempPhone(professionalPhone);
                      setIsEditingPhone(!isEditingPhone);
                    }}
                    className="text-[11px] text-[#356B68] hover:text-[#285451] underline cursor-pointer"
                  >
                    {isEditingPhone ? 'Cancelar' : 'Cambiar'}
                  </button>
                </div>

                {isEditingPhone && (
                  <div className="mt-2 p-3 bg-[#F0ECE4] rounded-xl border border-[#E4DFD5] flex items-center gap-2">
                    <input
                      type="text"
                      value={tempPhone}
                      onChange={(e) => setTempPhone(e.target.value)}
                      placeholder="+57 3108168751"
                      className="flex-1 px-3 py-1.5 text-xs bg-[#FAF8F4] border border-[#E4DFD5] rounded-lg text-[#263331] focus:outline-none focus:border-[#356B68]"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (tempPhone.trim()) {
                          setProfessionalPhone(tempPhone.trim());
                        }
                        setIsEditingPhone(false);
                      }}
                      className="px-3 py-1.5 bg-[#356B68] text-[#F8F5EF] text-xs font-semibold rounded-lg cursor-pointer"
                    >
                      Guardar
                    </button>
                  </div>
                )}
              </div>

              {/* Main Prominent Button: DIRECT CTA TO WHATSAPP */}
              <div className="pt-3 space-y-2.5">
                <button
                  type="submit"
                  className="w-full min-h-[58px] bg-[#356B68] hover:bg-[#285451] active:scale-[0.985] text-[#F8F5EF] font-semibold text-base sm:text-lg rounded-xl px-6 py-4 shadow-[0_6px_20px_rgba(53,107,104,0.22)] transition-all duration-150 flex items-center justify-center gap-2.5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#356B68] focus:ring-offset-2"
                >
                  <MessageCircle className="w-5 h-5 text-[#C9A66B]" />
                  <span>Quiero hablar con el profesional</span>
                  <ExternalLink className="w-4 h-4 text-[#F8F5EF]/80 ml-1" />
                </button>

                {/* Resaltado de confidencialidad debajo de la llamada a la acción */}
                <ConfidentialityBadge />

                <p className="text-center text-[12px] text-[#687572] pt-1">
                  Al pulsar, se abrirá directamente la conversación en WhatsApp con tu resumen preparado.
                </p>
              </div>

              {/* Privacy Note */}
              <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#687572] pt-1">
                <Lock className="w-3.5 h-3.5 text-[#356B68]" />
                <span>Tratamiento estrictamente privado y confidencial</span>
              </div>
            </form>
          </div>
        ) : (
          /* Confirmation & Direct Fallback State */
          <div className="bg-[#FAF8F4] border border-[#E4DFD5] rounded-2xl p-6 sm:p-9 shadow-[0_2px_12px_-3px_rgba(38,51,49,0.05)] text-center animate-in fade-in duration-200">
            <div className="w-14 h-14 rounded-2xl bg-[#356B68]/10 text-[#356B68] flex items-center justify-center mx-auto mb-4 border border-[#356B68]/20">
              <CheckCircle2 className="w-8 h-8 text-[#356B68]" />
            </div>

            <span className="text-xs font-semibold tracking-wider text-[#C9A66B] uppercase mb-1 block">
              Conexión iniciada
            </span>

            <h2 className="text-2xl sm:text-3xl font-bold text-[#263331] leading-snug">
              Abriendo WhatsApp con el profesional
            </h2>

            <p className="text-sm sm:text-base text-[#687572] mt-3 leading-relaxed max-w-md mx-auto">
              Hemos preparado tu mensaje con el resumen de tu evaluación para que el profesional ({professionalPhone}) disponga de toda la información en el chat.
            </p>

            {/* Direct Instant WhatsApp connection button */}
            <div className="mt-7 pt-6 border-t border-[#E4DFD5] space-y-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full min-h-[54px] bg-[#356B68] hover:bg-[#285451] text-[#F8F5EF] font-semibold text-base rounded-xl px-5 py-3.5 flex items-center justify-center gap-2.5 shadow-sm transition-colors"
              >
                <MessageCircle className="w-5 h-5 text-[#C9A66B]" />
                <span>Abrir chat de WhatsApp ahora</span>
                <ExternalLink className="w-4 h-4 text-[#F8F5EF]/80" />
              </a>

              {/* Resaltado de confidencialidad debajo de la llamada a la acción */}
              <ConfidentialityBadge />

              <button
                type="button"
                onClick={handleCopySummary}
                className="w-full min-h-[48px] bg-[#F0ECE4] hover:bg-[#E8E3D9] text-[#263331] font-medium text-xs sm:text-sm rounded-xl px-4 py-3 flex items-center justify-center gap-2 border border-[#E4DFD5] transition-colors cursor-pointer"
              >
                {copiedSummary ? (
                  <>
                    <Check className="w-4 h-4 text-[#356B68]" />
                    <span className="text-[#356B68] font-semibold">¡Mensaje copiado al portapapeles!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-[#687572]" />
                    <span>Copiar texto del mensaje para WhatsApp</span>
                  </>
                )}
              </button>

              <div className="pt-2 flex items-center justify-center gap-4 text-xs font-medium text-[#687572]">
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="hover:text-[#263331] underline underline-offset-4 py-1 cursor-pointer"
                >
                  Editar mis datos
                </button>
                <span>·</span>
                <button
                  type="button"
                  onClick={onBackToMap}
                  className="hover:text-[#263331] underline underline-offset-4 py-1 cursor-pointer"
                >
                  Revisar mi mapa inicial
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Gentle Footer */}
      <footer className="w-full max-w-xl mx-auto py-3 text-center text-xs text-[#687572]">
        <p>Acompañamiento humano desde el enfoque de Biodescodificación.</p>
      </footer>
    </div>
  );
};
