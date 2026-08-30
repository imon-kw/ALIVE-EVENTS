import express from 'express';
import path from 'path';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory demo client drive deliveries and bookings
const mockDeliveries = [
  {
    id: 'AE-8801',
    clientName: 'সাদিয়া ও তানভীর',
    clientPhone: '01711223344',
    eventTitle: 'ওয়েডিং রিসেপশন ও সিনেমাটোগ্রাফি',
    eventDate: '2025-02-14',
    packagePrice: 7000,
    packageType: 'প্রিমিয়াম ওয়েডিং ডিল (ফটোগ্রাফি + ভিডিওগ্রাফি)',
    driveLink: 'https://drive.google.com/drive/folders/1AliveEventSampleWeddingPhotosVideos',
    totalPhotos: 350,
    totalVideos: 4,
    status: 'Ready (সম্পূর্ণ প্রস্তুত)',
    expiryDate: '২০২৫-১২-৩১',
    highlightReel: 'https://assets.mixkit.co/videos/preview/mixkit-bride-and-groom-having-their-first-dance-41484-large.mp4'
  },
  {
    id: 'AE-8802',
    clientName: 'রাকিব আহমেদ',
    clientPhone: '01899887766',
    eventTitle: 'গায়ে হলুদ ও মিউজিক ভিডিও এডিটিং',
    eventDate: '2025-02-20',
    packagePrice: 3500,
    packageType: 'হলুদ নাইট স্পেশাল (ভিডিওগ্রাফি + এডিটিং)',
    driveLink: 'https://drive.google.com/drive/folders/1AliveEventSampleHaldiCoverage',
    totalPhotos: 120,
    totalVideos: 2,
    status: 'Ready (ডাউনলোড যোগ্য)',
    expiryDate: '২০২৫-১২-৩১',
    highlightReel: 'https://assets.mixkit.co/videos/preview/mixkit-portrait-of-a-fashion-woman-with-silver-makeup-39875-large.mp4'
  },
  {
    id: 'AE-8803',
    clientName: 'নাবিল হাসান',
    clientPhone: '01788055586',
    eventTitle: 'অফিসিয়াল অ্যানুয়াল মিট ও কর্পোরেট রিল',
    eventDate: '2025-02-25',
    packagePrice: 1500,
    packageType: 'বেসিক ভিডিওগ্রাফি ও ফাস্ট এডিটিং প্যাকেজ',
    driveLink: 'https://drive.google.com/drive/folders/1AliveEventSampleCorporateEvent',
    totalPhotos: 0,
    totalVideos: 3,
    status: 'Ready (ফাইনাল ডেলিভারি)',
    expiryDate: '২০২৬-০১-০১',
    highlightReel: 'https://assets.mixkit.co/videos/preview/mixkit-set-of-plateaus-seen-from-the-sky-in-a-sunset-26070-large.mp4'
  }
];

const mockBookings: Array<{
  id: string;
  name: string;
  phone: string;
  date: string;
  days: number;
  packageType: string;
  totalPrice: number;
  notes: string;
  createdAt: string;
}> = [];

// Gemini AI Setup
let ai: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!ai && process.env.GEMINI_API_KEY) {
    ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return ai;
}

