import React, { useState } from 'react';
import { PACKAGES, OWNER_INFO } from '../data';
import { PackageItem } from '../types';
import { Check, Video, Camera, Star, Sparkles, Calendar, ArrowRight, ShieldCheck, DownloadCloud } from 'lucide-react';

interface PackagesSectionProps {
  onSelectPackage: (pkg: PackageItem, days: number) => void;
  onOpenBooking: (pkgId?: string) => void;
}

export const PackagesSection: React.FC<PackagesSectionProps> = ({ onSelectPackage, onOpenBooking }) => {
  const [selectedDays, setSelectedDays] = useState<number>(1);

  return (
    <section id="packages" className="py-24 bg-stone-950 border-b border-stone-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-amber-500/5 border border-amber-500/30 text-amber-400 text-[11px] font-mono uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>TRANSPARENT TARIFF & PACKAGES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-stone-100 tracking-tight mb-4">
            আমাদের ইভেন্ট প্যাকেজসমূহ
          </h2>
          <p className="text-stone-400 text-sm sm:text-base font-light leading-relaxed">
            সর্বনিম্ন পার ডে <strong className="text-amber-400 font-mono font-semibold">১৫০০ টাকা</strong> থেকে শুরু করে সর্বোচ্চ{' '}
            <strong className="text-amber-400 font-mono font-semibold">৭০০০ টাকা</strong> পর্যন্ত আপনার প্রয়োজন অনুযায়ী প্যাকেজ বেছে নিন।
          </p>

          {/* Days duration selector */}
          <div className="mt-8 inline-flex items-center p-1 bg-stone-900/60 border border-stone-800">
            <span className="text-[11px] font-mono uppercase tracking-wider text-stone-500 px-3 hidden sm:inline">
              ইভেন্ট সময়কাল:
            </span>
            {[1, 2, 3, 4, 5].map((d) => (
              <button
                key={d}
                onClick={() => setSelectedDays(d)}
                className={`px-4 py-2 text-xs font-mono uppercase tracking-wider transition-all ${
                  selectedDays === d
                    ? 'bg-amber-500 text-stone-950 font-bold shadow'
                    : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/60'
                }`}
              >
                {d === 1 ? '১ দিন (DAILY)' : `${d} দিন`}
              </button>
            ))}
          </div>
          {selectedDays > 1 && (
            <p className="text-xs font-mono text-amber-400/90 mt-2">
              *{selectedDays} দিনের মোট হিসাব স্বয়ংক্রিয়ভাবে কার্ডগুলোতে প্রতিফলিত হচ্ছে
            </p>
          )}
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PACKAGES.map((pkg) => {
            const calculatedTotal = pkg.pricePerDay * selectedDays;
            const isLowest = pkg.isLowest;
            const isHighest = pkg.isHighest;

            return (
              <div
                key={pkg.id}
                className={`flex flex-col justify-between transition-all duration-300 relative ${
                  isHighest
                    ? 'bg-gradient-to-b from-amber-950/20 to-stone-900/40 border-2 border-amber-500/80 shadow-2xl lg:-translate-y-2'
                    : isLowest
                    ? 'bg-stone-900/30 border border-amber-500/40 hover:border-amber-500/70'
                    : 'bg-stone-900/20 border border-stone-800 hover:border-stone-700'
                } p-6 sm:p-7`}
                id={`package-card-${pkg.id}`}
              >
                {/* Top Badge */}
                {pkg.badge && (
                  <div className="absolute -top-3 left-6">
                    <span
                      className={`inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-widest px-2.5 py-0.5 border ${
                        isHighest
                          ? 'bg-amber-500 text-stone-950 font-bold border-amber-400'
                          : isLowest
                          ? 'bg-stone-900 text-amber-300 border-amber-500/40'
                          : 'bg-stone-900 text-stone-300 border-stone-700'
                      }`}
                    >
                      {isHighest && <Star className="w-2.5 h-2.5 fill-stone-950 text-stone-950" />}
                      {pkg.badge}
                    </span>
                  </div>
                )}

                <div>
                  {/* Header */}
                  <div className="mt-2 mb-4">
                    <h3 className="text-xl font-serif font-bold text-stone-100 mb-1.5 flex items-center gap-2">
                      {isHighest || pkg.id.includes('combo') ? (
                        <Camera className="w-4 h-4 text-amber-400 shrink-0" />
                      ) : (
                        <Video className="w-4 h-4 text-amber-400 shrink-0" />
                      )}
                      <span>{pkg.name}</span>
                    </h3>
                    <p className="text-xs text-stone-400 font-light leading-relaxed min-h-[36px]">
                      {pkg.description}
                    </p>
                  </div>

                  {/* Price Block */}
                  <div className="py-4 my-2 border-y border-stone-800">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-3xl sm:text-4xl font-serif font-bold text-amber-400">
                        ৳{calculatedTotal.toLocaleString('en-US')}
                      </span>
                      <span className="text-xs font-mono text-stone-500 uppercase tracking-wider">
                        {selectedDays === 1 ? '/ DAY' : `/ ${selectedDays} DAYS`}
                      </span>
                    </div>
                    {selectedDays > 1 && (
                      <p className="text-[11px] font-mono text-stone-500 mt-1">
                        (Daily: ৳{pkg.pricePerDay.toLocaleString('en-US')})
                      </p>
                    )}
                    <div className="mt-2 inline-flex items-center text-[11px] text-stone-400 font-mono bg-stone-950 px-2 py-0.5 border border-stone-800">
                      👥 {pkg.teamSize}
                    </div>
                  </div>

                  {/* Deliverables / Features List */}
                  <div className="space-y-3 my-5">
                    <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-stone-500">
                      INCLUSIONS & DELIVERABLES:
                    </p>
                    <ul className="space-y-2.5 text-xs text-stone-300 font-light">
                      {pkg.deliverables.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 leading-relaxed">
                          <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Google Drive Delivery Guarantee Tag */}
                  <div className="p-2.5 bg-stone-950 border border-amber-500/20 text-[11px] font-mono text-amber-300/90 flex items-center gap-2 mb-6">
                    <DownloadCloud className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>গুগল ড্রাইভ ফুল অ্যাক্সেস ও ক্লাউড স্টোরেজ</span>
                  </div>
                </div>

                {/* Bottom CTA Button */}
                <div className="space-y-2.5 pt-2">
                  <button
                    onClick={() => {
                      onSelectPackage(pkg, selectedDays);
                      onOpenBooking(pkg.id);
                    }}
                    className={`w-full py-3.5 px-4 font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      isHighest
                        ? 'bg-amber-500 hover:bg-amber-400 text-stone-950 shadow-md'
                        : 'bg-transparent hover:bg-amber-500 text-amber-400 hover:text-stone-950 border border-amber-500/60 hover:border-amber-500'
                    }`}
                    id={`btn-select-pkg-${pkg.id}`}
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>প্যাকেজ বুক করুন</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>

                  <a
                    href={`https://wa.me/8801788055586?text=${encodeURIComponent(
                      `আসসালামু আলাইকুম ইমন ভাই, আমি এলাইভ ইভেন্ট এর '${pkg.name}' (৳${pkg.pricePerDay}/দিন) প্যাকেজ সম্পর্কে বিস্তারিত জানতে চাই।`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-1.5 text-center text-[11px] font-mono text-stone-500 hover:text-amber-300 block transition-colors uppercase tracking-wider"
                  >
                    হোয়াটসঅ্যাপে কথা বলুন →
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Trust Guarantee */}
        <div className="mt-16 p-6 sm:p-8 bg-stone-900/20 border border-stone-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-lg font-serif font-semibold text-stone-100">কাস্টম বাজেট বা আলোচনা প্রয়োজন?</h4>
              <p className="text-xs text-stone-400 font-light mt-0.5">
                আপনার ইভেন্ট ও বাজেটের উপযোগী কাস্টম প্যাকেজ তৈরি করতে সরাসরি ইমন ভাইয়ের সাথে পরামর্শ করুন।
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <a
              href={`tel:${OWNER_INFO.phone}`}
              className="w-full md:w-auto px-6 py-3 border border-amber-500 text-amber-400 hover:bg-amber-500 hover:text-stone-950 text-xs font-mono uppercase tracking-widest font-bold text-center flex items-center justify-center gap-2 transition-all"
            >
              📞 কল করুন: {OWNER_INFO.phoneDisplay}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
