import React, { useState } from 'react';
import { PORTFOLIO_ITEMS } from '../data';
import { PortfolioItem } from '../types';
import { Play, Sparkles, X, Eye } from 'lucide-react';

export const PortfolioGallery: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeModalItem, setActiveModalItem] = useState<PortfolioItem | null>(null);

  const categories = [
    { id: 'all', label: 'সকল কাজ (ALL)' },
    { id: 'wedding', label: 'ওয়েডিং ও কাপল' },
    { id: 'haldi', label: 'গায়ে হলুদ ও উৎসব' },
    { id: 'cinematic', label: 'সিনেমাটোগ্রাফি ও ড্রোন' },
    { id: 'birthday', label: 'বার্থডে ও পার্টি' },
    { id: 'corporate', label: 'কর্পোরেট ও রিলস' },
  ];

  const filteredItems = activeCategory === 'all'
    ? PORTFOLIO_ITEMS
    : PORTFOLIO_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <section id="portfolio" className="py-24 bg-stone-950 border-b border-stone-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-amber-500/5 border border-amber-500/30 text-amber-400 text-[11px] font-mono uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>CURATED WORKS & ARCHIVE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-stone-100 tracking-tight mb-4">
            নান্দনিক পোর্টফোলিও গ্যালারি
          </h2>
          <p className="text-stone-400 text-sm sm:text-base font-light leading-relaxed">
            আমাদের সম্পন্ন করা বিভিন্ন ওয়েডিং, গায়ে হলুদ ও কর্পোরেট ইভেন্টের রিয়েল ফটোগ্রাফি ও সিনেমাটোগ্রাফি কাজ দেখুন।
          </p>

          {/* Filter Pills */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 text-xs font-mono uppercase tracking-wider transition-all cursor-pointer border ${
                  activeCategory === cat.id
                    ? 'bg-amber-500 text-stone-950 font-bold border-amber-500 shadow-sm'
                    : 'bg-stone-900/40 text-stone-400 hover:text-stone-100 hover:bg-stone-800 border-stone-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveModalItem(item)}
              className="group relative bg-stone-900/20 border border-stone-800 hover:border-amber-500/60 shadow-lg cursor-pointer transition-all duration-300 hover:-translate-y-1"
              id={`portfolio-card-${item.id}`}
            >
              {/* Image with zoom effect */}
              <div className="aspect-[4/3] w-full overflow-hidden bg-stone-950 relative">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent opacity-80 group-hover:opacity-50 transition-opacity" />

                {/* Top Category Badge */}
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-0.5 bg-stone-950 text-[10px] font-mono uppercase tracking-widest text-amber-400 border border-amber-500/30">
                    {item.categoryLabel}
                  </span>
                </div>

                {/* Video Indicator */}
                {item.videoUrl && (
                  <div className="absolute top-3 right-3 w-8 h-8 bg-amber-500 flex items-center justify-center text-stone-950 shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-3.5 h-3.5 fill-stone-950 ml-0.5" />
                  </div>
                )}

                {/* Hover Quick View Center Icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <span className="px-4 py-2 bg-stone-950 text-amber-300 text-xs font-mono uppercase tracking-wider border border-amber-500/60 flex items-center gap-2 shadow-xl">
                    <Eye className="w-3.5 h-3.5" />
                    <span>বিস্তারিত প্রিভিউ</span>
                  </span>
                </div>
              </div>

              {/* Card Footer Info */}
              <div className="p-5">
                <h3 className="text-base font-serif font-bold text-stone-100 group-hover:text-amber-400 transition-colors mb-1.5">
                  {item.title}
                </h3>
                <p className="text-xs text-stone-400 font-light line-clamp-2 mb-3 leading-relaxed">
                  {item.description}
                </p>
                <div className="flex items-center justify-between text-[11px] font-mono text-stone-500 pt-3 border-t border-stone-800">
                  <span>ক্লায়েন্ট: <strong className="text-stone-300 font-normal">{item.client}</strong></span>
                  <span>{item.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox / Video Modal */}
      {activeModalItem && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <div className="bg-stone-950 border border-stone-800 max-w-3xl w-full p-5 sm:p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setActiveModalItem(null)}
              className="absolute top-4 right-4 text-stone-400 hover:text-white p-1.5 bg-stone-900 border border-stone-800 z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-4">
              {/* Media viewer */}
              {activeModalItem.videoUrl ? (
                <div className="aspect-video overflow-hidden bg-black border border-stone-800">
                  <video
                    src={activeModalItem.videoUrl}
                    controls
                    autoPlay
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="aspect-[16/10] overflow-hidden bg-black border border-stone-800">
                  <img
                    src={activeModalItem.imageUrl}
                    alt={activeModalItem.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Meta Info */}
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="px-2.5 py-0.5 bg-amber-500/10 text-amber-400 text-[10px] font-mono uppercase tracking-widest border border-amber-500/30">
                    {activeModalItem.categoryLabel}
                  </span>
                  <span className="text-xs font-mono text-stone-400">• {activeModalItem.date}</span>
                </div>
                <h3 className="text-2xl font-serif font-bold text-stone-100">{activeModalItem.title}</h3>
                <p className="text-sm text-stone-300 font-light mt-2 leading-relaxed">
                  {activeModalItem.description}
                </p>
                <p className="text-xs font-mono text-stone-400 mt-2">
                  সম্মানিত গ্রাহক: <strong className="text-amber-400 font-normal">{activeModalItem.client}</strong>
                </p>
              </div>

              {/* Callout */}
              <div className="p-4 bg-stone-900/40 border border-amber-500/30 text-xs text-amber-300 flex items-center justify-between flex-wrap gap-2">
                <span className="font-light">এই ধরণের ইভেন্ট কভারেজের জন্য পার ডে রেট ১৫০০৳ থেকে ৭০০০৳</span>
                <a
                  href={`https://wa.me/8801788055586?text=${encodeURIComponent(
                    `আসসালামু আলাইকুম ইমন ভাই, আমি আপনাদের '${activeModalItem.title}' কাজের মতো আমার ইভেন্টের জন্য বুকিং করতে চাই।`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs uppercase tracking-widest"
                >
                  হোয়াটসঅ্যাপে কথা বলুন
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
