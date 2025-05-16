"use client";

import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="bg-[#ECE3DE] text-[#152C5B]">
      {/* Hero Section */}
      <div className="relative bg-[#152C5B] text-white flex flex-col justify-center items-center px-4 min-h-screen">
        <div className="absolute top-0 left-0 w-full">
          <NavBar />
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold z-10 mt-20 text-center">
          Холбоо барих
        </h1>
        <p className="text-lg text-white/80 mt-4 text-center z-10">
          Бидэнтэй дараах сувгуудаар холбогдоорой
        </p>
      </div>

      {/* Contact Details */}
      <div className="max-w-6xl mx-auto py-16 px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left - Contact Info */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold mb-4">Манай мэдээлэл</h2>
          <div className="flex items-center gap-4">
            <Phone className="text-[#152C5B]" />
            <span>+976 99112233</span>
          </div>
          <div className="flex items-center gap-4">
            <Mail className="text-[#152C5B]" />
            <span>info@ninjcenter.mn</span>
          </div>
          <div className="flex items-start gap-4">
            <MapPin className="text-[#152C5B] mt-1" />
            <span>
              Сүхбаатар дүүрэг, 8-р хороо,
              <br />
              Энхтайваны өргөн чөлөө 17,
              <br />
              Нинж Оюуны Төвийн байр, Улаанбаатар
            </span>
          </div>

          {/* Socials */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-2">Сошиал холбоос</h3>
            <div className="flex items-center gap-6">
              <a
                href="https://facebook.com/ninjcenter"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook className="w-6 h-6 hover:text-blue-600" />
              </a>
              <a
                href="https://instagram.com/ninjcenter"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="w-6 h-6 hover:text-pink-500" />
              </a>
            </div>
          </div>
        </div>

        {/* Right - Google Maps Embed */}
        <div>
          <iframe
            title="Google Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2924.182456192389!2d106.91776481534653!3d47.91843977920792!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5d96923b4a50e5bb%3A0x3ff4a1e5fddfb631!2sSukhbaatar%20District%2C%208th%20Khoroo%2C%20Ulaanbaatar!5e0!3m2!1sen!2smn!4v1684130249101!5m2!1sen!2smn"
            width="100%"
            height="450"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-lg border border-gray-300"
          ></iframe>
        </div>
      </div>

      <Footer />
    </div>
  );
}
