'use client';

import React, { useState, useRef } from 'react';
import { Mic, MicOff, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

export type MicState = 'idle' | 'listening' | 'processing' | 'error' | 'completed';

interface VoiceMicButtonProps {
  language?: 'en-US' | 'bn-BD';
  onTranscript: (text: string) => void;
  className?: string;
}

export function VoiceMicButton({
  language = 'en-US',
  onTranscript,
  className = '',
}: VoiceMicButtonProps) {
  const [micState, setMicState] = useState<MicState>('idle');
  const [statusMessage, setStatusMessage] = useState<string>('');
  const recognitionRef = useRef<any>(null);

  const handleToggleVoice = () => {
    if (micState === 'listening' && recognitionRef.current) {
      recognitionRef.current.stop();
      return;
    }

    const SpeechRecognitionAPI =
      typeof window !== 'undefined'
        ? (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
        : null;

    if (!SpeechRecognitionAPI) {
      setMicState('error');
      setStatusMessage('Voice input is not supported in this browser. Please type your query.');
      setTimeout(() => setMicState('idle'), 3500);
      return;
    }

    try {
      const recognition = new SpeechRecognitionAPI();
      recognition.lang = language;
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setMicState('listening');
        setStatusMessage(language === 'bn-BD' ? 'শোনা হচ্ছে...' : 'Listening...');
      };

      recognition.onresult = (event: any) => {
        setMicState('processing');
        const transcript = event.results?.[0]?.[0]?.transcript || '';
        if (transcript) {
          onTranscript(transcript);
          setMicState('completed');
          setStatusMessage(`"${transcript}"`);
          setTimeout(() => setMicState('idle'), 2500);
        } else {
          setMicState('error');
          setStatusMessage('Could not recognize speech.');
          setTimeout(() => setMicState('idle'), 2500);
        }
      };

      recognition.onerror = () => {
        setMicState('error');
        setStatusMessage('Microphone permission denied or speech not detected.');
        setTimeout(() => setMicState('idle'), 3000);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch {
      setMicState('error');
      setTimeout(() => setMicState('idle'), 3000);
    }
  };

  return (
    <div className="relative inline-flex items-center">
      <button
        type="button"
        onClick={handleToggleVoice}
        title={`Voice search (${language}) — State: ${micState}`}
        aria-label="Voice command search"
        className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium transition ${
          micState === 'listening'
            ? 'bg-rose-600 text-white animate-pulse'
            : micState === 'processing'
            ? 'bg-amber-500 text-white'
            : micState === 'completed'
            ? 'bg-emerald-600 text-white'
            : micState === 'error'
            ? 'bg-red-100 text-red-700'
            : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100 dark:bg-slate-800 dark:text-indigo-300'
        } ${className}`}
      >
        {micState === 'listening' && <Mic className="h-4 w-4" />}
        {micState === 'processing' && <Loader2 className="h-4 w-4 animate-spin" />}
        {micState === 'completed' && <CheckCircle2 className="h-4 w-4" />}
        {micState === 'error' && <MicOff className="h-4 w-4" />}
        {micState === 'idle' && <Mic className="h-4 w-4" />}
        <span className="hidden sm:inline capitalize">{micState === 'idle' ? 'Voice' : micState}</span>
      </button>
      {statusMessage && micState !== 'idle' && (
        <span className="ml-2 text-xs text-slate-600 dark:text-slate-300 max-w-[180px] truncate">
          {statusMessage}
        </span>
      )}
    </div>
  );
}
