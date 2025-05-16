import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import connectToDatabase from "@/lib/mongodb";
import Program from "@/models/Program";
import Footer from "@/components/Footer";
import ProgramsHeroSection from "@/components/ProgramsHeroSection";

export async function generateMetadata({ params: paramsPromise }) {
  const { id } = await paramsPromise;

  await connectToDatabase();
  const program = await Program.findById(id).populate("teacher").lean();

  return {
    title: `${program?.title || "Retreat Program"} | Ninj Center`,
  };
}

export default async function ProgramPage({ params: paramsPromise }) {
  const { id } = await paramsPromise;

  if (!id) return notFound();

  await connectToDatabase();
  const program = await Program.findById(id).populate("teacher").lean();

  if (!program) return notFound();

  const {
    _id,
    title,
    subtitle,
    description,
    image,
    teacher,
    availabilityStatus,
    registeredCount,
    capacity,
    price,
  } = program;

  let teacherName = "Багш тодорхойгүй";
  let teacherPhoto = "/images/placeholder.png";

  if (teacher && typeof teacher === "object") {
    teacherName = teacher.name || "Тодорхойгүй багш";
    teacherPhoto = teacher.photo || "/images/placeholder.png";
  }

  return (
    <div className="bg-[#ECE3DE] text-[#152C5B]">
      <ProgramsHeroSection title={title} subtitle={subtitle} image={image} />

      {/* Main Info */}
      <div className="max-w-7xl mx-auto py-16 px-6 grid grid-cols-1 md:grid-cols-3 gap-12 min-h-2/3">
        <div className="md:col-span-2 space-y-6">
          <h2 className="text-2xl font-bold border-b-2 border-[#152C5B] pb-2 mb-6">
            About the Retreat
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">{description}</p>

          <p className="text-xl font-semibold text-[#152C5B]">
            Price: <span className="font-bold">{price}₮</span>
          </p>

          <p className="text-sm text-gray-700">
            {registeredCount || 0} / {capacity || "—"} spots filled
          </p>

          <div>
            <span
              className={`inline-block px-4 py-1 rounded-full text-sm font-semibold ${
                availabilityStatus === "Full"
                  ? "bg-red-200 text-red-800"
                  : availabilityStatus === "Limited"
                  ? "bg-yellow-200 text-yellow-800"
                  : "bg-green-200 text-green-800"
              }`}
            >
              {availabilityStatus}
            </span>
          </div>

          {availabilityStatus === "Full" ? (
            <button
              disabled
              className="inline-block w-1/3 text-center bg-gray-400 text-white py-3 rounded cursor-not-allowed"
            >
              Registration Closed
            </button>
          ) : (
            <Link
              href={`/register?programId=${program._id}`}
              className="inline-block w-1/3 text-center bg-[#152C5B] text-white py-3 rounded hover:bg-[#1e3a5f] transition"
            >
              Register Now
            </Link>
          )}
        </div>

        {/* Teacher Section */}
        <div className="space-y-6">
          <div className="flex flex-col items-center text-center">
            <Image
              src={teacherPhoto}
              alt={teacherName || "Retreat Teacher"}
              width={120}
              height={120}
              className="rounded-full object-cover aspect-square"
            />
            <p className="text-lg font-bold mt-3">
              {teacherName || "No Teacher"}
            </p>
          </div>
        </div>
      </div>

      {/* Daily Schedule */}
      <div className="max-w-7xl mx-auto py-12 px-6">
        <h2 className="text-2xl font-bold border-b-2 border-[#152C5B] pb-2 mb-6">
          Daily Schedule
        </h2>
        <ul className="space-y-3 text-gray-700 text-base leading-relaxed">
          {[
            ["7:00 AM", "Morning Yoga Session"],
            ["8:30 AM", "Light Vegetarian Breakfast"],
            ["10:00 AM", "Guided Group Meditation"],
            ["12:00 PM", "Rest / Journaling"],
            ["1:00 PM", "Wholesome Lunch"],
            ["2:30 PM", "Nature Walk or Forest Bathing"],
            ["4:00 PM", "Mindfulness Workshop"],
            ["6:00 PM", "Dinner and Free Time"],
            ["8:00 PM", "Evening Chanting & Reflection"],
          ].map(([time, activity], i) => (
            <li key={i}>
              <span className="font-semibold text-[#152C5B]">{time} –</span>{" "}
              {activity}
            </li>
          ))}
        </ul>
      </div>

      {/* Testimonials */}
      <div className="max-w-7xl mx-auto py-12 px-6">
        <h2 className="text-2xl font-bold border-b-2 border-[#152C5B] pb-2 mb-6">
          What Participants Are Saying
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 font-neue">
          {[
            [
              "Enkhtuya B., Ulaanbaatar",
              "This retreat helped me reconnect with myself. The meditations were powerful, and the peaceful environment made it unforgettable.",
            ],
            [
              "Bat-Erdene T., Darkhan",
              "A life-changing experience. The teacher was so kind and wise, and every session felt like a gift.",
            ],
            [
              "Solongo M., Erdenet",
              "Everything from the food to the mindfulness practices was perfect. I’m already planning my next visit.",
            ],
            [
              "Tuvshintugs D., Khovd",
              "Deeply restorative. I came back with so much clarity and peace. Highly recommend this program.",
            ],
          ].map(([name, text], i) => (
            <div key={i} className="bg-white shadow-md rounded-lg p-6">
              <p className="text-gray-700 italic">“{text}”</p>
              <p className="mt-4 text-sm font-semibold text-[#152C5B]">
                – {name}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Logistics Section */}
      <div className="max-w-7xl mx-auto py-12 px-6">
        <h2 className="text-2xl font-bold border-b-2 border-[#152C5B] pb-2 mb-6">
          Logistics & Booking Information
        </h2>
        <div className="space-y-6 text-gray-700 text-base leading-relaxed">
          <div>
            <h3 className="text-xl font-semibold text-[#152C5B] mb-1">
              Schedule Overview
            </h3>
            <p>
              The program runs for 3 days and 2 nights. Activities begin each
              morning at 7:00 AM and end around 8:30 PM, with breaks and
              personal time.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-[#152C5B] mb-1">
              Accommodations
            </h3>
            <p>
              Private and shared rooms are available. Rooms include fresh
              linens, private bathrooms (for select rooms), and serene nature
              views.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-[#152C5B] mb-1">
              Pricing
            </h3>
            <p>
              The retreat price is <span className="font-bold">{price}₮</span>,
              which includes the program, meals, and lodging. Travel not
              included.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-[#152C5B] mb-1">
              How to Register
            </h3>
            <p>
              Click “Register Now” to begin. You'll be guided to pay a deposit
              and receive a confirmation email with instructions.
            </p>
            <p className="text-sm mt-2">
              {registeredCount || 0} / {capacity || "—"} spots filled
            </p>
            {availabilityStatus === "Full" ? (
              <button
                disabled
                className="inline-block w-1/5 mt-5 text-center bg-gray-400 text-white py-3 rounded cursor-not-allowed"
              >
                Registration Closed
              </button>
            ) : (
              <Link
                href={{
                  pathname: "/register",
                  query: { programId: _id.toString() },
                }}
                className="inline-block w-1/5 mt-5 text-center bg-[#152C5B] text-white py-3 rounded hover:bg-[#1e3a5f] transition"
              >
                Register Now
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="max-w-7xl mx-auto py-12 px-6 text-center">
        <h2 className="text-2xl font-bold text-[#152C5B] mb-4">
          Still Have Questions?
        </h2>
        <p className="text-gray-700 max-w-2xl mx-auto mb-6">
          For any inquiries about this retreat—lodging, meals, or
          transportation—our team is happy to help.
        </p>
        <Link
          href="/contact"
          className="inline-block bg-[#152C5B] text-white px-6 py-3 rounded hover:bg-[#1e3a5f] transition"
        >
          Contact Us
        </Link>
      </div>

      <Footer />
    </div>
  );
}
