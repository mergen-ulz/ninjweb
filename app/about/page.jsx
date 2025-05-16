import Image from "next/image";
import Link from "next/link";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Teacher from "@/models/Teacher";
import connectToDatabase from "@/lib/mongodb";
import { Flower, Leaf, Brain } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AboutPage() {
  await connectToDatabase();
  const teachers = await Teacher.find().sort({ createdAt: -1 }).lean();

  return (
    <div className="bg-[#F9F6F2] text-[#152C5B]">
      {/* HERO SECTION */}
      <div
        className="relative w-full h-[60vh] bg-cover bg-center flex items-center justify-center min-h-screen"
        style={{ backgroundImage: "url('/images/abouthero.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/40 z-0 backdrop-blur-xs" />
        <div className="absolute top-0 left-0 w-full z-10">
          <NavBar />
        </div>
        <div className="flex flex-col items-center">
          <h1 className="text-white text-4xl sm:text-6xl font-bold z-20">
            Ninj Retreat And Wellness Center
          </h1>
          <h2 className="text-white/70 text-xl sm:text-2xl font-light z-20 capitalize mt-5">
            a place for you to find your spiritual and physical peacefulness
          </h2>
        </div>
      </div>

      {/* ABOUT + VIDEO SECTION */}
      <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-4">
            A Sanctuary of Inner Peace
          </h2>
          <p className="text-lg leading-relaxed text-gray-700">
            At Ninj Retreat Center, we believe that compassion (ninj) is the
            foundation of healing. Our mission is to offer a peaceful space for
            personal growth, reflection, and connection with the self and
            nature.
          </p>
        </div>
        <div className="w-full aspect-video bg-black rounded overflow-hidden shadow-md">
          <video controls className="w-full h-full object-cover">
            <source src="/videos/intro.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      {/* 3 FEATURE CARDS */}
      <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
        {[
          {
            icon: <Flower size={40} />,
            title: "Mindfulness",
            desc: "Our programs are designed to deepen your awareness and inner peace.",
          },
          {
            icon: <Leaf size={40} />,
            title: "Nature Connection",
            desc: "We integrate the wisdom of nature into every retreat experience.",
          },
          {
            icon: <Brain size={40} />,
            title: "Compassion-Based",
            desc: "Our philosophy is rooted in Ninj — compassion and care.",
          },
        ].map((card, i) => (
          <div
            key={i}
            className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center hover:shadow-lg transition"
          >
            <div className="text-[#107FBB] mb-4">{card.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
            <p className="text-gray-600">{card.desc}</p>
          </div>
        ))}
      </div>

      {/* MEET OUR TEAM */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-10">Meet Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-20">
          {teachers.map((t) => (
            <div
              key={t._id}
              className="bg-white rounded-lg shadow flex flex-col items-center text-center hover:shadow-md transition"
            >
              <div className="p-6 py-10">
                <Image
                  src={t.photo || "/images/teacher-placeholder.jpg"}
                  alt={t.name}
                  width={120}
                  height={120}
                  className="rounded-full object-cover border-2 aspect-square border-customblue mb-4"
                />
              </div>
              <div className="bg-customblue w-full rounded-b-md p-4">
                <h3 className="text-2xl text-white">{t.name}</h3>
                <p className="text-sm font-light text-white/50 capitalize">
                  {t.occupation}
                </p>
              </div>
            </div>
          ))}
          {teachers.length === 0 && (
            <p className="text-center text-gray-500 col-span-full">
              No teachers found.
            </p>
          )}
        </div>
      </div>

      {/* IMAGE CAROUSEL */}
      <div className="w-full py-12 overflow-hidden mb-20">
        <div className="max-w-7xl mx-auto relative">
          <div className="flex animate-carousel gap-10 whitespace-nowrap">
            {[...Array(2)].flatMap((_, j) =>
              [
                "/images/center1.jpg",
                "/images/center2.jpg",
                "/images/center3.jpg",
                "/images/center4.jpg",
              ].map((src, i) => (
                <div
                  key={`${j}-${i}`}
                  className="min-w-1/3 h-4/5 flex-shrink-0 rounded-lg overflow-hidden"
                >
                  <Image
                    src={src}
                    alt={`Center ${i + 1}`}
                    width={320}
                    height={200}
                    className="w-full h-full object-cover aspect-[16/10]"
                  />
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
