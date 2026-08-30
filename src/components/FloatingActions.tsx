import React from 'react';
import { MessageCircle, Phone, FolderLock, Sparkles, Bot } from 'lucide-react';
import { OWNER_INFO } from '../data';

interface FloatingActionsProps {
  onOpenChat: () => void;
  onScrollToDrive: () => void;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({ onOpenChat, onScrollToDrive }) => {
  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-auto">
      {/* Google Drive Shortcut Pill */}
      <button
        onClick={onScrollToDrive}
        className="group px-3.5 py-2 bg-stone-900 text-amber-300 text-xs font-mono uppercase tracking-wider border border-amber-500/40 shadow-xl flex items-center gap-2 transition-all hover:bg-stone-800 hover:border-amber-400"
        id="floating-drive-btn"
      >
        <FolderLock className="w-3.5 h-3.5 text-amber-400" />
        <span className="hidden sm:inline">ড্রাইভ পোর্টাল</span>
        <span className="sm:hidden">ড্রাইভ</span>
      </button>

      {/* WhatsApp Action */}
      <a
        href={OWNER_INFO.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-11 h-11 bg-stone-900 border border-emerald-500/60 text-emerald-400 flex items-center justify-center shadow-2xl hover:bg-emerald-600 hover:text-stone-950 transition-all cursor-pointer"
        title="ইমন ভাইয়ের সাথে হোয়াটসঅ্যাপে কথা বলুন"
        id="floating-whatsapp-btn"
      >
        <MessageCircle className="w-5 h-5" />
      </a>

      {/* Main Live AI Chat Floating Button */}
      <button
        onClick={onOpenChat}
        className="relative group px-4 py-3 bg-amber-500 hover:bg-amber-400 text-stone-950 shadow-2xl transition-all flex items-center gap-2 font-mono uppercase tracking-widest text-xs font-bold cursor-pointer border border-amber-400"
        id="floating-live-chat-btn"
      >
        <div className="relative">
          <Bot className="w-4 h-4" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-600" />
        </div>
        <span className="hidden sm:inline">AI সাপোর্ট</span>
      </button>
    </div>
  );
};
