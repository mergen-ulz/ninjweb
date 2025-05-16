"use client";

import Link from "next/link";
import NavBar from "@/components/NavBar"; // Adjust if your path is different
import ProgramsCarousel from "@/components/ProgramsCarousel";
import Footer from "@/components/Footer";

export default function ProgramsPage() {
  return (
    <main className="bg-[#ECE3DE] text-[#152C5B]">
      {/* Hero Section */}
      <section
        className="relative min-h-screen flex items-center px-6 sm:px-16 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/programs-hero.png')" }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 z-0"></div>

        {/*  Navbar */}
        <NavBar />

        {/* Hero Text */}
        <div className="ml-20 mt-10 relative z-10 text-white max-w-2xl space-y-4">
          <p className="text-sm uppercase tracking-widest text-white/80">
            Ninj Retreat Center
          </p>
          <h1 className="text-4xl sm:text-7xl font-extrabold leading-tight">
            Signature
            <br />
            Meditation
            <br />
            Retreats
          </h1>
          <p className="text-sm sm:text-base font-light text-white/70 font-neue">
            Experience greater joy every day
          </p>
        </div>
      </section>

      {/* Find Your Program Section */}
      <section className="py-20 px-6 text-center max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-4">
          Find Out What Program Suits You The Most
        </h2>
        <p className="text-gray-700 mb-6 font-light">
          So often, the mind is crammed with thoughts or stresses that cause us
          to miss what’s happening directly in front of us and consequently in
          life itself. To be in the present moment, with a centered state of
          mind, is one of the greatest gifts you can give yourself and those
          around you.  Find out what program suits you the most by pressing the
          button
        </p>
        <Link
          href="/personalized-test"
          className="inline-block bg-[#152C5B] text-white font-semibold px-6 py-3 rounded hover:bg-[#1e3a5f] transition"
        >
          Find Out What You Need
        </Link>
      </section>
      {/*Programs Carousel*/}
      <ProgramsCarousel />
      <Footer />
    </main>
  );
}
