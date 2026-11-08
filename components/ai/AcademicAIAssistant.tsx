'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Bot, X, Send, Sparkles, Trash2, ExternalLink, Maximize2, Minimize2 } from 'lucide-react';
import { AIChatResponsePayload } from '@/types';
import { VoiceMicButton } from '@/components/search/VoiceMicButton';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  payload?: AIChatResponsePayload;
}

const SUGGESTED_QUESTIONS = [
  'Show me all fourth-year physics subjects.',
  'Find the third chapter of Atomic and Molecular Physics.',
  'I need Quantum Theory video classes.',
  'Show me PDF notes about molecular spectra.',
  'আণবিক পদার্থবিজ্ঞানের নোট দেখাও',
];

export function AcademicAIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [voiceLang, setVoiceLang] = useState<'en-US' | 'bn-BD'>('en-US');
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: 'Hello! I am your Honours 4th Year AI Academic Assistant (powered by Google Gemini + PostgreSQL). Ask me in English or বাংলা for any subject, chapter, YouTube lecture, or Google Drive PDF/Image note!',
    },
  ]);

  const sendQuery = async (queryText: string) => {
    const trimmed = queryText.trim();
    if (!trimmed || isLoading) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: trimmed,
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: trimmed }),
      });
      const data: AIChatResponsePayload = await res.json();
      setMessages((prev) => [
        ...prev,
        {
          id: `a-${Date.now()}`,
          sender: 'assistant',
          text: data.answer || 'Here are the matching database resources:',
          payload: data,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          sender: 'assistant',
          text: 'Could not reach the AI search endpoint. Please try again.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-lg hover:bg-indigo-700 transition"
      >
        <Sparkles className="h-4 w-4" />
        <span>AI Academic Assistant</span>
      </button>
    );
  }

  return (
    <div
      className={`fixed z-50 flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl transition-all ${
        isFullScreen
          ? 'inset-0 rounded-none'
          : 'bottom-0 right-0 left-0 h-[85vh] sm:bottom-5 sm:right-5 sm:left-auto sm:h-[600px] sm:w-[420px] sm:rounded-2xl'
      }`}
    >
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-slate-900 px-4 py-3 text-white sm:rounded-t-2xl">
        <div className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-indigo-400" />
          <div>
            <h3 className="text-sm font-semibold">AI Academic Assistant</h3>
            <p className="text-[11px] text-slate-300">Gemini + PostgreSQL Verified Resources</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() =>
              setVoiceLang((prev) => (prev === 'en-US' ? 'bn-BD' : 'en-US'))
            }
            className="rounded px-2 py-1 text-[11px] font-medium bg-slate-800 text-indigo-300 hover:bg-slate-700"
          >
            {voiceLang === 'en-US' ? 'EN' : 'বাংলা'}
          </button>
          <button
            type="button"
            onClick={() =>
              setMessages([
                {
                  id: 'welcome',
                  sender: 'assistant',
                  text: 'Chat history cleared. Ask me about any Honours 4th Year subject, chapter, video lecture, or PDF note!',
                },
              ])
            }
            title="Clear chat"
            className="rounded p-1.5 text-slate-300 hover:bg-slate-800"
          >
            <Trash2 className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => setIsFullScreen((v) => !v)}
            title="Toggle full-screen"
            className="rounded p-1.5 text-slate-300 hover:bg-slate-800"
          >
            {isFullScreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </button>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            title="Close AI Assistant"
            className="rounded p-1.5 text-slate-300 hover:bg-slate-800"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 text-sm ${
                m.sender === 'user'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-100'
              }`}
            >
              <p>{m.text}</p>
              {m.payload?.resources && m.payload.resources.length > 0 && (
                <div className="mt-3 space-y-2">
                  {m.payload.resources.map((r) => (
                    <div
                      key={`${r.type}-${r.id}`}
                      className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-2.5 shadow-sm"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="rounded bg-indigo-50 dark:bg-indigo-950 px-1.5 py-0.5 text-[10px] font-bold uppercase text-indigo-700 dark:text-indigo-300">
                          {r.type}
                        </span>
                        <span className="text-[11px] text-slate-500 truncate">
                          {r.contextLabel}
                        </span>
                      </div>
                      <p className="mt-1 text-xs font-semibold text-slate-900 dark:text-white">
                        {r.title}
                      </p>
                      <div className="mt-2 flex items-center gap-2">
                        <Link
                          href={r.href}
                          className="text-xs font-medium text-indigo-600 hover:underline"
                        >
                          Open in Platform →
                        </Link>
                        {r.externalUrl && (
                          <a
                            href={r.externalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600 hover:underline"
                          >
                            <span>Direct Resource</span>
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="text-xs text-slate-500 animate-pulse">
            Searching PostgreSQL academic records with Gemini AI...
          </div>
        )}
      </div>

      <div className="border-t border-slate-200 dark:border-slate-800 p-3 space-y-2">
        <div className="flex gap-1.5 overflow-x-auto pb-1">
          {SUGGESTED_QUESTIONS.map((q) => (
            <button
              key={q}
              type="button"
              onClick={() => sendQuery(q)}
              className="shrink-0 rounded-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-2.5 py-1 text-[11px] text-slate-700 dark:text-slate-300 hover:border-indigo-400"
            >
              {q}
            </button>
          ))}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendQuery(input);
          }}
          className="flex items-center gap-2"
        >
          <VoiceMicButton
            language={voiceLang}
            onTranscript={(spoken) => {
              setInput(spoken);
              sendQuery(spoken);
            }}
          />
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask in English or বাংলা..."
            className="flex-1 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="rounded-lg bg-indigo-600 p-2 text-white hover:bg-indigo-700 disabled:opacity-50"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
