import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PackagesSection } from './components/PackagesSection';
import { GoogleDrivePortal } from './components/GoogleDrivePortal';
import { CostCalculator } from './components/CostCalculator';
import { PortfolioGallery } from './components/PortfolioGallery';
import { OwnerContactSection } from './components/OwnerContactSection';
import { Footer } from './components/Footer';
import { LiveChatModal } from './components/LiveChatModal';
import { BookingModal } from './components/BookingModal';
import { FloatingActions } from './components/FloatingActions';
import { PackageItem } from './types';

export default function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedPackageId, setSelectedPackageId] = useState<string | undefined>(undefined);
  const [customBookingDetails, setCustomBookingDetails] = useState<{
    eventType: string;
    packageId: string;
    days: number;
    totalPrice: number;
    needDrone: boolean;
    needAlbum: boolean;
    notes: string;
  } | null>(null);

  const handleScrollTo = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenBooking = (pkgId?: string) => {
    setSelectedPackageId(pkgId);
    setCustomBookingDetails(null);
    setIsBookingOpen(true);
  };

  const handleSelectPackage = (pkg: PackageItem, days: number) => {
    setSelectedPackageId(pkg.id);
    setCustomBookingDetails({
      eventType: 'ওয়েডিং ও রিসেপশন',
      packageId: pkg.id,
      days,
      totalPrice: pkg.pricePerDay * days,
      needDrone: pkg.id === 'elite-wedding-7000',
      needAlbum: false,
      notes: `প্যাকেজ: ${pkg.name} (${days} দিন)`,
    });
    setIsBookingOpen(true);
  };

  const handleOpenBookingFromCalculator = (details: {
    eventType: string;
    packageId: string;
    days: number;
    totalPrice: number;
    needDrone: boolean;
    needAlbum: boolean;
    notes: string;
  }) => {
    setCustomBookingDetails(details);
    setSelectedPackageId(details.packageId);
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans selection:bg-amber-500 selection:text-stone-950">
      {/* Top Navigation */}
      <Navbar
        onOpenBooking={handleOpenBooking}
        onOpenChat={() => setIsChatOpen(true)}
        onScrollTo={handleScrollTo}
      />

      {/* Main Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onOpenBooking={handleOpenBooking}
          onOpenChat={() => setIsChatOpen(true)}
          onScrollTo={handleScrollTo}
        />

        {/* Packages Section (1500৳ to 7000৳) */}
        <PackagesSection
          onSelectPackage={handleSelectPackage}
          onOpenBooking={handleOpenBooking}
        />

        {/* Google Drive Delivery & Access Portal */}
        <GoogleDrivePortal />

        {/* Dynamic Budget & Cost Calculator */}
        <CostCalculator
          onOpenBookingWithDetails={handleOpenBookingFromCalculator}
        />

        {/* Aesthetic Portfolio & Video Reels */}
        <PortfolioGallery />

        {/* Owner Profile (ইমন), Equipments, Testimonials & Contact */}
        <OwnerContactSection
          onOpenBooking={() => handleOpenBooking()}
          onOpenChat={() => setIsChatOpen(true)}
        />
      </main>

      {/* Footer */}
      <Footer
        onScrollTo={handleScrollTo}
        onOpenBooking={() => handleOpenBooking()}
        onOpenChat={() => setIsChatOpen(true)}
      />

      {/* Floating Action Buttons (Live Chat, Drive, WhatsApp) */}
      <FloatingActions
        onOpenChat={() => setIsChatOpen(true)}
        onScrollToDrive={() => handleScrollTo('drive-portal')}
      />

      {/* Live AI Chat Modal */}
      <LiveChatModal
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        onOpenBooking={() => {
          setIsChatOpen(false);
          handleOpenBooking();
        }}
      />

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialPackageId={selectedPackageId}
        initialDetails={customBookingDetails}
      />
    </div>
  );
}
