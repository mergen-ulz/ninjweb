// app/page.js
'use client';

import ProgramsSection from '@/components/ProgramsSection';
import HeroSection from '../components/herosection';
import AboutSection from '@/components/AboutSection';
import Footer from '@/components/Footer';
import { useEffect } from "react";


export default function HomePage() {
  useEffect(() => {
    fetch("/api/visit", { method: "POST" });
  }, []);

  return (
    <main>
      <HeroSection />
      <ProgramsSection />
      <AboutSection />
      <Footer />
    </main>
  );
}
