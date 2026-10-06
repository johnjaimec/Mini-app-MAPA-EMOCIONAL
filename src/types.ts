export type ScreenId = 'inicio' | 'evaluacion' | 'mapa' | 'contacto';

export interface EvaluationData {
  // Question 1: ¿Qué quieres explorar principalmente?
  explorationType: string;
  // Question 2: ¿Qué situación, síntoma o diagnóstico quieres explorar?
  situationDetail: string;
  // Question 3: ¿Desde cuándo lo estás viviendo?
  duration: string;
  // Question 4: ¿Cuánto impacto tiene actualmente en tu vida? (1 to 5)
  impactLevel: number;
  // Question 5: Cuando comenzó o se intensificó, ¿qué estaba ocurriendo en tu vida?
  contextEvent: string;
  contextCustomNote?: string;
  // Question 6: ¿Qué emoción aparece con más frecuencia cuando piensas en esto?
  primaryEmotion: string;
  emotionCustomNote?: string;
  // Question 7: ¿Qué te gustaría conseguir al trabajar esta situación?
  desiredOutcome: string;
}

export interface ContactData {
  name: string;
  phone: string;
  email?: string;
  consentAccepted: boolean;
}
