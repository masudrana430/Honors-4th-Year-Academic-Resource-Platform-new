import { MathTitle } from '@/components/ui/MathTitle';
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

type LottiePlayer = {
  destroy: () => void;
  stop?: () => void;
};

type LottieWeb = {
  loadAnimation: (options: {
    container: Element;
    renderer: 'svg';
    loop: boolean;
    autoplay: boolean;
    animationData: any;
    rendererSettings?: {
      preserveAspectRatio?: string;
      progressiveLoad?: boolean;
    };
  }) => LottiePlayer;
};

declare global {
  interface Window {
    lottie?: LottieWeb;
  }
}

const SUGGESTED_QUESTIONS = [
  'Show me all fourth-year physics subjects.',
  'Find the third chapter of Atomic and Molecular Physics.',
  'I need Quantum Theory video classes.',
  'Show me PDF notes about molecular spectra.',
  'আণবিক পদার্থবিজ্ঞানের নোট দেখাও',
];

const WELCOME_ANNOUNCEMENT =
  'আসসালামু আলাইকুম! আমি Campus Assistant। আমাদের শিক্ষামূলক প্ল্যাটফর্মকে সমৃদ্ধ করতে অনুগ্রহ করে প্রতিটি অধ্যায়ের নোট আপলোড করে সহায়তা করুন। আপনার শেয়ার করা নোট অন্য শিক্ষার্থীদের পড়াশোনায় অনেক উপকার করবে। ধন্যবাদ।';

