import React, { useState } from 'react';
import { Calculator, Check, FileText, Printer, Calendar, Sparkles, ShieldCheck } from 'lucide-react';
import { OWNER_INFO, PACKAGES } from '../data';

interface CostCalculatorProps {
  onOpenBookingWithDetails: (details: {
    eventType: string;
    packageId: string;
    days: number;
    totalPrice: number;
    needDrone: boolean;
    needAlbum: boolean;
    notes: string;
  }) => void;
}

export const CostCalculator: React.FC<CostCalculatorProps> = ({ onOpenBookingWithDetails }) => {
  const [eventType, setEventType] = useState('ওয়েডিং ও রিসেপশন');
  const [selectedBasePackageId, setSelectedBasePackageId] = useState('starter-video-1500');
  const [days, setDays] = useState(1);
  const [needDrone, setNeedDrone] = useState(false);
  const [needAlbum, setNeedAlbum] = useState(false);
  const [needFastDelivery, setNeedFastDelivery] = useState(false);
  const [needExtraPhotographer, setNeedExtraPhotographer] = useState(false);
  const [showQuotationModal, setShowQuotationModal] = useState(false);

  const basePackage = PACKAGES.find((p) => p.id === selectedBasePackageId) || PACKAGES[0];

  // If 7000 BDT package is selected, drone is already included!
  const isDroneIncludedInBase = selectedBasePackageId === 'elite-wedding-7000';

  // Calculate costs
  const baseCost = basePackage.pricePerDay * days;
  const droneCost = needDrone && !isDroneIncludedInBase ? 2000 * days : 0;
  const albumCost = needAlbum ? 1500 : 0;
  const fastDeliveryCost = needFastDelivery ? 800 : 0;
  const extraPhotographerCost = needExtraPhotographer ? 1500 * days : 0;

  const grandTotal = baseCost + droneCost + albumCost + fastDeliveryCost + extraPhotographerCost;

  const handlePrint = () => {
    window.print();
  };

  const handleBookNow = () => {
    setShowQuotationModal(false);
    onOpenBookingWithDetails({
      eventType,
      packageId: basePackage.id,
      days,
      totalPrice: grandTotal,
      needDrone: needDrone || isDroneIncludedInBase,
      needAlbum,
      notes: `ক্যালকুলেটর কোটেশন: ${basePackage.name} (${days} দিন), ড্রোন: ${
        needDrone || isDroneIncludedInBase ? 'হ্যাঁ' : 'না'
      }, অ্যালবাম: ${needAlbum ? 'হ্যাঁ' : 'না'}, ফাস্ট ডেলিভারি: ${needFastDelivery ? 'হ্যাঁ' : 'না'}`,
    });
  };

  return (
    <section id="calculator" className="py-24 bg-stone-950 border-b border-stone-800 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-amber-500/5 border border-amber-500/30 text-amber-400 text-[11px] font-mono uppercase tracking-widest mb-3">
            <Calculator className="w-3.5 h-3.5 text-amber-400" />
            <span>BUDGET & QUOTATION CALCULATOR</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-stone-100 tracking-tight mb-4">
            আপনার ইভেন্ট খরচ ও কোটেশন হিসাব করুন
          </h2>
          <p className="text-stone-400 text-sm sm:text-base font-light leading-relaxed">
            দিন, টিম মেম্বার ও সার্ভিস কাস্টমাইজ করে মুহূর্তের মধ্যেই নিখুঁত বাজেট এবং প্রিন্টযোগ্য কোটেশন তৈরি করুন।
          </p>
        </div>

        {/* Main Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Configuration Panel */}
          <div className="lg:col-span-7 bg-stone-900/30 p-6 sm:p-8 border border-stone-800 space-y-6">
            {/* Step 1: Event Type */}
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-stone-400 mb-3">
                ১. ইভেন্টের ধরন নির্বাচন করুন:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  'ওয়েডিং ও রিসেপশন',
                  'গায়ে হলুদ ও মেহেদী',
                  'জন্মদিন ও ফ্যামিলি পার্টি',
                  'কর্পোরেট কনফারেন্স',
                  'সিনেমাটিক রিলস / ফটোশুট',
                  'এনগেজমেন্ট / আকদ'
                ].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setEventType(type)}
                    className={`p-3 text-xs text-left transition-all border ${
                      eventType === type
                        ? 'bg-amber-500/10 border-amber-500 text-amber-300 font-semibold'
                        : 'bg-stone-950 border-stone-800 text-stone-400 hover:border-stone-700 hover:text-stone-200'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Base Package */}
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-stone-400 mb-3">
                ২. বেস প্যাকেজ নির্বাচন করুন (পার ডে রেট):
              </label>
              <div className="space-y-2.5">
                {PACKAGES.map((pkg) => (
                  <div
                    key={pkg.id}
                    onClick={() => setSelectedBasePackageId(pkg.id)}
                    className={`p-4 border cursor-pointer transition-all flex items-center justify-between gap-3 ${
                      selectedBasePackageId === pkg.id
                        ? 'bg-amber-500/5 border-amber-500 shadow-sm'
                        : 'bg-stone-950 border-stone-800 hover:border-stone-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-4 h-4 border flex items-center justify-center ${
                          selectedBasePackageId === pkg.id
                            ? 'border-amber-500 bg-amber-500 text-stone-950'
                            : 'border-stone-600 bg-stone-900'
                        }`}
                      >
                        {selectedBasePackageId === pkg.id && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <div>
                        <p className="text-sm font-serif font-bold text-stone-100 flex items-center gap-2">
                          {pkg.name}
                          {pkg.badge && (
                            <span className="text-[10px] font-mono px-2 py-0.5 bg-amber-500/10 text-amber-400 border border-amber-500/30">
                              {pkg.badge}
                            </span>
                          )}
                        </p>
                        <p className="text-xs text-stone-400 font-light">{pkg.teamSize}</p>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-base font-serif font-bold text-amber-400">
                        ৳{pkg.pricePerDay.toLocaleString('en-US')}
                      </span>
                      <span className="text-[10px] font-mono text-stone-500 block uppercase tracking-wider">/ DAY</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Step 3: Days Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-[11px] font-mono uppercase tracking-wider text-stone-400">
                  ৩. ইভেন্টের মোট দিন সংখ্যা:
                </label>
                <span className="text-xs font-mono font-bold text-amber-400 bg-stone-950 px-3 py-1 border border-stone-800">
                  {days} DAYS ({days} দিন)
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="7"
                value={days}
                onChange={(e) => setDays(Number(e.target.value))}
                className="w-full h-1.5 bg-stone-800 appearance-none cursor-pointer accent-amber-500"
              />
              <div className="flex justify-between text-[10px] font-mono text-stone-500 mt-1.5">
                <span>১ দিন</span>
                <span>২ দিন</span>
                <span>৩ দিন</span>
                <span>৪ দিন</span>
                <span>৫ দিন</span>
                <span>৬ দিন</span>
                <span>৭ দিন</span>
              </div>
            </div>

            {/* Step 4: Add-on Features */}
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-stone-400 mb-3">
                ৪. ঐচ্ছিক অ্যাড-অন সার্ভিস (প্রয়োজনে যুক্ত করুন):
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <label
                  className={`p-3 border flex items-center justify-between cursor-pointer transition-all ${
                    needDrone || isDroneIncludedInBase
                      ? 'bg-amber-500/10 border-amber-500 text-stone-100'
                      : 'bg-stone-950 border-stone-800 text-stone-400 hover:text-stone-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={needDrone || isDroneIncludedInBase}
                      disabled={isDroneIncludedInBase}
                      onChange={(e) => setNeedDrone(e.target.checked)}
                      className="accent-amber-500 w-3.5 h-3.5"
                    />
                    <span className="text-xs font-light">
                      4K এরিয়াল ড্রোন কভারেজ
                      {isDroneIncludedInBase && (
                        <span className="text-[10px] text-amber-400 block font-mono">(৭০০০৳ প্যাকেজে ইনক্লুডেড)</span>
                      )}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-amber-400">
                    {isDroneIncludedInBase ? 'FREE' : '+৳২,০০০/দিন'}
                  </span>
                </label>

                <label
                  className={`p-3 border flex items-center justify-between cursor-pointer transition-all ${
                    needAlbum
                      ? 'bg-amber-500/10 border-amber-500 text-stone-100'
                      : 'bg-stone-950 border-stone-800 text-stone-400 hover:text-stone-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={needAlbum}
                      onChange={(e) => setNeedAlbum(e.target.checked)}
                      className="accent-amber-500 w-3.5 h-3.5"
                    />
                    <span className="text-xs font-light">প্রিমিয়াম লেদার ফটোবুক</span>
                  </div>
                  <span className="text-xs font-mono text-amber-400">+৳১,৫০০</span>
                </label>

                <label
                  className={`p-3 border flex items-center justify-between cursor-pointer transition-all ${
                    needFastDelivery
                      ? 'bg-amber-500/10 border-amber-500 text-stone-100'
                      : 'bg-stone-950 border-stone-800 text-stone-400 hover:text-stone-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={needFastDelivery}
                      onChange={(e) => setNeedFastDelivery(e.target.checked)}
                      className="accent-amber-500 w-3.5 h-3.5"
                    />
                    <span className="text-xs font-light">২৪ ঘণ্টায় এক্সপ্রেস টিজার</span>
                  </div>
                  <span className="text-xs font-mono text-amber-400">+৳৮০০</span>
                </label>

                <label
                  className={`p-3 border flex items-center justify-between cursor-pointer transition-all ${
                    needExtraPhotographer
                      ? 'bg-amber-500/10 border-amber-500 text-stone-100'
                      : 'bg-stone-950 border-stone-800 text-stone-400 hover:text-stone-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={needExtraPhotographer}
                      onChange={(e) => setNeedExtraPhotographer(e.target.checked)}
                      className="accent-amber-500 w-3.5 h-3.5"
                    />
                    <span className="text-xs font-light">অতিরিক্ত সিনেমাটোগ্রাফার</span>
                  </div>
                  <span className="text-xs font-mono text-amber-400">+৳১,৫০০/দিন</span>
                </label>
              </div>
            </div>
          </div>

          {/* Right Summary & Quotation Card */}
          <div className="lg:col-span-5 bg-stone-900/40 p-6 sm:p-8 border-2 border-amber-500/50 shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-stone-800">
              <div>
                <h3 className="text-lg font-serif font-bold text-stone-100">বাজেট সারসংক্ষেপ</h3>
                <p className="text-xs text-stone-400 font-light">{eventType}</p>
              </div>
              <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 bg-amber-500/10 text-amber-400 border border-amber-500/30">
                LIVE ESTIMATE
              </span>
            </div>

            {/* Line items */}
            <div className="space-y-3 text-xs text-stone-300 font-light">
              <div className="flex justify-between items-center">
                <span>বেস প্যাকেজ ({basePackage.name} × {days} দিন):</span>
                <span className="font-mono font-semibold text-stone-100">৳{baseCost.toLocaleString('en-US')}</span>
              </div>

              {droneCost > 0 && (
                <div className="flex justify-between items-center text-amber-400/90">
                  <span>ড্রোন এরিয়াল কভারেজ ({days} দিন):</span>
                  <span className="font-mono font-semibold">৳{droneCost.toLocaleString('en-US')}</span>
                </div>
              )}

              {albumCost > 0 && (
                <div className="flex justify-between items-center text-amber-400/90">
                  <span>প্রিমিয়াম ফটোবুক অ্যালবাম:</span>
                  <span className="font-mono font-semibold">৳{albumCost.toLocaleString('en-US')}</span>
                </div>
              )}

              {fastDeliveryCost > 0 && (
                <div className="flex justify-between items-center text-amber-400/90">
                  <span>২৪ ঘণ্টার এক্সপ্রেস টিজার:</span>
                  <span className="font-mono font-semibold">৳{fastDeliveryCost.toLocaleString('en-US')}</span>
                </div>
              )}

              {extraPhotographerCost > 0 && (
                <div className="flex justify-between items-center text-amber-400/90">
                  <span>অতিরিক্ত ক্রু মেম্বার ({days} দিন):</span>
                  <span className="font-mono font-semibold">৳{extraPhotographerCost.toLocaleString('en-US')}</span>
                </div>
              )}

              <div className="flex justify-between items-center text-emerald-400 pt-1">
                <span>গুগল ড্রাইভ ফুল অ্যাক্সেস ও ক্লাউড স্টোরেজ:</span>
                <span className="font-mono uppercase tracking-wider text-[10px] bg-emerald-500/10 px-2 py-0.5 border border-emerald-500/20">
                  FREE
                </span>
              </div>
            </div>

            {/* Total Display */}
            <div className="pt-4 pb-2 border-t border-stone-800">
              <p className="text-[11px] font-mono uppercase tracking-wider text-stone-500 mb-1">সর্বমোট প্রাক্কলিত খরচ:</p>
              <div className="flex items-baseline justify-between">
                <span className="text-3xl sm:text-4xl font-serif font-bold text-amber-400">
                  ৳{grandTotal.toLocaleString('en-US')}
                </span>
                <span className="text-xs font-mono text-stone-400">({days} DAYS TOTAL)</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-3 pt-2">
              <button
                onClick={handleBookNow}
                className="w-full py-3.5 px-4 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer transition-all"
                id="calc-book-btn"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>এই বাজেটে বুকিং নিশ্চিত করুন</span>
              </button>

              <button
                onClick={() => setShowQuotationModal(true)}
                className="w-full py-3 px-4 bg-transparent hover:bg-stone-800 text-stone-200 font-mono text-xs uppercase tracking-wider border border-stone-700 flex items-center justify-center gap-2 transition-colors cursor-pointer"
                id="calc-view-quote-btn"
              >
                <FileText className="w-3.5 h-3.5 text-amber-400" />
                <span>অফিশিয়াল কোটেশন রসিদ দেখুন ও প্রিন্ট করুন</span>
              </button>
            </div>

            <div className="p-3 bg-stone-950 border border-stone-800 text-[11px] text-stone-400 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
              <span>ওনার ইমন ({OWNER_INFO.phoneDisplay}) দ্বারা ১০০% নিশ্চিত সেবা ও কোয়ালিটি।</span>
            </div>
          </div>
        </div>
      </div>

      {/* Official Quotation Modal / Print View */}
      {showQuotationModal && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <div className="bg-stone-950 text-stone-100 border border-stone-700 max-w-xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowQuotationModal(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-white p-2"
            >
              ✕
            </button>

            <div className="print-area">
              {/* Header */}
              <div className="text-center pb-6 border-b border-stone-800">
                <h3 className="text-2xl font-serif font-bold text-white">এলাইভ ইভেন্ট</h3>
                <p className="text-xs text-amber-400 uppercase tracking-widest font-mono">ALIVE EVENT STUDIO</p>
                <p className="text-xs text-stone-400 mt-1">
                  ফটোগ্রাফি ও সিনেমাটোগ্রাফি • ওনার: {OWNER_INFO.name} ({OWNER_INFO.phoneDisplay})
                </p>
                <p className="text-[10px] font-mono text-stone-500">{OWNER_INFO.email} • সমগ্র বাংলাদেশ</p>
              </div>

              {/* Quotation Details */}
              <div className="py-4 space-y-2 text-xs border-b border-stone-800 font-light">
                <div className="flex justify-between">
                  <span className="text-stone-400">তারিখ:</span>
                  <span className="font-mono">{new Date().toLocaleDateString('bn-BD')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">ইভেন্টের ধরন:</span>
                  <span className="font-semibold text-white">{eventType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">মোট দিন:</span>
                  <span className="font-semibold text-white font-mono">{days} দিন</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">নির্বাচিত প্যাকেজ:</span>
                  <span className="font-semibold text-amber-300">{basePackage.name}</span>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="py-4 space-y-2 text-xs border-b border-stone-800 font-light">
                <div className="flex justify-between">
                  <span>বেস প্যাকেজ ({days} দিন × ৳{basePackage.pricePerDay}):</span>
                  <span className="font-mono">৳{baseCost.toLocaleString('en-US')}</span>
                </div>
                {droneCost > 0 && (
                  <div className="flex justify-between">
                    <span>4K এরিয়াল ড্রোন কভারেজ:</span>
                    <span className="font-mono">৳{droneCost.toLocaleString('en-US')}</span>
                  </div>
                )}
                {albumCost > 0 && (
                  <div className="flex justify-between">
                    <span>প্রিমিয়াম ফটোবুক অ্যালবাম:</span>
                    <span className="font-mono">৳{albumCost.toLocaleString('en-US')}</span>
                  </div>
                )}
                {fastDeliveryCost > 0 && (
                  <div className="flex justify-between">
                    <span>২৪ ঘণ্টার এক্সপ্রেস টিজার:</span>
                    <span className="font-mono">৳{fastDeliveryCost.toLocaleString('en-US')}</span>
                  </div>
                )}
                {extraPhotographerCost > 0 && (
                  <div className="flex justify-between">
                    <span>অতিরিক্ত ক্রু মেম্বার:</span>
                    <span className="font-mono">৳{extraPhotographerCost.toLocaleString('en-US')}</span>
                  </div>
                )}
                <div className="flex justify-between text-emerald-400">
                  <span>গুগল ড্রাইভ হাই-স্পিড আনলিমিটেড অ্যাক্সেস:</span>
                  <span className="font-mono font-bold">বিনামূল্যে (০৳)</span>
                </div>
              </div>

              {/* Grand Total */}
              <div className="py-4 flex justify-between items-center text-sm font-bold border-b border-stone-800">
                <span className="font-serif">সর্বমোট প্রাক্কলিত বিল:</span>
                <span className="text-2xl text-amber-400 font-serif">৳{grandTotal.toLocaleString('en-US')}</span>
              </div>

              <div className="pt-4 text-[11px] text-stone-400 font-light leading-relaxed">
                * এই কোটেশনটি এলাইভ ইভেন্ট সিস্টেম থেকে স্বয়ংক্রিয়ভাবে তৈরি হয়েছে। বুকিং চূড়ান্ত করতে অগ্রিম ২০% বুকিং মানি প্রযোজ্য।
              </div>
            </div>

            {/* Modal Actions */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <button
                onClick={handlePrint}
                className="flex-1 py-3 bg-stone-900 hover:bg-stone-800 text-stone-200 font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 border border-stone-700"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>প্রিন্ট / সেভ করুন</span>
              </button>
              <button
                onClick={handleBookNow}
                className="flex-1 py-3 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>বুকিং এগিয়ে নিন</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
