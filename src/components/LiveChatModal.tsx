import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Bot, User, Phone, Sparkles, RefreshCw, ExternalLink } from 'lucide-react';
import { OWNER_INFO } from '../data';
import { ChatMessage } from '../types';

interface LiveChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBooking: () => void;
}

export const LiveChatModal: React.FC<LiveChatModalProps> = ({ isOpen, onClose, onOpenBooking }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      role: 'assistant',
      content: `আসসালামু আলাইকুম! 'এলাইভ ইভেন্ট' (Alive Event) লাইভ সাপোর্টে স্বাগতম। আমাদের ওনার **জনাব ইমন** ভাইয়ের পক্ষ থেকে শুভেচ্ছা। 
আমাদের সর্বনিম্ন পার ডে **১৫০০ টাকা** (ভিডিওগ্রাফি + এডিটিং) থেকে সর্বোচ্চ **৭০০০ টাকা** (ফটোগ্রাফি + ভিডিওগ্রাফি + ড্রোন) প্যাকেজ রয়েছে। সাথে রয়েছে গুগল ড্রাইভ ইনস্ট্যান্ট অ্যাক্সেস।

আপনার ইভেন্টের জন্য কীভাবে সাহায্য করতে পারি?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    '১৫০০ টাকার প্যাকেজে কি কি আছে?',
    '৭০০০ টাকার মেগা প্যাকেজের বিস্তারিত বলুন',
    'গুগল ড্রাইভ থেকে ছবি ডাউনলোড কীভাবে করব?',
    'ইমন ভাইয়ের সাথে কথা বলার নিয়ম কি?'
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text || loading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setLoading(true);

    try {
      // Build conversation history
      const history = messages.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          conversationHistory: history,
        }),
      });

      const data = await res.json();
      const botReply = data.reply || 'ধন্যবাদ! আরও তথ্যের জন্য সরাসরি কল করুন ০১৭৮৮০৫৫৫৮৬ নম্বরে।';

      const assistantMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: botReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        role: 'assistant',
        content: `নেটওয়ার্ক সংযোগে সাময়িক ত্রুটি হয়েছে। দয়া করে সরাসরি ওনার ইমন ভাইকে কল করুন: ${OWNER_INFO.phoneDisplay} অথবা হোয়াটসঅ্যাপে মেসেজ দিন।`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-end sm:items-center justify-center sm:p-4">
      <div className="bg-stone-950 border border-stone-800 w-full sm:max-w-lg h-[85vh] sm:h-[620px] shadow-2xl flex flex-col overflow-hidden relative">
        {/* Header */}
        <div className="bg-stone-900/60 p-4 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 border border-amber-500/50 bg-stone-950 flex items-center justify-center text-amber-400">
                <Bot className="w-5 h-5" />
              </div>
              <span className="w-2.5 h-2.5 bg-emerald-500 absolute -bottom-0.5 -right-0.5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-serif font-bold text-stone-100">এলাইভ ইভেন্ট সাপোর্ট AI</h3>
                <span className="text-[9px] px-1.5 py-0.2 bg-amber-500/10 text-amber-400 font-mono uppercase tracking-widest border border-amber-500/20">
                  LIVE
                </span>
              </div>
              <p className="text-[11px] font-mono text-stone-400">
                LEAD: {OWNER_INFO.nameEn} ({OWNER_INFO.phoneDisplay})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <a
              href={`tel:${OWNER_INFO.phone}`}
              className="p-2 bg-stone-900 hover:bg-amber-500/20 text-amber-400 border border-stone-800 transition-colors"
              title="সরাসরি কল করুন"
            >
              <Phone className="w-4 h-4" />
            </a>
            <button
              onClick={onClose}
              className="p-2 bg-stone-900 hover:bg-stone-800 text-stone-400 hover:text-white border border-stone-800 transition-colors"
              id="close-chat-modal-btn"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Message Container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-stone-950">
          {messages.map((msg) => {
            const isUser = msg.role === 'user';
            return (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-7 h-7 border border-amber-500/40 bg-stone-900 flex items-center justify-center text-amber-400 shrink-0 text-xs">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                )}

                <div
                  className={`max-w-[82%] p-3.5 text-xs sm:text-sm leading-relaxed border ${
                    isUser
                      ? 'bg-amber-500 text-stone-950 font-serif font-medium border-amber-500'
                      : 'bg-stone-900/40 border-stone-800 text-stone-200 whitespace-pre-line'
                  }`}
                >
                  <p>{msg.content}</p>
                  <span
                    className={`text-[10px] font-mono block mt-1.5 text-right ${
                      isUser ? 'text-stone-900/70' : 'text-stone-500'
                    }`}
                  >
                    {msg.timestamp}
                  </span>
                </div>

                {isUser && (
                  <div className="w-7 h-7 border border-stone-700 bg-stone-800 flex items-center justify-center text-stone-300 shrink-0 text-xs">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            );
          })}

          {loading && (
            <div className="flex gap-2.5 items-center text-xs font-mono text-amber-400 bg-stone-900/40 p-3 border border-stone-800 w-fit">
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              <span>এলাইভ ইভেন্ট সহকারী উত্তর লিখছে...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Question Chips */}
        <div className="px-3 py-2 bg-stone-900/40 border-t border-stone-800 overflow-x-auto flex gap-1.5 no-scrollbar">
          {quickPrompts.map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleSendMessage(prompt)}
              disabled={loading}
              className="text-[11px] font-mono px-2.5 py-1 bg-stone-900/80 hover:bg-stone-800 text-amber-300 border border-stone-800 hover:border-amber-500/40 whitespace-nowrap transition-colors shrink-0 disabled:opacity-50"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Area */}
        <div className="p-3 bg-stone-950 border-t border-stone-800">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex gap-2"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="প্যাকেজ বা বুকিং সম্পর্কে যেকোনো প্রশ্ন লিখুন..."
              className="flex-1 px-4 py-2.5 bg-stone-900 text-stone-100 placeholder-stone-500 text-xs sm:text-sm border border-stone-800 focus:outline-none focus:border-amber-500 font-serif"
              id="live-chat-input"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || loading}
              className="p-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 disabled:opacity-40 transition-all shrink-0 cursor-pointer"
              id="live-chat-send-btn"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Fallback to WhatsApp & Phone */}
          <div className="mt-2 flex items-center justify-between text-[11px] font-mono text-stone-400 px-1">
            <span>সরাসরি যোগাযোগ:</span>
            <div className="flex gap-3">
              <a
                href={OWNER_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 hover:underline flex items-center gap-1"
              >
                হোয়াটসঅ্যাপ <ExternalLink className="w-3 h-3" />
              </a>
              <a href={`tel:${OWNER_INFO.phone}`} className="text-amber-400 hover:underline">
                কল: {OWNER_INFO.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
