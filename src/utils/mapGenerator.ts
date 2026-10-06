import { EvaluationData } from '../types';

export interface GeneratedMap {
  situationTitle: string;
  explorationTypeLabel: string;
  durationLabel: string;
  impactLabel: string;
  impactScore: number;
  exploratoryAreaHeading: string;
  exploratoryAreaText: string;
  sessionPoints: {
    situation: string;
    contextAndEmotion: string;
    desiredGoal: string;
  };
}

const impactDescriptions: Record<number, string> = {
  1: 'Leve o puntual',
  2: 'Moderado bajo',
  3: 'Notable en el día a día',
  4: 'Significativo y desgastante',
  5: 'Muy limitante en la rutina',
};

export function generateEmotionalMap(data: EvaluationData): GeneratedMap {
  const situationTitle =
    data.situationDetail.trim() ||
    (data.explorationType ? `Exploración sobre: ${data.explorationType}` : 'Situación personal');

  const durationLabel = data.duration || 'Tiempo indeterminado';
  const impactLabel = impactDescriptions[data.impactLevel] || 'Nivel de impacto personal';

  // Context text
  const contextClean =
    data.contextEvent === 'Prefiero contarlo con mis palabras' && data.contextCustomNote
      ? data.contextCustomNote
      : data.contextEvent || 'un momento de cambio en tu vida';

  const emotionClean = data.primaryEmotion || 'inquietud';

  // Area of exploration derived respectfully from context and emotion
  let reflectionFocus = '';
  switch (data.contextEvent) {
    case 'Conflicto familiar':
      reflectionFocus = `el modo en que los vínculos y dinámicas familiares pueden estar vinculados con la vivencia de ${emotionClean.toLowerCase()}`;
      break;
    case 'Relación de pareja':
      reflectionFocus = `cómo los acuerdos, la cercanía o la distancia afectiva en la pareja resuenan con la sensación de ${emotionClean.toLowerCase()}`;
      break;
    case 'Trabajo o dinero':
      reflectionFocus = `la relación entre las exigencias, la seguridad material y la experiencia recurrente de ${emotionClean.toLowerCase()}`;
      break;
    case 'Pérdida o separación':
      reflectionFocus = `el proceso de duelo, desapego o cierre no completado en torno a esa vivencia y la emoción de ${emotionClean.toLowerCase()}`;
      break;
    case 'Miedo o incertidumbre':
      reflectionFocus = `la necesidad de certeza o control y cómo el cuerpo o el ánimo reaccionan ante situaciones no resueltas`;
      break;
    case 'Cambio importante':
      reflectionFocus = `la adaptación a nuevas etapas de vida y cómo asimilar transiciones significativas sin sobrecarga`;
      break;
    default:
      reflectionFocus = `el momento vital en que se inició esta experiencia y el modo en que la emoción de ${emotionClean.toLowerCase()} acompaña tu día a día`;
      break;
  }

  const exploratoryAreaHeading = 'La relación entre el momento vital y la respuesta emocional';
  const exploratoryAreaText = `Desde el enfoque de Biodescodificación, este puede ser un punto interesante para profundizar en una sesión: observar ${reflectionFocus}. Al poner luz sobre lo que ocurrió en ese momento, es posible comprender qué sentido de adaptación o alerta guardó esta experiencia.`;

  // 3 Points to take to a session:
  // Point 1: The main situation the user wants to work on
  const point1 = `Situación central: "${situationTitle}", que vienes experimentando desde ${durationLabel.toLowerCase()}.`;

  // Point 2: The context or emotion they identified
  const point2 = `Contexto y emoción clave: Lo asocias con "${contextClean}", donde la emoción más presente ha sido "${emotionClean}".`;

  // Point 3: The result they would like to achieve
  const goalClean = data.desiredOutcome || 'Comprender mejor lo que estoy viviendo';
  const point3 = `Propósito para la sesión: ${goalClean}.`;

  return {
    situationTitle,
    explorationTypeLabel: data.explorationType || 'Consulta personal',
    durationLabel,
    impactLabel,
    impactScore: data.impactLevel,
    exploratoryAreaHeading,
    exploratoryAreaText,
    sessionPoints: {
      situation: point1,
      contextAndEmotion: point2,
      desiredGoal: point3,
    },
  };
}
