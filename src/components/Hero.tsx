import React from 'react';
import { Camera, Video, Sparkles, FolderLock, Phone, ArrowRight, ShieldCheck, Star, Zap, CheckCircle2 } from 'lucide-react';
import { OWNER_INFO } from '../data';

interface HeroProps {
  onOpenBooking: (pkgId?: string) => void;
  onOpenChat: () => void;
  onScrollTo: (sectionId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onOpenChat, onScrollTo }) => {
  return (
    <section id="hero" className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 bg-stone-950 border-b border-stone-900">
      {/* Background Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <span className="artistic-watermark text-[160px] sm:text-[240px] md:text-[340px] font-bold leading-none select-none italic opacity-[0.025] text-amber-100 uppercase tracking-widest transform -rotate-3">
          ALIVE
        </span>
      </div>

      {/* Subtle ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-amber-500/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-amber-500/5 border border-amber-500/30 text-amber-400 text-[11px] font-mono uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>EXQUISITE CINEMATOGRAPHY & FRAMES</span>
          </div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-stone-900/80 border border-stone-800 text-stone-300 text-[11px] font-mono tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>ওনার: <strong className="text-amber-300 font-semibold">{OWNER_INFO.name}</strong> ({OWNER_INFO.phoneDisplay})</span>
          </div>
        </div>

        {/* Main Title & Subtitle with Artistic Serif font */}
        <div className="text-center max-w-4xl mx-auto mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold tracking-tight text-stone-100 leading-[1.15] mb-6">
            স্মরণীয় প্রতিটি মুহূর্তকে করুন{' '}
            <span className="text-amber-400 italic font-serif">
              জীবন্ত ও নান্দনিক
            </span>
          </h1>
          
          <p className="text-base sm:text-lg text-stone-400 max-w-2xl mx-auto leading-relaxed font-light">
            <strong className="text-stone-100 font-normal">এলাইভ ইভেন্ট</strong>-এ পাচ্ছেন সর্বনিম্ন পার ডে{' '}
            <span className="text-amber-400 font-mono font-semibold px-1.5 py-0.5 border border-amber-500/30 bg-amber-500/5">
              ১৫০০৳
            </span>{' '}
            থেকে সর্বোচ্চ{' '}
            <span className="text-amber-400 font-mono font-semibold px-1.5 py-0.5 border border-amber-500/30 bg-amber-500/5">
              ৭০০০৳
            </span>{' '}
            প্যাকেজে সম্পূর্ণ ভিডিওগ্রাফি, ফটোগ্রাফি ও ড্রোন কভারেজ। সাথে থাকছে ড্রাইভ এক্সেস ও সার্বক্ষণিক সাপোর্ট।
          </p>
        </div>

        {/* Two Highlight Callout Cards for 1500৳ vs 7000৳ - Artistic Flair */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
          {/* 1500 BDT Lowest Package Highlight */}
          <div 
            onClick={() => onScrollTo('packages')}
            className="group cursor-pointer bg-stone-900/30 hover:bg-stone-900/60 p-6 sm:p-7 border border-stone-800 hover:border-amber-500/40 transition-all relative"
            id="hero-card-1500"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] px-2 py-0.5 bg-stone-800 text-stone-400 border border-stone-700">
                ENTRY TIER
              </span>
              <div className="text-right">
                <span className="text-3xl font-serif font-bold text-amber-400">
                  ৳১,৫০০
                </span>
                <span className="text-xs text-stone-500 block uppercase tracking-wider font-mono">/ DAY</span>
              </div>
            </div>
            <h2 className="text-lg font-serif font-semibold text-stone-100 mb-2 flex items-center gap-2 group-hover:text-amber-300 transition-colors">
              <Video className="w-4 h-4 text-amber-400" />
              ভিডিওগ্রাফি ও ভিডিও এডিটিং প্যাকেজ
            </h2>
            <p className="text-xs text-stone-400 mb-4 leading-relaxed">
              ফুল ইভেন্ট সিনেমাটিক ভিডিও শুট, প্রফেশনাল কালার গ্রেডিং ও ইনস্টাগ্রাম/ফেসবুক রিলস অন্তর্ভুক্ত।
            </p>
            <div className="flex items-center justify-between text-xs text-amber-400/90 font-mono pt-3 border-t border-stone-800/80">
              <span className="text-[11px] tracking-wide">✓ গুগল ড্রাইভ হাই-স্পিড ডাউনলোড</span>
              <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform uppercase text-[10px] tracking-widest font-bold">
                EXPLORE <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </div>

          {/* 7000 BDT Elite Package Highlight */}
          <div 
            onClick={() => onScrollTo('packages')}
            className="group cursor-pointer bg-gradient-to-b from-amber-950/20 to-stone-900/40 hover:to-stone-900/70 p-6 sm:p-7 border border-amber-500/40 hover:border-amber-400 transition-all relative overflow-hidden"
            id="hero-card-7000"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] px-2.5 py-0.5 bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" /> SIGNATURE MEGA
              </span>
              <div className="text-right">
                <span className="text-3xl font-serif font-bold text-amber-400">
                  ৳৭,০০০
                </span>
                <span className="text-xs text-stone-500 block uppercase tracking-wider font-mono">/ DAY</span>
              </div>
            </div>
            <h2 className="text-lg font-serif font-semibold text-stone-100 mb-2 flex items-center gap-2 group-hover:text-amber-300 transition-colors">
              <Camera className="w-4 h-4 text-amber-400" />
              ফটোগ্রাফি + ভিডিওগ্রাফি + ড্রোন কভারেজ
            </h2>
            <p className="text-xs text-stone-300 mb-4 leading-relaxed">
              চিফ ফটোগ্রাফার ও সিনেমাটোগ্রাফার টিম, 4K এরিয়াল ড্রোন ভিউ, এক্সক্লুসিভ ট্রেইলার ও আনলিমিটেড ক্লিক।
            </p>
            <div className="flex items-center justify-between text-xs text-amber-300 font-mono pt-3 border-t border-amber-500/20">
              <span className="text-[11px] tracking-wide">✓ সকল RAW + 4K ফাইল ড্রাইভে</span>
              <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform uppercase text-[10px] tracking-widest font-bold">
                RESERVE <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        </div>

        {/* Primary Action Buttons - Artistic Theme */}
        <div className="flex flex-wrap items-center justify-center gap-4 max-w-2xl mx-auto mb-16">
          <button
            onClick={() => onOpenBooking()}
            className="w-full sm:w-auto px-8 py-4 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold uppercase text-xs tracking-widest transition-all flex items-center justify-center gap-2.5 shadow-lg shadow-amber-500/20 group cursor-pointer"
            id="hero-book-btn"
          >
            <Zap className="w-4 h-4 fill-stone-950" />
            <span>তারিখ বুকিং দিন</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => onScrollTo('drive-portal')}
            className="w-full sm:w-auto px-7 py-4 bg-transparent hover:bg-stone-900 text-amber-300 font-mono text-xs uppercase tracking-widest border border-amber-500/40 hover:border-amber-500 transition-all flex items-center justify-center gap-2 cursor-pointer"
            id="hero-drive-portal-btn"
          >
            <FolderLock className="w-4 h-4 text-amber-400" />
            <span>গুগল ড্রাইভ ফটো পোর্টাল</span>
          </button>

          <a
            href={`tel:${OWNER_INFO.phone}`}
            className="w-full sm:w-auto px-6 py-4 bg-stone-950 hover:bg-stone-900 text-stone-300 text-xs font-mono tracking-wider border border-stone-800 hover:border-stone-700 transition-all flex items-center justify-center gap-2"
            id="hero-direct-call-btn"
          >
            <Phone className="w-3.5 h-3.5 text-amber-400" />
            <span>কল: {OWNER_INFO.phoneDisplay} (ইমন)</span>
          </a>
        </div>

        {/* Live Features Strip - Clean architectural grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto pt-8 border-t border-stone-800">
          <div className="flex items-center gap-3 p-3 bg-stone-900/20 border border-stone-800/80">
            <div className="w-9 h-9 rounded-full border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-mono tracking-wider text-stone-500">বাজেট রেঞ্জ</p>
              <p className="text-xs font-semibold text-stone-200 font-mono">১৫০০৳ — ৭০০০৳ / দিন</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-stone-900/20 border border-stone-800/80">
            <div className="w-9 h-9 rounded-full border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
              <FolderLock className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-mono tracking-wider text-stone-500">ক্লাউড ডেলিভারি</p>
              <p className="text-xs font-semibold text-stone-200">গুগল ড্রাইভ এক্সেস</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-stone-900/20 border border-stone-800/80">
            <div className="w-9 h-9 rounded-full border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-mono tracking-wider text-stone-500">চিফ সিনেমাটোগ্রাফার</p>
              <p className="text-xs font-semibold text-stone-200 font-serif italic">ইমন (Emon)</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-stone-900/20 border border-stone-800/80">
            <div className="w-9 h-9 rounded-full border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-mono tracking-wider text-stone-500">রেটিং ও আস্থা</p>
              <p className="text-xs font-semibold text-stone-200 font-mono">৪.৯ ★ (৫৫০+ ইভেন্ট)</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
