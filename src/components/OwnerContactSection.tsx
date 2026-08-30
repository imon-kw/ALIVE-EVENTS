import React from 'react';
import { OWNER_INFO, GEAR_LIST, TESTIMONIALS } from '../data';
import { Phone, MessageCircle, Mail, MapPin, Award, CheckCircle, Star, Sparkles, Camera, ShieldCheck, Heart } from 'lucide-react';

interface OwnerContactSectionProps {
  onOpenBooking: () => void;
  onOpenChat: () => void;
}

export const OwnerContactSection: React.FC<OwnerContactSectionProps> = ({ onOpenBooking, onOpenChat }) => {
  return (
    <section id="contact" className="py-24 bg-stone-950 relative border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-amber-500/5 border border-amber-500/30 text-amber-400 text-[11px] font-mono uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>LEADERSHIP & ASSURANCE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-stone-100 tracking-tight mb-4">
            ওনার পরিচিতি ও সরাসরি যোগাযোগ
          </h2>
          <p className="text-stone-400 text-sm sm:text-base font-light leading-relaxed">
            আপনার স্পেশাল মুহূর্তকে নিখুঁতভাবে ফ্রেমবন্দী করতে এলাইভ ইভেন্ট সবসময় প্রতিশ্রুতিবদ্ধ।
          </p>
        </div>

        {/* Owner Profile & Contact Card Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-center">
          {/* Owner Bio Card */}
          <div className="lg:col-span-6 bg-stone-900/30 p-6 sm:p-8 border border-amber-500/40 shadow-2xl relative overflow-hidden">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 mb-6">
              <div className="relative">
                <div className="w-24 h-24 sm:w-28 sm:h-28 border border-amber-500/50 p-1">
                  <div className="w-full h-full bg-stone-950 flex items-center justify-center overflow-hidden">
                    <Camera className="w-10 h-10 text-amber-400" />
                  </div>
                </div>
                <div className="absolute -bottom-2 -right-2 px-2 py-0.5 bg-amber-500 text-stone-950 text-[9px] font-mono font-bold uppercase tracking-widest">
                  FOUNDER
                </div>
              </div>

              <div className="text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <h3 className="text-2xl font-serif font-bold text-stone-100">{OWNER_INFO.name}</h3>
                  <span className="text-xs font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 border border-amber-500/20">
                    {OWNER_INFO.nameEn}
                  </span>
                </div>
                <p className="text-sm font-serif font-semibold text-amber-400 mt-1">
                  {OWNER_INFO.title}
                </p>
                <p className="text-xs font-mono text-stone-400 mt-2 flex items-center justify-center sm:justify-start gap-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-500" />
                  {OWNER_INFO.location}
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed mb-6">
              "আমি বিশ্বাস করি প্রতিটি উৎসব এবং স্মৃতির নিজস্ব এক আবেগ থাকে। এলাইভ ইভেন্টে আমরা কেবল ছবি বা ভিডিও ধারণ করি না, বরং একটি গল্পের মতো সিনেমাটোগ্রাফি ফুটিয়ে তুলি। সর্বনিম্ন ১৫০০ টাকার ভিডিওগ্রাফি ও এডিটিং থেকে শুরু করে ৭০০০ টাকার মেগা প্যাকেজ—যেকোনো সেবার জন্য আমি ব্যক্তিগতভাবে যত্নশীল।"
            </p>

            <div className="grid grid-cols-3 gap-2 py-4 border-y border-stone-800 text-center">
              <div>
                <p className="text-lg font-serif font-bold text-amber-400">৮+ বছর</p>
                <p className="text-[10px] font-mono uppercase tracking-wider text-stone-500">ফিল্ড অভিজ্ঞতা</p>
              </div>
              <div>
                <p className="text-lg font-serif font-bold text-amber-400">৫৫০+</p>
                <p className="text-[10px] font-mono uppercase tracking-wider text-stone-500">সফল ইভেন্ট</p>
              </div>
              <div>
                <p className="text-lg font-serif font-bold text-amber-400">৪.৯ ★</p>
                <p className="text-[10px] font-mono uppercase tracking-wider text-stone-500">ক্লায়েন্ট রেটিং</p>
              </div>
            </div>

            {/* Direct Contact Buttons */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <a
                href={`tel:${OWNER_INFO.phone}`}
                className="flex-1 py-3 px-4 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 text-center transition-all"
                id="owner-call-btn"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>সরাসরি কল: {OWNER_INFO.phoneDisplay}</span>
              </a>

              <a
                href={OWNER_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-4 bg-transparent hover:bg-stone-800 text-stone-200 border border-stone-700 font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 text-center transition-all"
                id="owner-whatsapp-btn"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>হোয়াটসঅ্যাপে চ্যাট</span>
              </a>
            </div>
          </div>

          {/* Quick Contact & Studio Guarantees */}
          <div className="lg:col-span-6 space-y-4">
            <div className="p-6 sm:p-7 bg-stone-900/20 border border-stone-800 space-y-4">
              <h4 className="text-base font-serif font-bold text-stone-100 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                কেন 'এলাইভ ইভেন্ট' বেছে নেবেন?
              </h4>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                    <CheckCircle className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h5 className="text-xs font-serif font-bold text-stone-200">বাজেট-ফ্রেন্ডলি ফ্লেক্সিবিলিটি</h5>
                    <p className="text-[11px] text-stone-400 font-light leading-relaxed">
                      ১৫০০ টাকা থেকে ৭০০০ টাকা পার ডে প্যাকেজের স্পষ্ট হিসাব, কোনো গোপন বা অতিরিক্ত চার্জ নেই।
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                    <CheckCircle className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h5 className="text-xs font-serif font-bold text-stone-200">নিশ্চিত গুগল ড্রাইভ ডেলিভারি</h5>
                    <p className="text-[11px] text-stone-400 font-light leading-relaxed">
                      ইভেন্ট শেষ হওয়ার পর হাই-স্পিড গুগল ড্রাইভ ফোল্ডারে আজীবন অ্যাক্সেস সহ সব ফাইল ডেলিভারি।
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                    <CheckCircle className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h5 className="text-xs font-serif font-bold text-stone-200">প্রফেশনাল গিয়ার ও ব্যাকআপ টিম</h5>
                    <p className="text-[11px] text-stone-400 font-light leading-relaxed">
                      Sony 4K ক্যামেরা, DJI ড্রোন, ওয়্যারলেস মাইক ও ব্যাকআপ মেমোরি দিয়ে শুটের শতভাগ নিরাপত্তা।
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 flex gap-3">
                <button
                  onClick={onOpenBooking}
                  className="flex-1 py-3 bg-stone-900 hover:bg-stone-800 text-stone-200 font-mono text-xs uppercase tracking-wider border border-stone-700 hover:border-amber-500/40 transition-colors"
                >
                  বুকিং রিকোয়েস্ট
                </button>
                <button
                  onClick={onOpenChat}
                  className="flex-1 py-3 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 font-mono text-xs uppercase tracking-wider border border-amber-500/30 transition-colors"
                >
                  AI অ্যাসিস্ট্যান্ট
                </button>
              </div>
            </div>

            {/* Direct Information Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-4 bg-stone-900/20 border border-stone-800 flex items-center gap-3">
                <div className="w-9 h-9 bg-stone-950 border border-stone-800 flex items-center justify-center text-amber-400 shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-wider text-stone-500">হটলাইন নম্বর</p>
                  <a href={`tel:${OWNER_INFO.phone}`} className="text-xs font-mono font-bold text-stone-200 hover:text-amber-400">
                    {OWNER_INFO.phoneDisplay}
                  </a>
                </div>
              </div>

              <div className="p-4 bg-stone-900/20 border border-stone-800 flex items-center gap-3">
                <div className="w-9 h-9 bg-stone-950 border border-stone-800 flex items-center justify-center text-amber-400 shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-wider text-stone-500">অফিশিয়াল ইমেইল</p>
                  <a href={`mailto:${OWNER_INFO.email}`} className="text-xs font-mono text-stone-200 hover:text-amber-400">
                    {OWNER_INFO.email}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Gear Showcase */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-xl font-serif font-bold text-stone-100">আমাদের ব্যবহৃত প্রফেশনাল ইকুইপমেন্ট ও প্রযুক্তি</h3>
            <p className="text-xs font-mono text-stone-400 mt-1 uppercase tracking-wider">CINE-GRADE PRODUCTION GEAR</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {GEAR_LIST.map((gear, idx) => (
              <div key={idx} className="p-4 bg-stone-900/20 border border-stone-800 text-center hover:border-amber-500/40 transition-colors">
                <p className="text-xs font-serif font-bold text-stone-200 mb-1">{gear.name}</p>
                <p className="text-[10px] font-mono text-stone-500">{gear.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Client Testimonials */}
        <div>
          <div className="text-center mb-8">
            <h3 className="text-2xl font-serif font-bold text-stone-100">সম্মানিত গ্রাহকদের মতামত</h3>
            <p className="text-xs text-stone-400 font-light mt-1">৫৫০+ সফল ইভেন্টের কিছু মুগ্ধকর রিভিউ</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div key={t.id} className="p-6 bg-stone-900/20 border border-stone-800 hover:border-amber-500/30 shadow-lg flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1 text-amber-400 mb-3">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed italic mb-4">
                    "{t.comment}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-stone-800">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-10 h-10 object-cover border border-amber-500/30"
                  />
                  <div>
                    <h4 className="text-xs font-serif font-bold text-stone-100">{t.name}</h4>
                    <p className="text-[10px] font-mono text-amber-400/90">{t.eventType}</p>
                    <p className="text-[10px] font-mono text-stone-500">{t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
