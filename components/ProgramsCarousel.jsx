"use client";

import { useEffect, useRef, useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "keen-slider/keen-slider.min.css";

function useHasMounted() {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => setHasMounted(true), []);
  return hasMounted;
}

export default function ProgramsCarousel() {
  const [programs, setPrograms] = useState([]);
  const keenSliderRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const isMounted = useHasMounted();

  const [sliderRef, instanceRef] = useKeenSlider(
    {
      slides: {
        perView: 3,
        spacing: 16,
      },
      breakpoints: {
        "(max-width: 1024px)": {
          slides: { perView: 2, spacing: 12 },
        },
        "(max-width: 640px)": {
          slides: { perView: 1, spacing: 10 },
        },
      },
      mode: "snap",
      created(slider) {
        keenSliderRef.current = slider;
        setLoaded(true);
      },
      slideChanged(slider) {
        setCurrentSlide(slider.track.details.rel);
      },
    },
    {
      enabled: isMounted && programs.length > 0, // keen slider asuudal zasav
    }
  );

  useEffect(() => {
    const fetchPrograms = async () => {
      const res = await fetch("/api/programs/carousel");
      const data = await res.json();
      setPrograms(data);
    };
    fetchPrograms();
  }, []);

  const handlePrev = () => {
    if (!keenSliderRef.current) return;
    keenSliderRef.current.prev();
  };

  const handleNext = () => {
    if (!keenSliderRef.current) return;
    keenSliderRef.current.next();
  };

  if (!isMounted || programs.length === 0) return null;

  return (
    <section className="text-[#152C5B] py-20 px-6 sm:px-12 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-10 ml-14 text-left">
          Our Programs
        </h2>

        <div className="relative">
          {loaded && (
            <button
              onClick={handlePrev}
              disabled={currentSlide === 0}
              className="absolute top-1/2 -left-6 transform -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow hover:bg-gray-100 disabled:opacity-30"
            >
              <ChevronLeft size={20} />
            </button>
          )}

          <div ref={sliderRef} className="keen-slider overflow-hidden">
            {programs.map((program) => (
              <div
                key={program._id}
                className="keen-slider__slide flex justify-center min-w-0"
              >
                <div className="bg-white rounded-lg overflow-hidden flex flex-col w-[300px] h-[550px] shadow-md">
                  <div className="relative h-[40%] w-full">
                    <Image
                      src={program.image || "/placeholder.png"}
                      alt={program.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col flex-grow p-4">
                    <div>
                      <h3 className="text-xl font-bold text-center">
                        {program.title}
                      </h3>
                      <p className="text-xs uppercase tracking-wide font-semibold mt-2 text-center text-black">
                        {program.subtitle}
                      </p>
                    </div>
                    <p className="text-sm text-gray-700 font-light mt-2 mb-4 text-center line-clamp-4">
                      {program.description}
                    </p>
                    <div className="text-xs text-black mt-auto mb-2 text-center font-black italic">
                      {program.nights} Nights •
                    </div>
                    <div className="mt-2">
                      <Link
                        href={`/programs/${program._id}`}
                        className="text-sm bg-[#152C5B] text-white px-4 py-2 rounded hover:bg-[#1e3a5f] transition w-1/2 mx-auto text-center block"
                      >
                        Learn More
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {loaded && (
            <button
              onClick={handleNext}
              disabled={
                currentSlide >=
                (keenSliderRef.current?.track?.details?.slides?.length || 1) -
                  (keenSliderRef.current?.options?.slides?.perView || 1)
              }
              className="absolute top-1/2 -right-6 transform -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow hover:bg-gray-100 disabled:opacity-30"
            >
              <ChevronRight size={20} />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
