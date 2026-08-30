import { PackageItem, PortfolioItem, Testimonial } from './types';

export const OWNER_INFO = {
  name: 'ইমন',
  nameEn: 'Imon',
  title: 'প্রতিষ্ঠাতা ও চিফ সিনেমাটোগ্রাফার',
  titleEn: 'Founder & Chief Cinematographer',
  phone: '01788055586',
  phoneDisplay: '০১৭৮৮০৫৫৫৮৬',
  email: 'imon.kushtia@gmail.com',
  whatsappUrl: 'https://wa.me/8801788055586?text=%E0%A6%86%E0%A6%B8%E0%A6%B8%E0%A6%BE%E0%A6%B2%E0%A6%BE%E0%A6%AE%E0%A7%81%20%E0%A6%86%E0%A6%B2%E0%A6%BE%E0%A6%87%E0%A6%95%E0%A7%81%E0%A6%AE%2C%20%E0%A6%8F%E0%A6%B2%E0%A6%BE%E0%A6%87%E0%A6%AD%20%E0%A6%87%E0%A6%AD%E0%A7%87%E0%A6%A8%E0%A7%8D%E0%A6%9F%20%E0%A6%8F%E0%A6%B0%20%E0%A6%AA%E0%A7%8D%E0%A6%AF%E0%A6%BE%E0%A6%95%E0%A7%87%E0%A6%9C%20%E0%A6%AC%E0%A6%BE%E0%A6%AC%E0%A6%A6%E0%A7%87%20%E0%A6%95%E0%A6%A5%E0%A6%BE%20%E0%A6%AC%E0%A6%B2%E0%A6%A4%E0%A7%87%20%E0%A6%9A%E0%A6%BE%E0%A6%87%E0%A5%A4',
  location: 'কুষ্টিয়া ও ঢাকা (সমগ্র বাংলাদেশে সার্ভিস প্রদান করা হয়)',
  experience: '৮+ বছরের অভিজ্ঞতা',
  completedEvents: '৫৫০+ সফল ইভেন্ট',
  rating: '৪.৯ / ৫.০ স্টার',
};

