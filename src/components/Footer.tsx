import React from 'react';
import { Camera, Phone, Mail, MapPin, MessageCircle, FolderLock, ArrowUp, Heart } from 'lucide-react';
import { OWNER_INFO } from '../data';

interface FooterProps {
  onScrollTo: (sectionId: string) => void;
  onOpenBooking: () => void;
  onOpenChat: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onScrollTo, onOpenBooking, onOpenChat }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-stone-950 text-stone-300 border-t border-stone-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 border border-amber-500/50 p-0.5">
                <div className="w-full h-full bg-stone-900 flex items-center justify-center">
                  <Camera className="w-5 h-5 text-amber-400" />
                </div>
              </div>
              <div>
                <span className="text-xl font-serif font-bold text-stone-100 block">এলাইভ ইভেন্ট</span>
                <span className="text-[10px] text-amber-400 font-mono tracking-widest uppercase">
                  ALIVE EVENT STUDIO
                </span>
              </div>
            </div>

            <p className="text-xs text-stone-400 font-light leading-relaxed">
              প্রফেশনাল ফটোগ্রাফি, ভিডিওগ্রাফি ও সিনেমাটোগ্রাফি সল্যুশন। সর্বনিম্ন পার ডে ১৫০০ টাকা থেকে সর্বোচ্চ ৭০০০ টাকা পর্যন্ত সেরা কোয়ালিটির প্যাকেজ।
            </p>

            <div className="text-xs font-mono text-stone-400 space-y-1">
              <p>ওনার: <strong className="text-amber-400 font-normal">{OWNER_INFO.name} ({OWNER_INFO.nameEn})</strong></p>
              <p>হটলাইন: <a href={`tel:${OWNER_INFO.phone}`} className="text-amber-400 font-bold hover:underline">{OWNER_INFO.phoneDisplay}</a></p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-amber-400 mb-4 border-b border-stone-800 pb-2">
              সার্ভিস ও ফিচারসমূহ
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <button
                  onClick={() => onScrollTo('packages')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  • প্যাকেজ তালিকা (১৫০০৳ - ৭০০০৳/দিন)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollTo('drive-portal')}
                  className="hover:text-amber-400 transition-colors text-left flex items-center gap-1 text-amber-300"
                >
                  • গুগল ড্রাইভ ফটো ও ভিডিও অ্যাক্সেস
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollTo('calculator')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  • ইভেন্ট বাজেট ও খরচ ক্যালকুলেটর
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollTo('portfolio')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  • নান্দনিক ফটো ও ভিডিও পোর্টফোলিও
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenChat}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  • লাইভ AI চ্যাট সাপোর্ট
                </button>
              </li>
            </ul>
          </div>

          {/* Packages Breakdown */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-amber-400 mb-4 border-b border-stone-800 pb-2">
              প্যাকেজ রেট সারসংক্ষেপ
            </h4>
            <ul className="space-y-2 text-xs font-mono text-stone-400">
              <li className="flex justify-between pb-1 border-b border-stone-900">
                <span className="font-sans text-stone-400">বেসিক ভিডিও ও এডিটিং:</span>
                <strong className="text-amber-400 font-normal">৳১,৫০০/দিন</strong>
              </li>
              <li className="flex justify-between pb-1 border-b border-stone-900">
                <span className="font-sans text-stone-400">স্ট্যান্ডার্ড ইভেন্ট:</span>
                <strong className="text-amber-400 font-normal">৳৩,০০০/দিন</strong>
              </li>
              <li className="flex justify-between pb-1 border-b border-stone-900">
                <span className="font-sans text-stone-400">হলুদ ও রিসেপশন:</span>
                <strong className="text-amber-400 font-normal">৳৫,০০০/দিন</strong>
              </li>
              <li className="flex justify-between pb-1 border-b border-stone-900">
                <span className="font-sans text-stone-400">মেগা ওয়েডিং (ফটো+ভিডিও+ড্রোন):</span>
                <strong className="text-amber-400 font-normal">৳৭,০০০/দিন</strong>
              </li>
            </ul>
          </div>

          {/* Contact Direct */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-amber-400 mb-4 border-b border-stone-800 pb-2">
              যোগাযোগ ও শিডিউল
            </h4>
            <div className="space-y-3 text-xs text-stone-400">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <a href={`tel:${OWNER_INFO.phone}`} className="text-stone-200 hover:text-amber-400 font-mono font-bold">
                  {OWNER_INFO.phoneDisplay}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <a
                  href={OWNER_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 font-mono transition-colors"
                >
                  হোয়াটসঅ্যাপে মেসেজ
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="font-mono text-stone-300">{OWNER_INFO.email}</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>{OWNER_INFO.location}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-stone-500">
          <p>© {new Date().getFullYear()} এলাইভ ইভেন্ট (Alive Event). Founder & Lead: Imon.</p>
          
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-stone-400">
              গুগল ড্রাইভ হাই-স্পিড ক্লাউড টেকনোলজি <FolderLock className="w-3.5 h-3.5 text-amber-400 inline" />
            </span>
            <button
              onClick={scrollToTop}
              className="p-2 bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white border border-stone-800 transition-colors"
              title="উপরে যান"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
