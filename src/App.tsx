/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ScreenId, EvaluationData } from './types';
import { ScreenInicio } from './components/ScreenInicio';
import { ScreenEvaluacion } from './components/ScreenEvaluacion';
import { ScreenMapaInicial } from './components/ScreenMapaInicial';
import { ScreenContacto } from './components/ScreenContacto';

const SCREEN_ORDER: ScreenId[] = ['inicio', 'evaluacion', 'mapa', 'contacto'];

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('inicio');
  const [maxUnlockedScreen, setMaxUnlockedScreen] = useState<ScreenId>('inicio');
  const [hasCompletedEvaluation, setHasCompletedEvaluation] = useState<boolean>(false);

  // Evaluation state
  const [evaluationData, setEvaluationData] = useState<EvaluationData>({
    explorationType: 'Un síntoma o malestar',
    situationDetail: 'Tensión en cuello y espalda recurrente al finalizar la jornada',
    duration: 'Hace meses',
    impactLevel: 3,
    contextEvent: 'Trabajo o dinero',
    contextCustomNote: '',
    primaryEmotion: 'Impotencia',
    emotionCustomNote: '',
    desiredOutcome: 'Comprender mejor lo que estoy viviendo',
  });

  // Unlock screens progressively
  const updateMaxUnlocked = (targetScreen: ScreenId) => {
    setMaxUnlockedScreen((prev) => {
      const prevIdx = SCREEN_ORDER.indexOf(prev);
      const targetIdx = SCREEN_ORDER.indexOf(targetScreen);
      return targetIdx > prevIdx ? targetScreen : prev;
    });
  };

  // Safe navigation function with browser history support
  const navigateTo = (screen: ScreenId, replace: boolean = false) => {
    updateMaxUnlocked(screen);
    setCurrentScreen(screen);

    // Sync window history
    if (typeof window !== 'undefined') {
      if (replace) {
        window.history.replaceState({ screen }, '', `#${screen}`);
      } else {
        window.history.pushState({ screen }, '', `#${screen}`);
      }
    }
  };

  // Sync with browser Back/Forward buttons and initial hash
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (event.state && event.state.screen && SCREEN_ORDER.includes(event.state.screen)) {
        setCurrentScreen(event.state.screen);
      } else {
        const hash = window.location.hash.replace('#', '') as ScreenId;
        if (SCREEN_ORDER.includes(hash)) {
          setCurrentScreen(hash);
        } else {
          setCurrentScreen('inicio');
        }
      }
    };

    // Initialize state with current hash or default
    const initialHash = window.location.hash.replace('#', '') as ScreenId;
    if (SCREEN_ORDER.includes(initialHash)) {
      setCurrentScreen(initialHash);
      updateMaxUnlocked(initialHash);
      window.history.replaceState({ screen: initialHash }, '', `#${initialHash}`);
    } else {
      window.history.replaceState({ screen: 'inicio' }, '', '#inicio');
    }

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return (
    <div className="min-h-screen bg-[#F8F5EF] text-[#263331] font-sans antialiased selection:bg-[#356B68]/15 selection:text-[#263331]">
      {/* SCREEN 1 — INICIO */}
      {currentScreen === 'inicio' && (
        <ScreenInicio
          onStart={() => navigateTo('evaluacion')}
          onNavigate={(s) => navigateTo(s)}
          maxUnlockedScreen={maxUnlockedScreen}
          hasCompletedEvaluation={hasCompletedEvaluation}
        />
      )}

      {/* SCREEN 2 — EVALUACIÓN */}
      {currentScreen === 'evaluacion' && (
        <ScreenEvaluacion
          initialData={evaluationData}
          onComplete={(completedData) => {
            setEvaluationData(completedData);
            setHasCompletedEvaluation(true);
            updateMaxUnlocked('mapa');
            navigateTo('mapa');
          }}
          onBackToStart={() => navigateTo('inicio')}
          onNavigate={(s) => navigateTo(s)}
          maxUnlockedScreen={maxUnlockedScreen}
          hasCompletedEvaluation={hasCompletedEvaluation}
        />
      )}

      {/* SCREEN 3 — TU MAPA INICIAL */}
      {currentScreen === 'mapa' && (
        <ScreenMapaInicial
          evaluationData={evaluationData}
          onContinueToContact={() => {
            updateMaxUnlocked('contacto');
            navigateTo('contacto');
          }}
          onEditAnswers={() => navigateTo('evaluacion')}
          onNavigate={(s) => navigateTo(s)}
          maxUnlockedScreen={maxUnlockedScreen}
        />
      )}

      {/* SCREEN 4 — CONTACTO / SIGUIENTE PASO */}
      {currentScreen === 'contacto' && (
        <ScreenContacto
          evaluationData={evaluationData}
          onBackToMap={() => navigateTo('mapa')}
          onNavigate={(s) => navigateTo(s)}
          maxUnlockedScreen={maxUnlockedScreen}
        />
      )}
    </div>
  );
}