export const PACKAGES: PackageItem[] = [
  {
    id: 'starter-video-1500',
    name: 'বেসিক ভিডিওগ্রাফি ও এডিটিং',
    nameEn: 'Starter Videography & Editing',
    pricePerDay: 1500,
    badge: 'সর্বনিম্ন বাজেট সেরা ডিল',
    isLowest: true,
    description: 'পার ডে ১৫০০ টাকায় ফুল ইভেন্ট ভিডিওগ্রাফি কভারেজ এবং প্রফেশনাল সিনেমাটিক ভিডিও এডিটিং। ছোট ও মাঝারি অনুষ্ঠানের জন্য আদর্শ।',
    descriptionEn: 'Full event videography coverage and professional video editing at just 1500 BDT/day. Ideal for small to mid-sized events.',
    teamSize: '১ জন প্রফেশনাল ভিডিওগ্রাফার',
    deliverables: [
      'সম্পূর্ণ ইভেন্ট ভিডিওগ্রাফি (ফুল ডে কভারেজ)',
      'প্রফেশনাল কালার গ্রেডেড ভিডিও এডিটিং',
      '১টি সিনেমাটিক শর্ট রিলস / হাইলাইটস ভিডিও (Reels/TikTok ready)',
      'গুগল ড্রাইভ হাই-স্পিড ডাউনলোড অ্যাক্সেস',
      '২৪ থেকে ৪৮ ঘণ্টার মধ্যে ফার্স্ট ড্রাফট ডেলিভারি'
    ],
    features: [
      'ফুল এইচডি ১০৮০p ভিডিও রেকর্ডিং',
      'প্রফেশনাল জিম্বল স্ট্যাবিলাইজেশন',
      'ভিডিও এডিটিং ও ব্যাকগ্রাউন্ড মিউজিক সিঙ্ক',
      'গুগল ড্রাইভ আনলিমিটেড ক্লাউড স্টোরেজ'
    ],
    featuresEn: [
      'Full HD 1080p Video Recording',
      'Gimbal Stabilization',
      'Video Editing with Sync Music',
      'Google Drive Cloud Access'
    ]
  },
  {
    id: 'standard-event-3000',
    name: 'স্ট্যান্ডার্ড ইভেন্ট স্পেশাল',
    nameEn: 'Standard Event Special',
    pricePerDay: 3000,
    badge: 'জনপ্রিয় চয়েস',
    description: 'বার্থডে, গায়ে হলুদ, ঘরোয়া এনগেজমেন্ট বা করপোরেট কনফারেন্সের জন্য ডেডিকেটেড ফটোগ্রাফি ও ভিডিও ক্লিপস এডিটিং সার্ভিস।',
    descriptionEn: 'Dedicated photography with editing clips for birthdays, haldi, home engagements, or corporate meets.',
    teamSize: '১ জন সিনেমাটোগ্রাফার / ফটোগ্রাফার',
    deliverables: [
      'আনলিমিটেড হাই-রেজোলিউশন ফটোশুট',
      '১০০+ কালার কারেক্টেড ও রিটাচড ছবি',
      '৩-৫ মিনিটের সিনেমাটিক হাইলাইটস ভিডিও',
      'গুগল ড্রাইভ ফুল রেজোলিউশন অ্যাক্সেস'
    ],
    features: [
      'Sony Alpha 4K সিরিজ ক্যামেরা সাপোর্ট',
      'পোর্টেবল স্টুডিও লাইটিং সেটআপ',
      'প্রফেশনাল স্কিন রিটাচিং ও কালার গ্রেডিং',
      'গুগল ড্রাইভে ইনস্ট্যান্ট প্রিভিউ লিংক'
    ],
    featuresEn: [
      'Sony 4K Camera Series',
      'Portable Studio Lighting',
      'Professional Skin Retouching',
      'Instant Google Drive Preview'
    ]
  },
  {
    id: 'combo-event-5000',
    name: 'গায়ে হলুদ ও রিসেপশন কম্বো',
    nameEn: 'Haldi & Reception Combo',
    pricePerDay: 5000,
    badge: 'কম্বো স্পেশাল',
    description: 'ফটোগ্রাফি এবং ভিডিওগ্রাফির পারফেক্ট কম্বিনেশন। ২ জন দক্ষ ক্রু মেম্বারের নিখুঁত কভারেজ ও হাইলাইটস ভিডিও।',
    descriptionEn: 'The perfect combination of photography and videography with 2 skilled crew members.',
    teamSize: '২ জন ক্রু (১ ফটোগ্রাফার + ১ ভিডিওগ্রাফার)',
    deliverables: [
      'আনলিমিটেড ফটো ক্লিক ও র-ফাইলস',
      '২০০+ প্রিমিয়াম এডিটেড ফটো',
      '৪-৭ মিনিটের মাস্টার সিনেমাটিক ভিডিও',
      'সোশ্যাল মিডিয়া টিজার / রিলস (২টি)',
      'গুগল ড্রাইভে আজীবন সংরক্ষিত ফোল্ডার'
    ],
    features: [
      'ফটোগ্রাফি + ভিডিওগ্রাফি ডাবল কভারেজ',
      'রোদে ওয়্যারলেস স্টুডিও সাউন্ড রেকর্ডিং',
      'প্রিমিয়াম কালার গ্রেডিং ও লাইটিং গিয়ার',
      'গুগল ড্রাইভ ওয়ান-ক্লিক শেয়ারেবল লিঙ্ক'
    ],
    featuresEn: [
      'Dual Coverage (Photo + Video)',
      'Rode Wireless Pro Audio',
      'Cinematic Color Tone',
      'One-Click Google Drive Share'
    ]
  },
  {
    id: 'elite-wedding-7000',
    name: 'মেগা ওয়েডিং ও এলিট সিনেমাটোগ্রাফি',
    nameEn: 'Elite 7K Mega Wedding Package',
    pricePerDay: 7000,
    badge: 'সর্বোচ্চ প্রিমিয়াম ৭০০০৳ প্যাকেজ',
    popular: true,
    isHighest: true,
    description: 'সর্বোচ্চ ৭০০০ টাকা পার ডে প্যাকেজে ফুল ফটোগ্রাফি প্লাস 4K সিনেমাটোগ্রাফি, ড্রোন এরিয়াল ভিউ, সিনেমা ট্রেইলার ও প্রিমিয়াম অ্যালবাম সাপোর্ট।',
    descriptionEn: 'The elite 7,000 BDT/day package with full photography plus 4K cinematography, drone aerial coverage, cinema trailer and Google Drive RAW files.',
    teamSize: '৩ জন সিনিয়র টিম মেম্বার (চিফ ফটোগ্রাফার + সিনেমাটোগ্রাফার + ড্রোন পাইলট)',
    deliverables: [
      'আনলিমিটেড ফুল ডে ফটোগ্রাফি ও আনকাট 4K ভিডিওগ্রাফি',
      '৩৫০+ মাস্টারপিস এডিটেড ও রিটাচড হাই-রেস ফটো',
      '১টি সম্পূর্ণ সিনেমাটিক ওয়েডিং ফিল্ম (৮-১২ মিনিট)',
      '১টি ড্রামাটিক সোশ্যাল মিডিয়া রিলস / ট্রেইলার (১ মিনিট)',
      'ড্রোন এরিয়াল ভিডিওগ্রাফি (ভ্যাকুয়াম ও ল্যান্ডস্কেপ শর্ট)',
      'গুগল ড্রাইভ ফুল হাই-স্পিড লিঙ্ক (আনলিমিটেড ভ্যালিডিটি)',
      'সকল র-ছবি ও ভিডিও ফাইল সরাসরি ট্রান্সফার'
    ],
    features: [
      'ফটোগ্রাফি প্লাস সিনেমাটোগ্রাফি কমপ্লিট সল্যুশন',
      '4K সিনেমা সেন্সর ও প্রাইম লেন্স সেট',
      'DJI ড্রোন এরিয়াল সিনেমাটোগ্রাফি ইনক্লুডেড',
      'রোদে ও ডিজেআই মাল্টি-চ্যানেল প্রফেশনাল অডিও',
      'লাইভ মনিটরিং ও প্রিমিয়াম ফটো কালার গ্রেডিং',
      'গুগল ড্রাইভে হাই-স্পিড ক্লায়েন্ট পোর্টাল অ্যাক্সেস'
    ],
    featuresEn: [
      'Photography + Cinematography Complete Solution',
      '4K Cinema Sensor with Prime Lenses',
      'DJI Drone Aerial Coverage Included',
      'Multi-channel Professional Wireless Audio',
      'High-Speed Google Drive Delivery with RAW files'
    ]
  }
];

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 'port-1',
    title: 'রয়্যাল ওয়েডিং ও সিনেমাটিক শুট',
    category: 'wedding',
    categoryLabel: 'ওয়েডিং ফটোগ্রাফি',
    imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-bride-and-groom-having-their-first-dance-41484-large.mp4',
    description: 'কুষ্টিয়া ক্লাবে অনুষ্ঠিত জমকালো বিয়ের এক্সক্লুসিভ সিনেমাটোগ্রাফি ও ক্যান্ডিড মোমেন্টস। ৭০০০ টাকার এলিট প্যাকেজে সম্পন্ন।',
    client: 'সাদিয়া ও তানভীর',
    date: 'ফেব্রুয়ারি ২০২৫',
  },
  {
    id: 'port-2',
    title: 'হলুদ সন্ধ্যা ও রঙিন উৎসবের ভিডিওগ্রাফি',
    category: 'haldi',
    categoryLabel: 'গায়ে হলুদ',
    imageUrl: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-portrait-of-a-fashion-woman-with-silver-makeup-39875-large.mp4',
    description: 'প্রাণবন্ত হলুদ রাতের লাইভ লাইটিং, মিউজিক রিদম ও ভিডিও এডিটিং। ১৫০০-৩৫০০ টাকার প্যাকেজ কভারেজ।',
    client: 'নাফিসা রহমান',
    date: 'জানুয়ারি ২০২৫',
  },
  {
    id: 'port-3',
    title: 'ড্রোন এরিয়াল ও সিনেমাটিক কাপল শুট',
    category: 'cinematic',
    categoryLabel: 'সিনেমাটোগ্রাফি',
    imageUrl: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-set-of-plateaus-seen-from-the-sky-in-a-sunset-26070-large.mp4',
    description: 'প্রাকৃতিক লোকেশনে ড্রোন এরিয়াল ভিউ ও ট্রেলার এডিটিং।',
    client: 'আরিফ ও তাসনিম',
    date: 'ডিসেম্বর ২০২৪',
  },
  {
    id: 'port-4',
    title: '১ম জন্মদিন ও ফ্যামিলি মেমোরিজ',
    category: 'birthday',
    categoryLabel: 'বার্থডে পার্টি',
    imageUrl: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1200&q=80',
    description: 'শিশুর মিষ্টি হাসি ও পারিবারিক আনন্দের সুন্দর ক্যান্ডিড মোমেন্টস ক্যাপচার। ১৫০০ টাকার প্যাকেজে ভিডিওগ্রাফি ও রিলস।',
    client: 'আরাফাত চৌধুরী',
    date: 'ফেব্রুয়ারি ২০২৫',
  },
  {
    id: 'port-5',
    title: 'কর্পোরেট কনফারেন্স ও এক্সিকিউটিভ রিলস',
    category: 'corporate',
    categoryLabel: 'কর্পোরেট ইভেন্ট',
    imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
    description: 'বিজনেস সামিট, প্রোডাক্ট লঞ্চ ও সোশ্যাল মিডিয়া প্রোমো রিলস শুটিং ও দ্রুততম এডিটিং।',
    client: 'আইকন টেক সল্যুশনস',
    date: 'নভেম্বর ২০২৪',
  },
  {
    id: 'port-6',
    title: 'ব্রাইডাল পোর্ট্রেট ও লাইটিং ফটোশুট',
    category: 'wedding',
    categoryLabel: 'ওয়েডিং পোর্ট্রেট',
    imageUrl: 'https://images.unsplash.com/photo-1544077960-604201fe74bc?auto=format&fit=crop&w=1200&q=80',
    description: 'ন্যাচারাল ডে-লাইট ও অফ-ক্যামেরা ফ্ল্যাশ দিয়ে ব্রাইডাল লুকের নিখুঁত আর্ট।',
    client: 'সুমাইয়া ইসলাম',
    date: 'ডিসেম্বর ২০২৪',
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    name: 'তানভীর আহমেদ',
    location: 'কুষ্টিয়া সদর',
    eventType: 'ওয়েডিং রিসেপশন (৭০০০৳ প্যাকেজ)',
    rating: 5,
    comment: 'ইমন ভাইয়ের এলাইভ ইভেন্ট টিম অসাধারণ কাজ করেছে! ৭০০০ টাকার মেগা প্যাকেজ নিয়েছিলাম, ড্রোন ভিডিও আর গুগল ড্রাইভের ছবিগুলো দেখে পুরো পরিবার মুগ্ধ। ড্রাইভ থেকে খুব সহজে ফুল এইচডি ছবি ডাউনলোড করতে পেরেছি।',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
  },
  {
    id: 't-2',
    name: 'ফারজানা আক্তার',
    location: 'ঢাকা / কুষ্টিয়া',
    eventType: 'গায়ে হলুদ ও বার্থডে (১৫০০৳ ভিডিওগ্রাফি)',
    rating: 5,
    comment: 'মাত্র ১৫০০ টাকায় পার ডে এত সুন্দর ভিডিওগ্রাফি এবং ভিডিও এডিটিং পাবো ভাবতেই পারিনি! রিলসটা সোশ্যাল মিডিয়ায় পোস্ট করার পর সবাই প্রশংসা করেছে। ইমন ভাইয়ের ব্যবহার অনেক অমায়িক।',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
  },
  {
    id: 't-3',
    name: 'মাহমুদুল হাসান',
    location: 'মেহেরপুর',
    eventType: 'এনগেজমেন্ট ও সিনেমাটোগ্রাফি',
    rating: 5,
    comment: 'এলাইভ ইভেন্টের গুগল ড্রাইভ সিস্টেমটা খুব চমৎকার। আমাদের সব র-ছবি আর ভিডিও হাই-স্পিডে ডাউনলোড পেয়েছি। লাইভ চ্যাটেও দ্রুত রেসপন্স পাওয়া যায়। শুভকামনা ইমন ভাই ও এলাইভ ইভেন্টকে!',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=120&q=80',
  }
];

export const GEAR_LIST = [
  { name: 'Sony Alpha 4K Cinema Gear', detail: '4K 120fps ক্রিস্টাল ক্লিয়ার ভিডিও ও হাই-রেস ছবি' },
  { name: 'DJI RS3 Pro Gimbal', detail: 'সিল্কি স্মুথ সিনেমাটিক ক্যামেরা মুভমেন্ট' },
  { name: 'DJI Drone Aerial 4K', detail: 'আকাশ থেকে দৃষ্টিনন্দন পাখির চোখের ভিউ' },
  { name: 'Godox Studio Strobe & RGB Lights', detail: 'পারফেক্ট ড্রামাটিক ও সফট স্কিন টোন আলো' },
  { name: 'Rode Wireless Pro Mic Set', detail: 'নয়েজ-মুক্ত ক্রিস্টাল স্টুডিও সাউন্ড ক্যাপচার' },
  { name: 'Google Drive Unlimited Storage', detail: 'লাইফটাইম হাই-স্পিড ক্লাউড ফটো ও ভিডিও ডেলিভারি' },
];
