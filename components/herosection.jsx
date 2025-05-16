import Link from "next/link";
import { useEffect, useState } from "react";
import { Globe } from "lucide-react";
import NavBar from "./NavBar";

export default function HeroSection() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="relative w-full h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/images/hero.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/40 z-0"></div>

      <NavBar />

      <div
        className={`relative z-10 h-full flex flex-col justify-center px-8 sm:px-16 transition-opacity duration-1000 ease-out ${
          loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <div className="flex items-end gap-4 text-white">
          <h1 className="text-6xl sm:text-8xl leading-none font-neue font-black">
            RETREAT
          </h1>
          <div className="flex flex-col text-3xl sm:text-lg leading-tight mb-2 font-neue">
            <div className="flex">
              <div className="text-3xl  font-thin italic">FROM THE</div>
              <div className="text-3xl  font-light italic ml-2">STRESS</div>
            </div>
            <div className="flex">
              <div className="text-3xl  font-thin italic">FROM THE</div>
              <div className="text-3xl  font-light italic ml-2">NOISE</div>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-300 w-1/2" />

        <Link
          href="/register"
          className="inline-block text-center bg-gradient-to-r from-white/60 to-[#616161]/60 text-white px-6 py-3 rounded-[10px] shadow w-96 border-[1px] border-white "
        >
          Register For A Program Now
        </Link>
      </div>
    </div>
  );
}