// Live Chat Support Endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message, conversationHistory = [] } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const gemini = getGeminiClient();
    if (!gemini) {
      // Fallback response if API key is not yet set
      return res.json({
        reply: `ধন্যবাদ 'এলাইভ ইভেন্ট'-এ যোগাযোগ করার জন্য! আমাদের ওনার জনাব ইমন ভাইয়ের সাথে সরাসরি কথা বলতে ডায়াল করুন: ০১৭৮৮০৫৫৫৮৬ অথবা হোয়াটসঅ্যাপ করুন। আমাদের সর্বনিম্ন পার ডে ১৫০০ টাকার ভিডিওগ্রাফি ও এডিটিং প্যাকেজ থেকে ৭০০০ টাকার ফুল ফটোগ্রাফি ও সিনেমাটোগ্রাফি প্যাকেজ রয়েছে। আপনার ইভেন্টের তারিখ ও লোকেশন জানালে বিস্তারিত বুকিং করে দিতে পারব!`,
      });
    }

    const systemInstruction = `
You are the polite, enthusiastic, and professional AI Event Consultant for "এলাইভ ইভেন্ট" (Alive Event), a premier event photography, videography, and cinematography service in Bangladesh.

Key Business Information:
- Owner / Chief Cinematographer: ইমন (Imon)
- Official Mobile & WhatsApp Number: ০১৭৮৮০৫৫৫৮৬ (01788055586)
- Email: imon.kushtia@gmail.com
- Available Services: Wedding, Reception, Gaye Holud, Birthday, Corporate Events, Commercial Shoots, Reels/Shorts creation, Drone Cinematography, and High-End Color Grading.

Pricing & Packages (Per Day / পার ডে):
1. **বেসিক ভিডিওগ্রাফি প্যাকেজ (Basic Videography Package)**: ৳১,৫০০ / দিন
   - ইনক্লুডেড: ১ জন প্রফেশনাল ভিডিওগ্রাফার, ফুল ইভেন্ট ভিডিও কভারেজ, সিনেমাটিক ভিডিও এডিটিং ও রিলস আউটপুট।
2. **স্ট্যান্ডার্ড প্যাকেজ (Standard Event Package)**: ৳৩,০০০ / দিন
   - ইনক্লুডেড: প্রফেশনাল ফটোগ্রাফি অথবা ভিডিওগ্রাফি + ফুল এডিটিং + ৭৫+ এডিটেড ছবি/হাইলাইটস ভিডিও।
3. **কম্বো ইভেন্ট প্যাকেজ (Combo Event Coverage)**: ৳৫,০০০ / দিন
   - ইনক্লুডেড: ১ জন ফটোগ্রাফার + ১ জন ভিডিওগ্রাফার, হাইলাইটস টিজার ও ১০০+ এডিটেড হাই-রেস ছবি।
4. **প্রিমিয়াম ওয়েডিং ও মেগা ইভেন্ট প্যাকেজ (Elite 7K Package)**: ৳৭,০০০ / দিন
   - ইনক্লুডেড: ফুল ডে ফটোগ্রাফি + 4K সিনেমাটিক ভিডিওগ্রাফি + ড্রোন শর্টস + ফুল এডিটেড মুভি ও ট্রেইলার + আনলিমিটেড ক্লিক ও র-ফাইল গুগল ড্রাইভে সরবরাহ + প্রিমিয়াম ফটোবুক অপশন।

Special Features:
- **গুগল ড্রাইভ এক্সেস (Google Drive Delivery)**: সকল গ্রাহক তাদের বুকিং আইডি অথবা মোবাইল নম্বর দিয়ে ক্লায়েন্ট পোর্টাল থেকে আনলিমিটেড ভ্যালিডিটির গুগল ড্রাইভ লিংক পেয়ে থাকেন।
- **কাস্টম বাজেট ও কোটেশন**: গ্রাহকের চাহিদা অনুযায়ী দিন এবং ক্যামেরা ক্রু কাস্টমাইজ করা সম্ভব।
- **লাইভ যোগাযোগ**: সরাসরি ইমন ভাইয়ের সাথে কথা বলতে ফোন বা হোয়াটসঅ্যাপ ০১৭৮৮০৫৫৫৮৬।

Tone and Language Guidelines:
- Respond primarily in friendly, natural Bengali (বাংলা), keeping it crisp, polite, and reassuring. If the user talks in English, respond in clear English or bilingual.
- Always emphasize the owner's name ইমন (Imon) and contact ০১৭৮৮০৫৫৫৮৬ when recommending a direct phone call or booking confirmation.
- Format responses cleanly with bullet points when explaining packages or features.
`;

    // Construct conversation payload
    const formattedHistory = conversationHistory.slice(-6).map((msg: any) => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }],
    }));

    const chat = gemini.chats.create({
      model: 'gemini-3.7-flash',
      config: {
        systemInstruction,
        temperature: 0.7,
      },
      history: formattedHistory,
    });

    const result = await chat.sendMessage({
      message,
    });

    const reply = result.text || 'আমাদের প্যাকেজ বা সার্ভিস সম্পর্কে জানতে ০১৭৮৮০৫৫৫৮৬ নাম্বারে কল করুন।';
    return res.json({ reply });
  } catch (error: any) {
    console.error('Error in /api/chat:', error);
    return res.status(500).json({
      error: 'Failed to process chat message',
      reply: 'আন্তরিকভাবে দুঃখিত! সাময়িক সমস্যার কারণে রিপ্লাই দেওয়া যাচ্ছে না। অনুগ্রহ করে সরাসরি কল করুন ইমন ভাইয়ের নম্বরে: ০১৭৮৮০৫৫৫৮৬।',
    });
  }
});

