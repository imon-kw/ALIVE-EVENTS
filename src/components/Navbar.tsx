import React, { useState } from 'react';
import { Camera, Phone, MessageCircle, FolderLock, Calendar, Menu, X, Sparkles, Video } from 'lucide-react';
import { OWNER_INFO } from '../data';

interface NavbarProps {
  onOpenBooking: (pkgId?: string) => void;
  onOpenChat: () => void;
  onScrollTo: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking, onOpenChat, onScrollTo }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (id: string) => {
    onScrollTo(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-stone-950/95 backdrop-blur-md border-b border-stone-800 transition-all">
      {/* Top emergency / direct owner banner with Artistic flair */}
      <div className="bg-stone-900/60 border-b border-stone-800/80 px-4 py-2 text-xs text-stone-300">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-widest bg-amber-500/10 text-amber-400 border border-amber-500/30">
              <Sparkles className="w-3 h-3 text-amber-400" /> ARTISTIC STUDIO
            </span>
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] uppercase tracking-wider text-stone-500">MANAGED BY</span>
              <span className="text-xs font-light italic text-amber-100 font-serif">ইমন (Emon)</span>
            </div>
            <span className="text-stone-700 hidden sm:inline">|</span>
            <div className="hidden sm:flex items-center gap-1.5">
              <span className="text-[11px] uppercase tracking-wider text-stone-500">DIRECT LINE</span>
              <a href={`tel:${OWNER_INFO.phone}`} className="text-amber-400 hover:text-amber-300 font-mono font-semibold tracking-tight">
                {OWNER_INFO.phoneDisplay}
              </a>
            </div>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span className="text-stone-400 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
              প্যাকেজ: ১৫০০৳ — ৭০০০৳ / দিন
            </span>
            <a
              href={OWNER_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-400 hover:text-amber-300 flex items-center gap-1 uppercase tracking-widest text-[10px] transition-colors"
            >
              <MessageCircle className="w-3 h-3 text-emerald-400" /> WHATSAPP
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-22 flex items-center justify-between">
        {/* Brand Logo - Artistic Flair */}
        <div 
          onClick={() => handleNavClick('hero')} 
          className="flex items-center gap-3.5 cursor-pointer group"
          id="brand-logo-btn"
        >
          <div className="w-11 h-11 rounded-full border border-amber-500/40 flex items-center justify-center text-amber-400 group-hover:border-amber-400 group-hover:bg-amber-500/10 transition-all">
            <Camera className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-serif tracking-tight text-amber-500 group-hover:text-amber-400 transition-colors">
                এলাইভ ইভেন্ট
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-stone-500 font-mono hidden sm:inline">
                ALIVE EVENT
              </span>
            </div>
            <p className="text-[11px] text-stone-500 uppercase tracking-widest">
              Premium Cinematography & Frames
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 text-xs uppercase tracking-widest text-stone-400">
          <button
            onClick={() => handleNavClick('packages')}
            className="px-3.5 py-2 hover:text-amber-300 transition-colors"
            id="nav-packages-btn"
          >
            প্যাকেজ (১৫০০৳-৭০০০৳)
          </button>
          <button
            onClick={() => handleNavClick('drive-portal')}
            className="px-3.5 py-2 text-amber-400/90 hover:text-amber-300 transition-colors flex items-center gap-1.5"
            id="nav-drive-btn"
          >
            <FolderLock className="w-3.5 h-3.5 text-amber-400" />
            গুগল ড্রাইভ
          </button>
          <button
            onClick={() => handleNavClick('calculator')}
            className="px-3.5 py-2 hover:text-amber-300 transition-colors"
            id="nav-calculator-btn"
          >
            বাজেট ক্যালকুলেটর
          </button>
          <button
            onClick={() => handleNavClick('portfolio')}
            className="px-3.5 py-2 hover:text-amber-300 transition-colors"
            id="nav-portfolio-btn"
          >
            পোর্টফোলিও
          </button>
          <button
            onClick={() => handleNavClick('contact')}
            className="px-3.5 py-2 hover:text-amber-300 transition-colors"
            id="nav-contact-btn"
          >
            ওনার পরিচিতি
          </button>
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={onOpenChat}
            className="px-3.5 py-2.5 rounded-none border border-stone-800 hover:border-amber-500/50 text-stone-300 hover:text-amber-400 text-xs font-mono uppercase tracking-wider flex items-center gap-2 transition-all"
            id="nav-live-chat-btn"
          >
            <MessageCircle className="w-3.5 h-3.5 text-amber-400" />
            <span>AI চ্যাট</span>
          </button>

          <a
            href={`tel:${OWNER_INFO.phone}`}
            className="w-9 h-9 rounded-full border border-amber-500/30 flex items-center justify-center text-amber-400 hover:bg-amber-500 hover:text-stone-950 transition-all"
            title="সরাসরি ইমন ভাইকে কল করুন: ০১৭৮৮০৫৫৫৮৬"
            id="nav-call-icon-btn"
          >
            <Phone className="w-3.5 h-3.5" />
          </a>

          <button
            onClick={() => onOpenBooking()}
            className="px-5 py-2.5 bg-transparent border border-amber-500 text-amber-400 hover:bg-amber-500 hover:text-stone-950 transition-all uppercase text-xs tracking-widest font-bold flex items-center gap-2"
            id="nav-book-now-btn"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>বুকিং দিন</span>
          </button>
        </div>

        {/* Mobile menu toggle button */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={onOpenChat}
            className="p-2 rounded-full border border-amber-500/30 text-amber-400"
            aria-label="Live Chat"
          >
            <MessageCircle className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 border border-stone-800 text-stone-300 hover:text-white"
            id="mobile-menu-toggle-btn"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-stone-950 border-b border-stone-800 px-5 pt-3 pb-6 space-y-2 animate-in fade-in slide-in-from-top-4">
          <button
            onClick={() => handleNavClick('packages')}
            className="w-full text-left py-2.5 text-stone-300 hover:text-amber-400 text-sm uppercase tracking-wider flex items-center justify-between border-b border-stone-900"
          >
            <span>প্যাকেজসমূহ (১৫০০৳ - ৭০০০৳)</span>
            <span className="text-[10px] font-mono bg-amber-500/10 text-amber-400 px-2 py-0.5 border border-amber-500/20">৪টি প্যাকেজ</span>
          </button>
          <button
            onClick={() => handleNavClick('drive-portal')}
            className="w-full text-left py-2.5 text-amber-400 text-sm uppercase tracking-wider flex items-center gap-2 border-b border-stone-900"
          >
            <FolderLock className="w-4 h-4 text-amber-400" />
            <span>গুগল ড্রাইভ ফটো/ভিডিও ডাউনলোড</span>
          </button>
          <button
            onClick={() => handleNavClick('calculator')}
            className="w-full text-left py-2.5 text-stone-300 hover:text-amber-400 text-sm uppercase tracking-wider border-b border-stone-900"
          >
            ইভেন্ট বাজেট ক্যালকুলেটর
          </button>
          <button
            onClick={() => handleNavClick('portfolio')}
            className="w-full text-left py-2.5 text-stone-300 hover:text-amber-400 text-sm uppercase tracking-wider border-b border-stone-900"
          >
            নান্দনিক পোর্টফোলিও গ্যালারি
          </button>
          <button
            onClick={() => handleNavClick('contact')}
            className="w-full text-left py-2.5 text-stone-300 hover:text-amber-400 text-sm uppercase tracking-wider border-b border-stone-900"
          >
            ওনার পরিচিতি: ইমন (Emon)
          </button>

          <div className="pt-4 flex flex-col gap-2.5">
            <a
              href={`tel:${OWNER_INFO.phone}`}
              className="w-full py-3 border border-amber-500/40 text-amber-400 font-mono text-xs uppercase tracking-widest text-center flex items-center justify-center gap-2"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>কল করুন: {OWNER_INFO.phoneDisplay}</span>
            </a>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3 bg-amber-500 text-stone-950 font-bold text-xs uppercase tracking-widest text-center flex items-center justify-center gap-2"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>তারিখ বুকিং দিন</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