export function AcademicAIAssistant() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [launcherOffset, setLauncherOffset] = useState({ x: 0, y: 0 });
  const [robotDragOffset, setRobotDragOffset] = useState({ x: 0, y: 0 });
  const [isRobotDragging, setIsRobotDragging] = useState(false);
  const robotDragRef = useRef<{
    pointerId: number;
    startX: number;
    startY: number;
    offsetX: number;
    offsetY: number;
    moved: boolean;
  } | null>(null);
  const [lottieFailed, setLottieFailed] = useState(false);
  const [welcomeVisible, setWelcomeVisible] = useState(true);
  const [welcomePhase, setWelcomePhase] = useState<'entering' | 'speaking' | 'exiting'>('entering');
  const [welcomeLottieFailed, setWelcomeLottieFailed] = useState(false);
  const [welcomeVoiceBlocked, setWelcomeVoiceBlocked] = useState(false);
  const welcomeRobotContainerRef = useRef<HTMLDivElement | null>(null);
  const welcomeAnimationRef = useRef<LottiePlayer | null>(null);
  const welcomeStartTimerRef = useRef<number | null>(null);
  const welcomeExitTimerRef = useRef<number | null>(null);
  const welcomeFallbackTimerRef = useRef<number | null>(null);
  const welcomeSpeechWatchdogRef = useRef<number | null>(null);
  const welcomeStartedRef = useRef(false);
  const welcomeExitStartedRef = useRef(false);
  const announcementSpeakRef = useRef<((text: string, onDone?: () => void, onError?: () => void) => void) | null>(null);
  const robotContainerRef = useRef<HTMLDivElement | null>(null);
  const robotAnimationRef = useRef<LottiePlayer | null>(null);
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
  const activeUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
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
      if (welcomeStartTimerRef.current !== null) window.clearTimeout(welcomeStartTimerRef.current);
      if (welcomeExitTimerRef.current !== null) window.clearTimeout(welcomeExitTimerRef.current);
      if (welcomeFallbackTimerRef.current !== null) window.clearTimeout(welcomeFallbackTimerRef.current);
      if (welcomeSpeechWatchdogRef.current !== null) window.clearTimeout(welcomeSpeechWatchdogRef.current);
      speechRequestIdRef.current += 1;
      if (typeof window !== 'undefined' && window.speechSynthesis) window.speechSynthesis.cancel();
      activeUtteranceRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (isOpen) return;

    let cancelled = false;
    const scriptId = 'ai-assistant-lottie-web';
    const scriptUrl = 'https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.12.2/lottie.min.js';

    const loadRobotAnimation = async () => {
      try {
        const [response, welcomeResponse] = await Promise.all([
          fetch('/animations/ai-robot.json.gz.b64', { cache: 'force-cache' }),
          fetch('/animations/campus-welcome-robot.json.gz.b64', { cache: 'force-cache' }),
        ]);
        if (!response.ok) throw new Error('Unable to load the robot animation asset.');

        const decodeAnimation = async (assetResponse: Response) => {
          const encoded = (await assetResponse.text()).trim();
          const binary = window.atob(encoded);
          const compressedBuffer = new ArrayBuffer(binary.length);
          const compressed = new Uint8Array(compressedBuffer);
          for (let index = 0; index < binary.length; index += 1) {
            compressed[index] = binary.charCodeAt(index);
          }
          if (typeof DecompressionStream === 'undefined') {
            throw new Error('This browser does not support compressed animation assets.');
          }
          const decompressed = new Blob([compressedBuffer])
            .stream()
            .pipeThrough(new DecompressionStream('gzip'));
          return new Response(decompressed).json();
        };

        const [animationData, welcomeAnimationData] = await Promise.all([
          decodeAnimation(response),
          welcomeResponse.ok ? decodeAnimation(welcomeResponse).catch(() => null) : Promise.resolve(null),
        ]);

        if (cancelled || !window.lottie) return;

        if (robotContainerRef.current) {
          robotAnimationRef.current = window.lottie.loadAnimation({
            container: robotContainerRef.current,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData,
            rendererSettings: {
              preserveAspectRatio: 'xMidYMid meet',
              progressiveLoad: true,
            },
          });
        }

        if (welcomeAnimationData && welcomeRobotContainerRef.current) {
          welcomeAnimationRef.current = window.lottie.loadAnimation({
            container: welcomeRobotContainerRef.current,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: welcomeAnimationData,
            rendererSettings: {
              preserveAspectRatio: 'xMidYMid meet',
              progressiveLoad: true,
            },
          });
          setWelcomeLottieFailed(false);
        } else {
          setWelcomeLottieFailed(true);
        }
      } catch {
        if (!cancelled) {
          setLottieFailed(true);
          setWelcomeLottieFailed(true);
        }
      }
    };

    let script: HTMLScriptElement | null = null;
    const handleScriptReady = () => {
      if (script) {
        script.dataset.loaded = 'true';
        delete script.dataset.failed;
      }
      void loadRobotAnimation();
    };
    const handleScriptError = () => {
      if (script) script.dataset.failed = 'true';
      if (!cancelled) setLottieFailed(true);
    };

    setLottieFailed(false);

    if (window.lottie) {
      handleScriptReady();
    } else {
      script = document.getElementById(scriptId) as HTMLScriptElement | null;
      const shouldAppend = !script;

      if (!script) {
        script = document.createElement('script');
        script.id = scriptId;
        script.src = scriptUrl;
        script.async = true;
        script.crossOrigin = 'anonymous';
      }

      if (script.dataset.failed === 'true') {
        handleScriptError();
      } else if (script.dataset.loaded === 'true') {
        handleScriptReady();
      } else {
        script.addEventListener('load', handleScriptReady);
        script.addEventListener('error', handleScriptError);
        if (shouldAppend) document.head.appendChild(script);
      }
    }

    return () => {
      cancelled = true;
      script?.removeEventListener('load', handleScriptReady);
      script?.removeEventListener('error', handleScriptError);
      robotAnimationRef.current?.destroy();
      robotAnimationRef.current = null;
      welcomeAnimationRef.current?.destroy();
      welcomeAnimationRef.current = null;
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let lastTriggeredScrollY = window.scrollY;
    let animationFrame = 0;

    const handleScroll = () => {
      if (animationFrame) return;
      animationFrame = window.requestAnimationFrame(() => {
        animationFrame = 0;
        const currentScrollY = window.scrollY;
        if (Math.abs(currentScrollY - lastTriggeredScrollY) < 100) return;

        lastTriggeredScrollY = currentScrollY;
        setLauncherOffset({
          x: Math.round((Math.random() - 0.5) * 56),
          y: Math.round((Math.random() - 0.5) * 28),
        });
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
    };
  }, [isOpen]);

  const speak = useCallback((text: string, onDone?: () => void, onError?: () => void) => {
    const requestId = ++speechRequestIdRef.current;
    if (typeof window === 'undefined' || !('speechSynthesis' in window) || typeof SpeechSynthesisUtterance === 'undefined') {
      setIsSpeaking(false);
      setVoiceStatus('এই browser-এ speech synthesis সুবিধা নেই।');
      onError?.();
      return;
    }

    const synth = window.speechSynthesis;
    activeUtteranceRef.current = null;

    // Android Chrome may report synthesis-failed if cancel() and speak() happen
    // in the same task. Cancel only an actual queue, then let the engine reset.
    const beginQueue = () => {
      if (!mountedRef.current || requestId !== speechRequestIdRef.current) return;
      if (synth.speaking || synth.pending) {
        synth.cancel();
        window.setTimeout(() => {
          if (mountedRef.current && requestId === speechRequestIdRef.current) {
            synth.resume();
            speakNext();
          }
        }, 180);
      } else {
        synth.resume();
        speakNext();
      }
    };

    const sentences = text.match(/[^.!?。！？।]+[.!?。！？।]*/g) || [text];
    const chunks: string[] = [];
    for (const sentence of sentences) {
      let remaining = sentence.trim();
      while (remaining.length > 180) {
        let cut = remaining.lastIndexOf(' ', 180);
        if (cut < 60) cut = 180;
        chunks.push(remaining.slice(0, cut).trim());
        remaining = remaining.slice(cut).trim();
      }
      if (remaining) chunks.push(remaining);
    }

    let index = 0;
    const speakNext = () => {
      if (!mountedRef.current || requestId !== speechRequestIdRef.current) return;
      if (index >= chunks.length) {
        activeUtteranceRef.current = null;
        setIsSpeaking(false);
        setVoiceStatus('শুনছি... আপনার কথা বলুন।');
        onDone?.();
        return;
      }

      const part = chunks[index++];
      const hasBangla = /[\u0980-\u09FF]/.test(part);
      const requestedLang = voiceLanguage === 'bn-BD' || (voiceLanguage === 'mixed' && hasBangla)
        ? 'bn'
        : 'en';
      const voices = synth.getVoices();
      const matchingVoices = voices.filter((voice) =>
        voice.lang.toLowerCase().startsWith(requestedLang)
      );
      const preferredVoice = matchingVoices.find((voice) =>
        voiceGender === 'female'
          ? /female|woman|zira|samantha|google.*(বাংলা|bangla|bengali)/i.test(voice.name)
          : /male|man|david|alex|daniel/i.test(voice.name)
      ) || matchingVoices[0];

      let fallbackAttempted = false;
      const speakAttempt = (fallback = false) => {
        if (!mountedRef.current || requestId !== speechRequestIdRef.current) return;
        const utterance = new SpeechSynthesisUtterance(part);
        // Do not force bn-BD/en-US when that locale is not installed. An unset
        // voice/locale lets Android select its own default engine voice.
        if (!fallback && preferredVoice) {
          utterance.voice = preferredVoice;
          utterance.lang = preferredVoice.lang;
        } else if (!fallback && matchingVoices.length > 0) {
          utterance.lang = matchingVoices[0].lang;
        }
        utterance.rate = 0.96;
        utterance.pitch = voiceGender === 'female' ? 1.08 : 0.92;
        utterance.volume = 1;

        utterance.onstart = () => {
          if (mountedRef.current && requestId === speechRequestIdRef.current) {
            setIsSpeaking(true);
            setVoiceStatus('Campus Assistant কথা বলছে...');
          }
        };
        utterance.onend = () => {
          if (requestId === speechRequestIdRef.current) speakNext();
        };
        utterance.onerror = (event: SpeechSynthesisErrorEvent) => {
          if (!mountedRef.current || requestId !== speechRequestIdRef.current) return;
          const canRetry = !fallbackAttempted && (
            event.error === 'synthesis-failed' ||
            event.error === 'language-unavailable' ||
            event.error === 'voice-unavailable'
          );
          if (canRetry) {
            fallbackAttempted = true;
            activeUtteranceRef.current = null;
            synth.cancel();
            window.setTimeout(() => speakAttempt(true), 220);
            return;
          }
          activeUtteranceRef.current = null;
          setIsSpeaking(false);
          const reason = event.error === 'synthesis-unavailable'
            ? 'এই browser-এ speech engine পাওয়া যাচ্ছে না।'
            : event.error === 'audio-hardware' || event.error === 'audio-busy'
              ? 'ডিভাইসের audio output ব্যবহার করা যাচ্ছে না।'
              : 'Speech engine error: ' + event.error;
          setVoiceStatus(reason + ' আবার চেষ্টা করুন।');
          onError?.();
        };

        activeUtteranceRef.current = utterance;
        synth.speak(utterance);
      };

      speakAttempt();
    };

    setVoiceStatus('Free device voice চালু হচ্ছে...');
    beginQueue();
  }, [voiceLanguage, voiceGender]);

  announcementSpeakRef.current = speak;

  const beginWelcomeExit = useCallback(() => {
    if (welcomeExitStartedRef.current) return;
    welcomeExitStartedRef.current = true;

    if (welcomeStartTimerRef.current !== null) window.clearTimeout(welcomeStartTimerRef.current);
    if (welcomeFallbackTimerRef.current !== null) window.clearTimeout(welcomeFallbackTimerRef.current);
    if (welcomeSpeechWatchdogRef.current !== null) window.clearTimeout(welcomeSpeechWatchdogRef.current);

    setWelcomePhase('exiting');
    welcomeExitTimerRef.current = window.setTimeout(() => {
      setWelcomeVisible(false);
      welcomeAnimationRef.current?.stop?.();
    }, 900);
  }, []);

  useEffect(() => {
    // A short entrance delay makes the robot appear before its announcement begins.
    const timer = window.setTimeout(() => {
      if (welcomeExitStartedRef.current || welcomeStartedRef.current) return;
      welcomeStartedRef.current = true;
      setWelcomePhase('speaking');

      welcomeSpeechWatchdogRef.current = window.setTimeout(() => {
        // A stalled speech engine should not leave the welcome character on screen forever.
        speechRequestIdRef.current += 1;
        if (typeof window !== 'undefined' && window.speechSynthesis) window.speechSynthesis.cancel();
        activeUtteranceRef.current = null;
        setIsSpeaking(false);
        setWelcomeVoiceBlocked(true);
      }, 25000);

      announcementSpeakRef.current?.(
        WELCOME_ANNOUNCEMENT,
        beginWelcomeExit,
        () => {
          if (welcomeSpeechWatchdogRef.current !== null) {
            window.clearTimeout(welcomeSpeechWatchdogRef.current);
            welcomeSpeechWatchdogRef.current = null;
          }
          // Keep the reminder visible and provide a tap-to-play fallback when autoplay is denied.
          setWelcomeVoiceBlocked(true);
        }
      );
    }, 900);

    welcomeStartTimerRef.current = timer;
    return () => window.clearTimeout(timer);
  }, [beginWelcomeExit]);

  const retryWelcomeAnnouncement = () => {
    if (welcomeExitStartedRef.current) return;
    setWelcomeVoiceBlocked(false);
    welcomeSpeechWatchdogRef.current = window.setTimeout(() => {
      speechRequestIdRef.current += 1;
      if (typeof window !== 'undefined' && window.speechSynthesis) window.speechSynthesis.cancel();
      activeUtteranceRef.current = null;
      setIsSpeaking(false);
      setWelcomeVoiceBlocked(true);
    }, 25000);
    announcementSpeakRef.current?.(
      WELCOME_ANNOUNCEMENT,
      beginWelcomeExit,
      () => {
        if (welcomeSpeechWatchdogRef.current !== null) {
          window.clearTimeout(welcomeSpeechWatchdogRef.current);
          welcomeSpeechWatchdogRef.current = null;
        }
        setWelcomeVoiceBlocked(true);
      }
    );
  };

  const stopWelcomeAnnouncement = () => {
    welcomeStartedRef.current = true;
    if (welcomeStartTimerRef.current !== null) window.clearTimeout(welcomeStartTimerRef.current);
    speechRequestIdRef.current += 1;
    if (typeof window !== 'undefined' && window.speechSynthesis) window.speechSynthesis.cancel();
    activeUtteranceRef.current = null;
    setIsSpeaking(false);
    beginWelcomeExit();
  };

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
    if (typeof window !== 'undefined' && window.speechSynthesis) window.speechSynthesis.cancel();
    activeUtteranceRef.current = null;
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
        /^\/chapters\/[A-Za-z0-9_-]+(?:#(?:video|topic)-[A-Za-z0-9_-]+)?$/.test(data.navigationTarget.href)
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
        if (typeof window !== 'undefined' && window.speechSynthesis) window.speechSynthesis.cancel();
        activeUtteranceRef.current = null;
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
    if (typeof window !== 'undefined' && window.speechSynthesis) window.speechSynthesis.cancel();
    activeUtteranceRef.current = null;
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
    const handleRobotPointerDown = (event: React.PointerEvent<HTMLButtonElement>) => {
      if (event.button !== 0) return;
      event.preventDefault();
      event.currentTarget.setPointerCapture(event.pointerId);
      robotDragRef.current = {
        pointerId: event.pointerId,
        startX: event.clientX,
        startY: event.clientY,
        offsetX: robotDragOffset.x,
        offsetY: robotDragOffset.y,
        moved: false,
      };
      setIsRobotDragging(true);
    };

    const handleRobotPointerMove = (event: React.PointerEvent<HTMLButtonElement>) => {
      const drag = robotDragRef.current;
      if (!drag || drag.pointerId !== event.pointerId) return;

      const deltaX = event.clientX - drag.startX;
      const deltaY = event.clientY - drag.startY;
      if (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5) drag.moved = true;

      if (drag.moved) {
        const maxLeft = -(window.innerWidth - 112);
        const maxUp = -(window.innerHeight - 112);
        setRobotDragOffset({
          x: Math.max(maxLeft, Math.min(0, drag.offsetX + deltaX)),
          y: Math.max(maxUp, Math.min(0, drag.offsetY + deltaY)),
        });
      }
    };

    const handleRobotPointerUp = (event: React.PointerEvent<HTMLButtonElement>) => {
      const drag = robotDragRef.current;
      if (!drag || drag.pointerId !== event.pointerId) return;
      if (event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId);
      }
      setIsRobotDragging(false);
    };

    const handleRobotClick = () => {
      if (robotDragRef.current?.moved) {
        robotDragRef.current = null;
        return;
      }
      robotDragRef.current = null;
      setIsOpen(true);
    };

    return (
      <>
      <div className={welcomeVisible ? 'pointer-events-none invisible' : ''}>
      <div
        className="fixed bottom-4 right-7 z-[60] sm:bottom-6 sm:right-8"
        style={{
          transform: `translate3d(${launcherOffset.x + robotDragOffset.x}px, ${launcherOffset.y + robotDragOffset.y}px, 0)`,
          transition: isRobotDragging ? 'none' : 'transform 650ms cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        <div className="ai-assistant-launcher-enter">
          <button
            type="button"
            onClick={handleRobotClick}
            onPointerDown={handleRobotPointerDown}
            onPointerMove={handleRobotPointerMove}
            onPointerUp={handleRobotPointerUp}
            onPointerCancel={handleRobotPointerUp}
            aria-label="Drag robot to move it, or tap to open Campus Assistant chat"
            title="Drag to move • Tap to chat"
            className={`ai-robot-bob group relative grid h-[82px] w-[82px] touch-none select-none place-items-center rounded-full border border-white/80 bg-gradient-to-br from-white via-indigo-50 to-cyan-100 p-1 shadow-[0_12px_38px_rgba(37,99,235,0.28)] ring-1 ring-indigo-200/80 transition-shadow duration-300 hover:shadow-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-400/60 sm:h-24 sm:w-24 ${isRobotDragging ? 'cursor-grabbing scale-105' : 'cursor-grab'}`}
          >
            <span className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-br from-indigo-400/20 to-cyan-300/20 blur-md" />
            <div
              ref={robotContainerRef}
              aria-hidden="true"
              className={`pointer-events-none relative z-10 h-full w-full overflow-hidden rounded-full ${lottieFailed ? 'hidden' : ''}`}
            />
            {lottieFailed && <Bot aria-hidden="true" className="pointer-events-none relative z-10 h-12 w-12 text-indigo-600 sm:h-14 sm:w-14" />}
            <span className="pointer-events-none absolute -bottom-1 right-0 z-20 rounded-full border-2 border-white bg-indigo-600 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-white shadow-md sm:text-[10px]">
              Chat
            </span>
            <span className="pointer-events-none absolute -top-2 right-0 z-20 whitespace-nowrap rounded-full bg-slate-900 px-2.5 py-1 text-[10px] font-semibold text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
              Drag to move · Tap to chat
            </span>
          </button>
        </div>
      </div>
      </div>
      {welcomeVisible && (
        <div
          role="status"
          aria-live="polite"
          className={`ai-welcome-overlay ${welcomePhase === 'exiting' ? 'ai-welcome-exit' : 'ai-welcome-enter'}`}
          onAnimationEnd={(event) => {
            if (event.target === event.currentTarget && welcomePhase === 'exiting') {
              setWelcomeVisible(false);
            }
          }}
        >
          <div className="flex w-full max-w-[680px] items-center justify-center gap-2 sm:gap-4">
            <div className="relative h-[142px] w-[104px] shrink-0 sm:h-[210px] sm:w-[154px]">
              <div
                ref={welcomeRobotContainerRef}
                aria-hidden="true"
                className={`h-full w-full overflow-visible ${welcomeLottieFailed ? 'hidden' : ''}`}
              />
              {welcomeLottieFailed && <Bot aria-hidden="true" className="h-full w-full p-2 text-indigo-600 drop-shadow-xl" />}
            </div>
            <div className="relative min-w-0 max-w-[470px] flex-1 rounded-2xl border border-indigo-100 bg-white/95 p-3 pr-9 text-slate-800 shadow-[0_18px_55px_rgba(30,41,59,0.22)] backdrop-blur-md dark:border-slate-700 dark:bg-slate-900/95 dark:text-slate-100 sm:rounded-3xl sm:p-5 sm:pr-11">
              <button
                type="button"
                onClick={stopWelcomeAnnouncement}
                aria-label="Stop announcement and dismiss Campus Assistant"
                title="ভয়েস বন্ধ করুন"
                className="absolute -right-2 -top-2 z-10 grid h-8 w-8 place-items-center rounded-full border-2 border-white bg-rose-600 text-white shadow-lg transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-rose-300 dark:border-slate-900"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="mb-1.5 flex items-center gap-2 text-[11px] font-bold uppercase tracking-wide text-indigo-600 dark:text-indigo-300 sm:text-xs">
                <Volume2 className="h-4 w-4" />
                Campus Assistant
                {welcomePhase === 'speaking' && <span className="ml-auto inline-flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />}
              </div>
              <p className="text-[12px] leading-relaxed sm:text-sm">
                {WELCOME_ANNOUNCEMENT}
              </p>
              {welcomeVoiceBlocked && (
                <button
                  type="button"
                  onClick={retryWelcomeAnnouncement}
                  className="mt-3 inline-flex items-center gap-2 rounded-full bg-indigo-600 px-3 py-1.5 text-[11px] font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-300 sm:text-xs"
                >
                  <Volume2 className="h-3.5 w-3.5" />
                  ভয়েস শুনতে ট্যাপ করুন
                </button>
              )}
            </div>
          </div>
        </div>
      )}
      </>
    );
  }

  return (
    <div className={'ai-assistant-panel-enter fixed z-[70] flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl transition-all ' + (
      isFullScreen ? 'inset-0 rounded-none' : 'bottom-0 right-0 left-0 h-[88vh] sm:bottom-5 sm:right-5 sm:left-auto sm:h-[680px] sm:w-[440px] sm:rounded-2xl'
    )}>
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-slate-900 px-4 py-3 text-white sm:rounded-t-2xl">
        <div className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-indigo-400" />
          <div><h3 className="text-sm font-semibold">Campus Assistant</h3><p className="text-[11px] text-slate-300">Gemini + PostgreSQL • Free device voice</p></div>
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
          <button type="button" onClick={() => { stopVoiceMode(); setIsOpen(false); setIsFullScreen(false); }} title="Close AI Assistant" className="rounded p-1.5 text-slate-300 hover:bg-slate-800"><X className="h-4 w-4" /></button>
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
                      <MathTitle text={resource.title} className="mt-1 block text-xs font-semibold leading-relaxed text-slate-900 dark:text-white" mathClassName="text-[0.98em]" />
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
