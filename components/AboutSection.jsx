"use client";

import Link from "next/link";

export default function AboutSection() {
  return (
    <section className="px-4 sm:px-8 py-16 bg-[#C1610D]/20 min-h-screen flex items-center ">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-10">
        {/* Text Column */}
        <div className="w-full lg:w-1/2 flex flex-col">
          <h2 className="text-3xl sm:text-3xl font-bold mb-4">
            Deep dive into transformation
          </h2>
          <p className="text-gray-700 mb-6 text-4xl sm:text-2xl leading-relaxed">
            At the Ninj Retreat Center, we strive to bring you the powerful
            practices of meditation and mindfulness, yoga, so that you may have
            more happiness, health, and peace in your life. 
          </p>

          <Link
            href="/about"
            className="inline-block bg-customblue text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-all duration-300 w-full text-center text-2xl mt-24"
          >
            Learn More About Ninj Center
          </Link>
        </div>

        {/* Video Player Column */}
        <div className="w-full lg:w-1/2 aspect-video">
          <div className="w-full h-auto aspect-video rounded-lg overflow-hidden shadow-lg">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/NSAOrGb9orM?si=40cH2Bf-XPSGg3sY"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