// Google Drive portal search
app.get('/api/drive-lookup', (req, res) => {
  const query = (req.query.q as string || '').trim().toLowerCase();
  if (!query) {
    return res.json({ success: false, message: 'অনুগ্রহ করে মোবাইল নম্বর বা বুকিং আইডি লিখুন।' });
  }

  // Search by ID or phone
  const cleanPhone = query.replace(/[^0-9]/g, '');
  const match = mockDeliveries.find((item) => {
    const itemPhone = item.clientPhone.replace(/[^0-9]/g, '');
    return item.id.toLowerCase() === query || (cleanPhone.length >= 5 && itemPhone.includes(cleanPhone));
  });

  if (match) {
    return res.json({ success: true, delivery: match });
  }

  // Check in newly booked items
  const newlyBooked = mockBookings.find((b) => {
    const bPhone = b.phone.replace(/[^0-9]/g, '');
    return b.id.toLowerCase() === query || (cleanPhone.length >= 5 && bPhone.includes(cleanPhone));
  });

  if (newlyBooked) {
    return res.json({
      success: true,
      delivery: {
        id: newlyBooked.id,
        clientName: newlyBooked.name,
        clientPhone: newlyBooked.phone,
        eventTitle: `${newlyBooked.packageType} (${newlyBooked.days} দিন)`,
        eventDate: newlyBooked.date,
        packagePrice: newlyBooked.totalPrice,
        packageType: newlyBooked.packageType,
        driveLink: `https://drive.google.com/drive/folders/AliveEvent-PendingProcessing-${newlyBooked.id}`,
        totalPhotos: 0,
        totalVideos: 0,
        status: 'ইন-প্রোগ্রেস (ইভেন্ট সম্পন্ন হওয়ার পর ৩ দিনের মধ্যে ড্রাইভ আপডেট হবে)',
        expiryDate: 'আজীবন অ্যাক্সেস',
      },
    });
  }

  return res.json({
    success: false,
    message: 'কোন ড্রাইভ ডাটা পাওয়া যায়নি। অনুগ্রহ করে সঠিক মোবাইল নাম্বার (যেমন: 01788055586) বা বুকিং আইডি দিন, অথবা ইমন ভাইয়ের সাথে সরাসরি যোগাযোগ করুন: ০১৭৮৮০৫৫৫৮৬।',
  });
});

// Submit booking request
app.post('/api/bookings', (req, res) => {
  const { name, phone, date, days = 1, packageType, totalPrice, notes = '' } = req.body;

  if (!name || !phone) {
    return res.status(400).json({ success: false, error: 'নাম ও মোবাইল নম্বর আবশ্যক' });
  }

  const bookingId = `AE-${Math.floor(1000 + Math.random() * 9000)}`;
  const newBooking = {
    id: bookingId,
    name,
    phone,
    date: date || new Date().toISOString().split('T')[0],
    days: Number(days) || 1,
    packageType: packageType || 'কাস্টম প্যাকেজ',
    totalPrice: Number(totalPrice) || 1500,
    notes,
    createdAt: new Date().toISOString(),
  };

  mockBookings.push(newBooking);

  return res.json({
    success: true,
    message: 'বুকিং সফলভাবে সম্পন্ন হয়েছে! ওনার ইমন ভাই শীঘ্রই আপনার সাথে ফোনে যোগাযোগ করবেন।',
    booking: newBooking,
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', studio: 'Alive Event', owner: 'ইমন', phone: '01788055586' });
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Alive Event server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
