// components/ProgramsHeroSection.jsx
"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import NavBar from "@/components/NavBar";

export default function ProgramsHeroSection({ image, title, subtitle }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.2]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);

  return (
    <motion.div
      ref={containerRef}
      style={{ opacity, scale }}
      className="relative w-full min-h-screen bg-[#152C5B]"
    >
      <Image
        src={image || "/placeholder.png"}
        alt={title}
        fill
        className="object-cover z-0"
      />

      <div className="absolute inset-0 bg-black/40 z-10 pointer-events-none" />

      <div className="absolute top-0 left-0 w-full z-30">
        <NavBar />
      </div>

      <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 z-20 text-white">
        <h1 className="text-3xl sm:text-6xl uppercase font-bold">{title}</h1>
        <p className="text-lg mt-4 italic text-white/80">{subtitle}</p>
      </div>
    </motion.div>
  );
}
