import React, { useState, useEffect } from 'react';
import { X, Calendar, User, Phone, MapPin, Sparkles, CheckCircle2, MessageCircle, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PACKAGES, OWNER_INFO } from '../data';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPackageId?: string;
  initialDetails?: {
    eventType: string;
    packageId: string;
    days: number;
    totalPrice: number;
    needDrone: boolean;
    needAlbum: boolean;
    notes: string;
  } | null;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialPackageId,
  initialDetails,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventType, setEventType] = useState('ওয়েডিং ও রিসেপশন');
  const [packageId, setPackageId] = useState('starter-video-1500');
  const [days, setDays] = useState(1);
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [successBooking, setSuccessBooking] = useState<any | null>(null);

  useEffect(() => {
    if (initialDetails) {
      setEventType(initialDetails.eventType);
      setPackageId(initialDetails.packageId);
      setDays(initialDetails.days);
      setNotes(initialDetails.notes);
    } else if (initialPackageId) {
      setPackageId(initialPackageId);
    }
  }, [initialPackageId, initialDetails, isOpen]);

  const selectedPkg = PACKAGES.find((p) => p.id === packageId) || PACKAGES[0];
  const calculatedTotal = initialDetails?.totalPrice || selectedPkg.pricePerDay * days;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      alert('অনুগ্রহ করে আপনার নাম ও মোবাইল নম্বর প্রদান করুন।');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          date: eventDate,
          days,
          packageType: selectedPkg.name,
          totalPrice: calculatedTotal,
          notes: `${eventType} | লোকেশন: ${eventLocation} | ${notes}`,
        }),
      });

      const data = await res.json();
      if (data.success && data.booking) {
        setSuccessBooking(data.booking);
        // Trigger celebratory confetti
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#f59e0b', '#fbbf24', '#d97706', '#ffffff'],
        });
      }
    } catch (err) {
      alert('বুকিং রিকোয়েস্ট পাঠাতে সমস্যা হয়েছে। দয়া করে সরাসরি কল করুন: ০১৭৮৮০৫৫৫৮৬');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setSuccessBooking(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-stone-950 border border-stone-800 max-w-lg w-full p-6 sm:p-8 shadow-2xl relative my-8">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-stone-400 hover:text-white p-1.5 bg-stone-900 border border-stone-800 transition-colors"
          id="btn-close-booking-modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!successBooking ? (
          <div>
            {/* Modal Header */}
            <div className="text-center pb-6 border-b border-stone-800 mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/5 border border-amber-500/30 text-amber-400 text-[10px] font-mono uppercase tracking-widest mb-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>OFFICIAL RESERVATION FORM</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-stone-100">ইভেন্টের তারিখ বুকিং করুন</h3>
              <p className="text-xs font-mono text-stone-400 mt-1">
                LEAD: {OWNER_INFO.nameEn} • {OWNER_INFO.phoneDisplay} • ৳১,৫০০ - ৳৭,০০০/দিন
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-stone-300 mb-1">
                    আপনার পূর্ণ নাম <span className="text-amber-400">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="যেমন: তানভীর আহমেদ"
                      className="w-full pl-9 pr-3 py-2.5 bg-stone-900 text-stone-100 text-xs border border-stone-800 focus:outline-none focus:border-amber-500 font-serif"
                      id="booking-name-input"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-stone-300 mb-1">
                    মোবাইল নম্বর <span className="text-amber-400">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="01XXXXXXXXX"
                      className="w-full pl-9 pr-3 py-2.5 bg-stone-900 text-stone-100 text-xs border border-stone-800 focus:outline-none focus:border-amber-500 font-mono"
                      id="booking-phone-input"
                    />
                  </div>
                </div>
              </div>

              {/* Event Date & Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-stone-300 mb-1">
                    ইভেন্টের তারিখ <span className="text-amber-400">*</span>
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="date"
                      required
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 bg-stone-900 text-stone-100 text-xs border border-stone-800 focus:outline-none focus:border-amber-500 font-mono"
                      id="booking-date-input"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-stone-300 mb-1">
                    ইভেন্টের লোকেশন/ভেন্যু
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={eventLocation}
                      onChange={(e) => setEventLocation(e.target.value)}
                      placeholder="যেমন: কুষ্টিয়া সদর / ধানমন্ডি, ঢাকা"
                      className="w-full pl-9 pr-3 py-2.5 bg-stone-900 text-stone-100 text-xs border border-stone-800 focus:outline-none focus:border-amber-500 font-serif"
                      id="booking-location-input"
                    />
                  </div>
                </div>
              </div>

              {/* Package Selection */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-stone-300 mb-1">
                  প্যাকেজ নির্বাচন করুন:
                </label>
                <select
                  value={packageId}
                  onChange={(e) => setPackageId(e.target.value)}
                  className="w-full px-3 py-2.5 bg-stone-900 text-stone-100 text-xs border border-stone-800 focus:outline-none focus:border-amber-500 font-serif"
                  id="booking-package-select"
                >
                  {PACKAGES.map((pkg) => (
                    <option key={pkg.id} value={pkg.id}>
                      {pkg.name} — ৳{pkg.pricePerDay.toLocaleString('en-US')}/দিন ({pkg.teamSize})
                    </option>
                  ))}
                </select>
              </div>

              {/* Event Type & Days */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-stone-300 mb-1">
                    ইভেন্টের ধরন:
                  </label>
                  <select
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value)}
                    className="w-full px-3 py-2.5 bg-stone-900 text-stone-100 text-xs border border-stone-800 focus:outline-none focus:border-amber-500 font-serif"
                  >
                    <option value="ওয়েডিং ও রিসেপশন">ওয়েডিং ও রিসেপশন</option>
                    <option value="গায়ে হলুদ ও মেহেদী">গায়ে হলুদ ও মেহেদী</option>
                    <option value="জন্মদিন ও ফ্যামিলি পার্টি">জন্মদিন ও ফ্যামিলি পার্টি</option>
                    <option value="কর্পোরেট কনফারেন্স">কর্পোরেট কনফারেন্স</option>
                    <option value="সিনেমাটিক রিলস ও মডেল শুট">সিনেমাটিক রিলস ও মডেল শুট</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-stone-300 mb-1">
                    দিন সংখ্যা:
                  </label>
                  <select
                    value={days}
                    onChange={(e) => setDays(Number(e.target.value))}
                    className="w-full px-3 py-2.5 bg-stone-900 text-stone-100 text-xs border border-stone-800 focus:outline-none focus:border-amber-500 font-mono"
                  >
                    <option value={1}>১ দিন</option>
                    <option value={2}>২ দিন</option>
                    <option value={3}>৩ দিন</option>
                    <option value={4}>৪ দিন</option>
                    <option value={5}>৫ দিন</option>
                  </select>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-stone-300 mb-1">
                  কোন বিশেষ অনুরোধ বা নোট (ঐচ্ছিক):
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={2}
                  placeholder="যেমন: ড্রোন শুট দরকার, নির্দিষ্ট গান পছন্দ ইত্যাদি..."
                  className="w-full p-2.5 bg-stone-900 text-stone-100 text-xs border border-stone-800 focus:outline-none focus:border-amber-500 font-serif"
                />
              </div>

              {/* Total Summary */}
              <div className="p-4 bg-stone-900/40 border border-amber-500/40 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-stone-400">প্রাক্কলিত মোট বাজেট:</span>
                  <p className="text-xl font-serif font-bold text-amber-400">
                    ৳{calculatedTotal.toLocaleString('en-US')}
                  </p>
                </div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2.5 py-1 border border-emerald-500/30">
                  ✓ গুগল ড্রাইভ অ্যাক্সেস ফ্রি
                </span>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-50"
                id="btn-confirm-booking"
              >
                {loading ? (
                  <span>প্রসেস হচ্ছে...</span>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>বুকিং রিকোয়েস্ট জমা দিন</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>
          </div>
        ) : (
          /* Success Screen */
          <div className="text-center py-4 space-y-5">
            <div className="w-14 h-14 border border-emerald-500 flex items-center justify-center text-emerald-400 mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="px-3 py-1 bg-amber-500/10 text-amber-400 font-mono text-xs font-bold border border-amber-500/30">
                বুকিং আইডি: {successBooking.id}
              </span>
              <h3 className="text-2xl font-serif font-bold text-stone-100 mt-3">
                বুকিং রিকোয়েস্ট সফলভাবে সম্পন্ন হয়েছে!
              </h3>
              <p className="text-xs text-stone-300 font-light mt-2 leading-relaxed max-w-sm mx-auto">
                ধন্যবাদ <strong className="text-stone-100 font-semibold">{successBooking.name}</strong>। ওনার{' '}
                <strong className="text-amber-400 font-semibold">ইমন ভাই</strong> শীঘ্রই আপনার সাথে ফোনে যোগাযোগ করে শিডিউল কনফার্ম করবেন।
              </p>
            </div>

            <div className="p-4 bg-stone-900/30 border border-stone-800 text-xs font-mono text-left space-y-2">
              <div className="flex justify-between">
                <span className="text-stone-400">ইভেন্টের তারিখ:</span>
                <span className="text-stone-200">{successBooking.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">প্যাকেজ:</span>
                <span className="text-amber-400">{successBooking.packageType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">মোট দিন:</span>
                <span className="text-stone-200">{successBooking.days} দিন</span>
              </div>
              <div className="flex justify-between border-t border-stone-800 pt-2 font-bold text-sm">
                <span>মোট হিসাব:</span>
                <span className="text-amber-400 font-serif">৳{successBooking.totalPrice.toLocaleString('en-US')}</span>
              </div>
            </div>

            {/* Direct WhatsApp Notify Imon */}
            <div className="space-y-2 pt-2">
              <a
                href={`https://wa.me/8801788055586?text=${encodeURIComponent(
                  `আসসালামু আলাইকুম ইমন ভাই, আমি মাত্র এলাইভ ইভেন্ট ওয়েবসাইটে বুকিং দিয়েছি। বুকিং আইডি: ${successBooking.id} | নাম: ${successBooking.name} | প্যাকেজ: ${successBooking.packageType} | তারিখ: ${successBooking.date}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>ইমন ভাইকে হোয়াটসঅ্যাপে মেসেজ দিন</span>
              </a>

              <button
                onClick={handleClose}
                className="w-full py-2.5 bg-stone-900 hover:bg-stone-800 text-stone-300 text-xs font-mono uppercase tracking-wider border border-stone-800"
              >
                সম্পন্ন ও বন্ধ করুন
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
