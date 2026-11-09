'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Bot, X, Send, Sparkles, Trash2, ExternalLink, Maximize2, Minimize2, Mic, MicOff, Volume2, Square, AudioLines } from 'lucide-react';
import { AIChatResponsePayload } from '@/types';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  payload?: AIChatResponsePayload;
}
type VoiceLanguage = 'bn-BD' | 'en-US' | 'mixed';
type VoiceGender = 'female' | 'male';

const SUGGESTED_QUESTIONS = [
  'Show me all fourth-year physics subjects.',
  'Find the third chapter of Atomic and Molecular Physics.',
  'I need Quantum Theory video classes.',
  'Show me PDF notes about molecular spectra.',
  'আণবিক পদার্থবিজ্ঞানের নোট দেখাও',
];

export function AcademicAIAssistant() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [voiceLanguage, setVoiceLanguage] = useState<VoiceLanguage>('mixed');
  const [voiceGender, setVoiceGender] = useState<VoiceGender>('female');
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [voiceMode, setVoiceMode] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceStatus, setVoiceStatus] = useState('');
  const recognitionRef = useRef<any>(null);
  const voiceModeRef = useRef(false);
  const isLoadingRef = useRef(false);
  const mountedRef = useRef(true);
  const startListeningRef = useRef<() => void>(() => undefined);
  const audioContextRef = useRef<AudioContext | null>(null);
  const activeSourceRef = useRef<AudioBufferSourceNode | null>(null);
  const speechRequestIdRef = useRef(0);

  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 'welcome', sender: 'assistant', text: 'আসসালামুয়ালাইকুম! আমি Campus Assistant। আমাকে মাসুদ রানা তৈরি করেছেন। বলুন, আপনার কোন অধ্যায়টি প্রয়োজন? আপনি বাংলায়, English অথবা Banglish-এ কথা বলতে পারেন।' },
  ]);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      voiceModeRef.current = false;
      recognitionRef.current?.stop?.();
      speechRequestIdRef.current += 1;
      try { activeSourceRef.current?.stop(); } catch { /* already stopped */ }
      activeSourceRef.current = null;
      void audioContextRef.current?.close().catch(() => undefined);
    };
  }, []);

  const getOrCreateAudioContext = () => {
    if (typeof window === 'undefined') throw new Error('Audio playback is not available in this browser.');
    const AudioContextConstructor = (window as any).AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextConstructor) throw new Error('এই browser-এ audio playback support নেই। Chrome আপডেট করুন।');
    if (!audioContextRef.current || audioContextRef.current.state === 'closed') {
      audioContextRef.current = new AudioContextConstructor() as AudioContext;
    }
    return audioContextRef.current;
  };

  const speak = useCallback((text: string, onDone?: () => void) => {
    const requestId = ++speechRequestIdRef.current;
    try {
      activeSourceRef.current?.stop();
    } catch {
      // The previous source may already have finished.
    }
    activeSourceRef.current = null;

    let audioContext: AudioContext;
    let resumePromise: Promise<void>;
    try {
      audioContext = getOrCreateAudioContext();
      // Resume synchronously from the user's tap to satisfy mobile Chrome autoplay policy.
      resumePromise = audioContext.resume();
    } catch (error) {
      setIsSpeaking(false);
      setVoiceStatus(error instanceof Error ? error.message : 'Audio চালু করা যায়নি।');
      return;
    }

    const scriptHasBangla = /[\\u0980-\\u09FF]/.test(text);
    setVoiceStatus('Google Cloud-এর natural voice তৈরি হচ্ছে...');
    void (async () => {
      try {
        await resumePromise;
        const response = await fetch('/api/tts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            text,
            language: voiceLanguage,
            gender: voiceGender,
          }),
        });

        if (!response.ok) {
          const errorPayload = await response.json().catch(() => null);
          throw new Error(errorPayload?.message || errorPayload?.error || ('TTS request failed (' + response.status + ')'));
        }

        const audioData = await response.arrayBuffer();
        if (!mountedRef.current || requestId !== speechRequestIdRef.current) return;

        const audioBuffer = await audioContext.decodeAudioData(audioData);
        if (!mountedRef.current || requestId !== speechRequestIdRef.current) return;

        const source = audioContext.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(audioContext.destination);
        activeSourceRef.current = source;
        source.onended = () => {
          if (requestId !== speechRequestIdRef.current) return;
          activeSourceRef.current = null;
          if (mountedRef.current) {
            setIsSpeaking(false);
            setVoiceStatus('শুনছি... আপনার কথা বলুন।');
          }
          onDone?.();
        };

        setIsSpeaking(true);
        setVoiceStatus('Campus Assistant কথা বলছে...');
        source.start(0);
      } catch (error) {
        if (!mountedRef.current || requestId !== speechRequestIdRef.current) return;
        setIsSpeaking(false);
        setVoiceStatus('Voice চালানো যায়নি: ' + (error instanceof Error ? error.message : 'Google Cloud TTS error'));
        // A failed greeting must never trigger the microphone.
      }
    })();
  }, [voiceLanguage, voiceGender]);


  const startListening = useCallback(() => {
    if (!voiceModeRef.current || isLoadingRef.current) return;
    const SpeechRecognitionAPI = typeof window !== 'undefined'
      ? (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
      : null;
    if (!SpeechRecognitionAPI) {
      setVoiceStatus('এই browser-এ voice recognition নেই। Chrome বা Edge ব্যবহার করুন।');
      setVoiceMode(false);
      voiceModeRef.current = false;
      return;
    }
    try {
      recognitionRef.current?.stop?.();
      const recognition = new SpeechRecognitionAPI();
      // Banglish is generally better recognized with the Latin-script English model.
      recognition.lang = voiceLanguage === 'bn-BD' ? 'bn-BD' : 'en-US';
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;
      recognition.onstart = () => {
        if (mountedRef.current) {
          setIsListening(true);
          setVoiceStatus('শুনছি... এখন কথা বলুন');
        }
      };
      recognition.onresult = (event: any) => {
        const transcript = String(event.results?.[0]?.[0]?.transcript || '').trim();
        if (mountedRef.current) setIsListening(false);
        if (transcript) {
          setVoiceStatus('আপনি বলেছেন: ' + transcript);
          void sendQuery(transcript, true);
        } else if (voiceModeRef.current) {
          setVoiceStatus('কথাটি বুঝতে পারিনি। আবার বলুন।');
        }
      };
      recognition.onerror = (event: any) => {
        if (!mountedRef.current) return;
        setIsListening(false);
        setVoiceStatus(event?.error === 'not-allowed'
          ? 'Microphone permission দিন, তারপর আবার Start করুন।'
          : 'Voice বুঝতে সমস্যা হয়েছে। আবার চেষ্টা করুন।');
      };
      recognition.onend = () => { if (mountedRef.current) setIsListening(false); };
      recognitionRef.current = recognition;
      recognition.start();
    } catch {
      setIsListening(false);
      setVoiceStatus('Microphone চালু করা যায়নি। আবার চেষ্টা করুন।');
    }
  }, [voiceLanguage]);
  startListeningRef.current = startListening;

  const stopVoiceMode = useCallback(() => {
    voiceModeRef.current = false;
    setVoiceMode(false);
    setIsListening(false);
    setIsSpeaking(false);
    setVoiceStatus('Voice conversation বন্ধ করা হয়েছে।');
    recognitionRef.current?.stop?.();
    speechRequestIdRef.current += 1;
    try { activeSourceRef.current?.stop(); } catch { /* already stopped */ }
    activeSourceRef.current = null;
    void audioContextRef.current?.suspend().catch(() => undefined);
  }, []);

  const sendQuery = async (queryText: string, fromVoice = false) => {
    const trimmed = queryText.trim();
    if (!trimmed || isLoadingRef.current) return;
    setMessages((prev) => [...prev, { id: 'u-' + Date.now(), sender: 'user', text: trimmed }]);
    setInput('');
    setIsLoading(true);
    isLoadingRef.current = true;
    setIsListening(false);
    setVoiceStatus(fromVoice ? 'আপনার কথা বুঝে উত্তর তৈরি করছি...' : '');
    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: trimmed }),
      });
      if (!response.ok) throw new Error('AI request failed: ' + response.status);
      const data: AIChatResponsePayload = await response.json();
      const answer = data.answer || 'Here are the matching database resources:';
      setMessages((prev) => [...prev, { id: 'a-' + Date.now(), sender: 'assistant', text: answer, payload: data }]);
      // Only explicit, server-resolved chapter navigation requests may auto-open.
      const targetHref = data.navigationTarget?.type === 'CHAPTER' &&
        /^\/chapters\/[A-Za-z0-9_-]+$/.test(data.navigationTarget.href)
        ? data.navigationTarget.href
        : null;

      if (targetHref) {
        // Close the assistant before navigation so the chapter page is fully visible.
        voiceModeRef.current = false;
        setVoiceMode(false);
        setIsListening(false);
        setIsSpeaking(false);
        recognitionRef.current?.stop?.();
        speechRequestIdRef.current += 1;
        try { activeSourceRef.current?.stop(); } catch { /* already stopped */ }
        activeSourceRef.current = null;
        setIsOpen(false);
        setIsFullScreen(false);
        router.push(targetHref);
      } else if (fromVoice && voiceModeRef.current) {
        setVoiceStatus('উত্তর দিচ্ছি... এরপর আবার কথা বলতে পারবেন।');
        speak(answer, () => {
          if (voiceModeRef.current) {
            window.setTimeout(() => startListeningRef.current(), 500);
          }
        });
      }
    } catch {
      const errorText = 'AI সার্ভারে যোগাযোগ করা যাচ্ছে না। কিছুক্ষণ পর আবার চেষ্টা করুন।';
      setMessages((prev) => [...prev, { id: 'err-' + Date.now(), sender: 'assistant', text: errorText }]);
      if (fromVoice && voiceModeRef.current) {
        speak(errorText, () => {
          if (voiceModeRef.current) window.setTimeout(() => startListeningRef.current(), 500);
        });
      }
    } finally {
      setIsLoading(false);
      isLoadingRef.current = false;
    }
  };

  const navigateToResource = (href: string) => {
    // Only allow same-origin app routes; never navigate to protocol-relative URLs.
    if (!href.startsWith('/') || href.startsWith('//')) return;
    voiceModeRef.current = false;
    setVoiceMode(false);
    setIsListening(false);
    setIsSpeaking(false);
    recognitionRef.current?.stop?.();
    speechRequestIdRef.current += 1;
    try { activeSourceRef.current?.stop(); } catch { /* already stopped */ }
    activeSourceRef.current = null;
    setIsOpen(false);
    setIsFullScreen(false);
    router.push(href);
  };

  const startVoiceMode = () => {
    setIsOpen(true);
    voiceModeRef.current = true;
    setVoiceMode(true);
    setVoiceStatus('Voice Assistant চালু হচ্ছে...');
    speak(
      voiceLanguage === 'en-US'
        ? 'Assalamu Alaikum! I am Campus Assistant. I was created by Masud Rana. Which chapter do you need?'
        : voiceLanguage === 'mixed'
          ? 'আসসালামু আলাইকুম। আমি Campus Assistant। আমাকে মাসুদ রানা তৈরি করেছেন। বলুন, আপনার কোন অধ্যায়টি প্রয়োজন?'
          : 'আসসালামু আলাইকুম। আমি Campus Assistant। আমাকে মাসুদ রানা তৈরি করেছেন। বলুন, আপনার কোন অধ্যায়টি প্রয়োজন?',
      () => {
        if (voiceModeRef.current) startListeningRef.current();
      }
    );
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-2">
        <button type="button" onClick={startVoiceMode} className="flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow-lg hover:bg-emerald-700">
          <Mic className="h-4 w-4" /> Talk to Campus Assistant
        </button>
        <button type="button" onClick={() => setIsOpen(true)} className="flex items-center gap-2 rounded-full bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-lg hover:bg-indigo-700">
          <Sparkles className="h-4 w-4" /><span>AI Academic Assistant</span>
        </button>
      </div>
    );
  }

  return (
    <div className={'fixed z-50 flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl transition-all ' + (
      isFullScreen ? 'inset-0 rounded-none' : 'bottom-0 right-0 left-0 h-[88vh] sm:bottom-5 sm:right-5 sm:left-auto sm:h-[680px] sm:w-[440px] sm:rounded-2xl'
    )}>
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-slate-900 px-4 py-3 text-white sm:rounded-t-2xl">
        <div className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-indigo-400" />
          <div><h3 className="text-sm font-semibold">Campus Assistant</h3><p className="text-[11px] text-slate-300">Gemini + PostgreSQL • Google Cloud Chirp 3 HD</p></div>
        </div>
        <div className="flex items-center gap-1">
          <select aria-label="Voice language" value={voiceLanguage} onChange={(e) => setVoiceLanguage(e.target.value as VoiceLanguage)} className="max-w-[108px] rounded bg-slate-800 px-2 py-1 text-[11px] text-white">
            <option value="mixed">বাংলা + English</option>
            <option value="bn-BD">বাংলা</option>
            <option value="en-US">English / Banglish</option>
          </select>
          <select aria-label="Voice gender" value={voiceGender} onChange={(e) => setVoiceGender(e.target.value as VoiceGender)} className="max-w-[82px] rounded bg-slate-800 px-1.5 py-1 text-[11px] text-white">
            <option value="female">নারী</option>
            <option value="male">পুরুষ</option>
          </select>
          <button type="button" onClick={() => setMessages([])} title="Clear chat" className="rounded p-1.5 text-slate-300 hover:bg-slate-800"><Trash2 className="h-4 w-4" /></button>
          <button type="button" onClick={() => setIsFullScreen((v) => !v)} title="Toggle full-screen" className="rounded p-1.5 text-slate-300 hover:bg-slate-800">{isFullScreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}</button>
          <button type="button" onClick={() => { stopVoiceMode(); setIsOpen(false); }} title="Close AI Assistant" className="rounded p-1.5 text-slate-300 hover:bg-slate-800"><X className="h-4 w-4" /></button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={'flex flex-col ' + (message.sender === 'user' ? 'items-end' : 'items-start')}>
            <div className={'max-w-[90%] rounded-2xl px-3.5 py-2.5 text-sm ' + (
              message.sender === 'user' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-100'
            )}>
              <p>{message.text}</p>
              {message.payload?.resources && message.payload.resources.length > 0 && (
                <div className="mt-3 space-y-2">
                  {message.payload.resources.map((resource) => (
                    <div key={resource.type + '-' + resource.id} className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-2.5 shadow-sm">
                      <div className="flex items-center justify-between gap-2">
                        <span className="rounded bg-indigo-50 dark:bg-indigo-950 px-1.5 py-0.5 text-[10px] font-bold uppercase text-indigo-700 dark:text-indigo-300">{resource.type}</span>
                        <span className="text-[11px] text-slate-500 truncate">{resource.contextLabel}</span>
                      </div>
                      <p className="mt-1 text-xs font-semibold text-slate-900 dark:text-white">{resource.title}</p>
                      <div className="mt-2 flex items-center gap-2">
                        <button type="button" onClick={() => navigateToResource(resource.href)} className="text-xs font-medium text-indigo-600 hover:underline">Open in Platform →</button>
                        {resource.externalUrl && <a href={resource.externalUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600 hover:underline"><span>Direct Resource</span><ExternalLink className="h-3 w-3" /></a>}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        {isLoading && <div className="text-xs text-slate-500 animate-pulse">Gemini দিয়ে academic resource খুঁজছি...</div>}
      </div>

      {voiceMode && (
        <div className="mx-3 mb-2 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-emerald-900 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-100">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-xs font-semibold">
              {isListening ? <AudioLines className="h-4 w-4 animate-pulse" /> : isSpeaking ? <Volume2 className="h-4 w-4 animate-pulse" /> : <Mic className="h-4 w-4" />}
              {isListening ? 'Listening...' : isSpeaking ? 'Campus Assistant is speaking...' : 'Voice conversation active'}
            </div>
            <button type="button" onClick={stopVoiceMode} className="inline-flex items-center gap-1 rounded-lg bg-rose-600 px-2.5 py-1.5 text-[11px] font-semibold text-white"><Square className="h-3 w-3" /> Stop</button>
          </div>
          <p className="mt-1 text-[11px]">{voiceStatus}</p>
        </div>
      )}

      <div className="border-t border-slate-200 dark:border-slate-800 p-3 space-y-2">
        <div className="flex gap-1.5 overflow-x-auto pb-1">
          {SUGGESTED_QUESTIONS.map((question) => <button key={question} type="button" onClick={() => void sendQuery(question)} className="shrink-0 rounded-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-2.5 py-1 text-[11px] text-slate-700 dark:text-slate-300 hover:border-indigo-400">{question}</button>)}
        </div>
        <form onSubmit={(e) => { e.preventDefault(); void sendQuery(input); }} className="flex items-center gap-2">
          <button type="button" onClick={() => voiceMode ? stopVoiceMode() : startVoiceMode()} title={voiceMode ? 'Stop voice conversation' : 'Start voice conversation'} className={'rounded-lg p-2.5 text-white ' + (voiceMode ? 'bg-rose-600' : 'bg-emerald-600 hover:bg-emerald-700')}>
            {voiceMode ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
          </button>
          <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="বাংলা, English বা Banglish-এ লিখুন..." className="flex-1 min-w-0 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none" />
          <button type="submit" disabled={isLoading || !input.trim()} className="rounded-lg bg-indigo-600 p-2.5 text-white hover:bg-indigo-700 disabled:opacity-50"><Send className="h-4 w-4" /></button>
        </form>
      </div>
    </div>
  );
}
