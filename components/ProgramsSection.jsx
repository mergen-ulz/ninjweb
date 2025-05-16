// components/ProgramsSection.jsx
"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function ProgramsSection() {
  const [programs, setPrograms] = useState([]);

  useEffect(() => {
    const fetchPrograms = async () => {
      const res = await fetch("/api/public-programs");
      const data = await res.json();
      setPrograms(data);
    };

    fetchPrograms();
  }, []);

  return (
    <section className="px-4 sm:px-8 py-20 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-left text-customblue">
          Our Programs
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center mt-20">
          {programs.map((program) => {
            console.log("nights:", program.nights);
            return (
              <div
                key={program._id}
                className="w-full max-w-sm bg-white rounded-lg shadow-md overflow-hidden relative flex flex-col"
              >
                <div className="absolute top-0 right-0 bg-[#107FBB] text-white text-xs font-light px-4 py-2 font-neue rounded-bl-lg rounded-tr-lg z-10">
                  {program.nights} Nights
                </div>

                <div className="w-full aspect-[4/3] relative z-0">
                  <Image
                    src={program.image || "/placeholder.png"}
                    alt={program.title}
                    fill
                    className="object-cover rounded-t-lg"
                  />
                </div>

                <div className="p-4 h-[30%] bg-white z-10 ">
                  <h3 className="text-2xl font-light font-neue mt-2">
                    {program.title}
                  </h3>
                  <p className="text-sm text-gray-600/70 font-neue font-light mt-2">
                    {program.subtitle}
                  </p>
                  <div className="absolute bottom-4 right-4">
                    <Link
                      href={`/programs/${program._id}`}
                      className="text-xs text-gray-600/40 font-neue hover:underline flex items-center gap-1"
                    >
                      Learn More
                      <span className="text-sm">→</span>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
