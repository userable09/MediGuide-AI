import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { apiFetch } from '../lib/api';
import {
  Send,
  Bot,
  User,
  Trash2,
  Copy,
  Check,
  Sparkles,
  Loader2,
  MessageSquare,
  AlertCircle
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export const AiChatView: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: `Hello! I am **MediGuide AI**, your intelligent medication information & safety assistant powered by Groq Llama 3.3 70B.\n\nAsk me anything about:
• **Medication usages & indications**
• **Typical adult & pediatric dosage**
• **Side effects (common vs. serious)**
• **Drug-drug interactions**
• **Pregnancy & breastfeeding precautions**
• **Missed dose & storage advice**\n\n*Disclaimer: I provide educational medication information only and do not diagnose diseases or replace licensed healthcare professionals.*`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      provider: 'MediGuide AI System'
    }
  ]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const suggestedPrompts = [
    'What is Paracetamol?',
    'Can Ibuprofen be taken after food?',
    'Side effects of Metformin',
    'Uses of Amoxicillin',
    'Drug interactions of Aspirin',
    'Is Cetirizine safe during pregnancy?',
    'What should I do if I miss a dose?',
    'Can I take Vitamin D daily?'
  ];

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (customPrompt?: string) => {
    const textToSend = customPrompt || input;
    if (!textToSend.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!customPrompt) setInput('');
    setIsLoading(true);

    try {
      // Build conversation payload for contextual chat
      const historyPayload = [...messages, userMessage].map((m) => ({
        role: m.role,
        content: m.content
      }));

      const data = await apiFetch<{ reply: string; provider?: string }>('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: historyPayload })
      });

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        provider: data.provider
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err: any) {
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `⚠️ **Error**: ${err.message || 'Unable to fetch response from MediGuide AI.'}\n\nPlease verify that your API key is correctly configured in Secrets or try again shortly.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClearChat = () => {
    if (window.confirm('Are you sure you want to clear the conversation history?')) {
      setMessages([
        {
          id: 'welcome-reset',
          role: 'assistant',
          content: 'Chat history cleared. How else can MediGuide AI assist you today?',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          provider: 'MediGuide AI System'
        }
      ]);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-4">
      {/* Page Title & Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-600 to-emerald-500 text-white flex items-center justify-center shadow-md">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
              AI Medication Chat Assistant
              <span className="text-xs font-normal px-2 py-0.5 bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300 rounded-full border border-teal-200 dark:border-teal-800">
                Groq Llama 3.3 70B
              </span>
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Conversational medication safety, usage, side effects & interaction lookup
            </p>
          </div>
        </div>

        <button
          onClick={handleClearChat}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-rose-600 hover:text-rose-700 dark:text-rose-400 dark:hover:text-rose-300 bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-900/60 rounded-xl border border-rose-200/60 dark:border-rose-900/60 transition-colors self-end sm:self-auto"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Clear Chat</span>
        </button>
      </div>

      {/* Main Chat Container */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl flex flex-col h-[650px] max-h-[75vh] overflow-hidden">
        {/* Messages List Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 bg-slate-50/50 dark:bg-slate-950/50">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 sm:gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'assistant' && (
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-teal-600 to-emerald-500 text-white flex items-center justify-center shrink-0 shadow-sm font-bold text-xs mt-0.5">
                  <Bot className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
              )}

              <div
                className={`max-w-[88%] sm:max-w-[80%] rounded-2xl px-4 py-3.5 text-sm leading-relaxed shadow-xs ${
                  msg.role === 'user'
                    ? 'bg-teal-600 text-white rounded-br-xs'
                    : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200/80 dark:border-slate-700/80 rounded-bl-xs'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1.5 pb-1 border-b border-black/5 dark:border-white/10 text-[11px] opacity-80">
                  <span className="font-semibold">
                    {msg.role === 'user' ? 'You' : 'MediGuide AI'}
                  </span>
                  <div className="flex items-center gap-2">
                    {msg.provider && (
                      <span className="text-[10px] bg-teal-500/10 text-teal-700 dark:text-teal-300 px-1.5 py-0.5 rounded border border-teal-500/20">
                        {msg.provider}
                      </span>
                    )}
                    <span>{msg.timestamp}</span>
                    <button
                      onClick={() => handleCopyText(msg.id, msg.content)}
                      className="p-1 hover:bg-black/10 dark:hover:bg-white/10 rounded transition-colors"
                      title="Copy response"
                    >
                      {copiedId === msg.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="prose prose-sm dark:prose-invert max-w-none break-words">
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
              </div>

              {msg.role === 'user' && (
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center shrink-0 shadow-sm font-bold text-xs mt-0.5">
                  <User className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3 sm:gap-4 justify-start">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-teal-600 to-emerald-500 text-white flex items-center justify-center shrink-0 shadow-sm">
                <Bot className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 rounded-2xl px-4 py-3 text-sm text-slate-600 dark:text-slate-300 flex items-center gap-3 shadow-xs">
                <Loader2 className="w-4 h-4 animate-spin text-teal-600" />
                <span className="font-medium animate-pulse">MediGuide AI is thinking & compiling medication safety data...</span>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Suggested Prompts Pills */}
        <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200/60 dark:border-slate-800/60">
          <p className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-teal-500" /> Suggested Questions
          </p>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            {suggestedPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(prompt)}
                disabled={isLoading}
                className="px-3 py-1.5 bg-slate-100 hover:bg-teal-50 dark:bg-slate-800 dark:hover:bg-teal-950/60 text-xs text-slate-700 dark:text-slate-200 rounded-full shrink-0 border border-slate-200/60 dark:border-slate-700/60 transition-colors whitespace-nowrap"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Input Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="p-3 sm:p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type medication question (e.g., Can I take Paracetamol with Ibuprofen?)"
            className="flex-1 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 border border-transparent dark:border-slate-700"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 disabled:opacity-50 text-white font-semibold text-sm rounded-xl shadow-md transition-all shrink-0"
          >
            <span>Send</span>
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

      <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-xs text-amber-800 dark:text-amber-200 flex items-center gap-2">
        <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
        <span>
          <strong>Safety Note:</strong> AI generated information is for educational reference only. Never adjust prescribed medical dosages without consulting your doctor or pharmacist.
        </span>
      </div>
    </div>
  );
};
