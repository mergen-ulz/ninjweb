"use client";

import Link from "next/link";
import { Phone, MapPin, Facebook, Instagram, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#152C5B] text-white px-6 py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
        {/* 1: FIND A PROGRAM */}
        <div>
          <h4 className="font-bold uppercase text-sm mb-4">Find a Program</h4>
          <ul className="space-y-2 text-sm text-white/80">
            <li>
              <Link href="#">Happiness Retreat</Link>
            </li>
            <li>
              <Link href="#">Silent Meditation Retreat</Link>
            </li>
            <li>
              <Link href="#">Yoga Retreat</Link>
            </li>
            <li>
              <Link href="#">Nature Retreat</Link>
            </li>
            <li>
              <Link href="#">Teacher Training</Link>
            </li>
          </ul>
        </div>

        {/* 2: NINJ CENTER */}
        <div>
          <h4 className="font-bold uppercase text-sm mb-4">Ninj Center</h4>
          <ul className="space-y-2 text-sm text-white/80">
            <li>
              <Link href="#">Retreat Programs</Link>
            </li>
            <li>
              <Link href="#">Stay At Our Cabins</Link>
            </li>
            <li>
              <Link href="#">Corporate Meeting Host</Link>
            </li>
            <li>
              <Link href="#">Tourism</Link>
            </li>
            <li>
              <Link href="#">Spa & Massage</Link>
            </li>
          </ul>
        </div>

        {/* 3: HOST YOUR EVENT */}
        <div>
          <h4 className="font-bold uppercase text-sm mb-4">Host Your Event</h4>
          <ul className="space-y-2 text-sm text-white/80">
            <li>
              <Link href="#">Explore Our Center</Link>
            </li>
            <li>
              <Link href="#">Conference Hall</Link>
            </li>
            <li>
              <Link href="#">Accommodations</Link>
            </li>
            <li>
              <Link href="#">Menu</Link>
            </li>
          </ul>
        </div>

        {/* 4: ABOUT */}
        <div>
          <h4 className="font-bold uppercase text-sm mb-4">About</h4>
          <ul className="space-y-2 text-sm text-white/80">
            <li>
              <Link href="#">Vision, Mission, Goals</Link>
            </li>
            <li>
              <Link href="#">Staff</Link>
            </li>
            <li>
              <Link href="#">Calendar</Link>
            </li>
            <li>
              <Link href="#">Sponsors</Link>
            </li>
          </ul>
        </div>

        {/* 5: CONTACT US */}
        <div>
          <h4 className="font-bold uppercase text-sm mb-4">Contact Us</h4>
          <ul className="space-y-4 text-sm text-white/80">
            <li className="flex items-center gap-2">
              <Phone size={16} />
              <span>+976 1234-5678</span>
            </li>
            <li className="flex items-start gap-2">
              <MapPin size={16} className="mt-0.5" />
              <span>123 Ninj Center Road, Ulaanbaatar, Mongolia</span>
            </li>
            <li className="flex gap-4 mt-2">
              <Link href="#">
                <Facebook size={20} />
              </Link>
              <Link href="#">
                <Instagram size={20} />
              </Link>
              <Link href="#">
                <Youtube size={20} />
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom copyright line */}
      <div className="mt-12 flex justify-center">
        <img
          src="/images/logo.png" // or /logo.png
          alt="Ninj Center Logo"
          className="h-12 w-auto"
        />
      </div>
      <div className="border-t border-white/20 mt-8 pt-4 text-xs text-center text-white/50">
        &copy; {new Date().getFullYear()} Ninj Center. All rights reserved.
      </div>
    </footer>
  );
}
