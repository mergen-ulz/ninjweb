"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Image from "next/image";

export default function RegisterPageWrapper() {
  return (
    <Suspense
      fallback={<div className="text-center py-20">Түр хүлээнэ үү...</div>}
    >
      <RegisterPage />
    </Suspense>
  );
}

function RegisterPage() {
  const searchParams = useSearchParams();
  const preselectedId = searchParams.get("programId") || "";

  const [programs, setPrograms] = useState([]);
  const [selectedId, setSelectedId] = useState(preselectedId);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchPrograms = async () => {
      if (typeof window === "undefined") return;
      const res = await fetch("/api/public-programs");
      const data = await res.json();
    };

    fetchPrograms();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const payload = {
      programId: selectedId,
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      notes: formData.get("notes"),
    };

    const res = await fetch("/api/registrations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      setSuccess(true);
      e.target.reset();
      setSelectedId("");
    } else {
      alert("Бүртгэл амжилтгүй боллоо. Дахин оролдоно уу.");
    }
  };

  return (
    <>
      <div className="relative bg-[#152C5B] text-white flex flex-col justify-center items-center px-4 min-h-screen">
        <div className="absolute top-0 left-0 w-full">
          <NavBar />
        </div>

        <h1 className="text-4xl sm:text-5xl font-bold z-10 mt-20 text-center">
          Хөтөлбөрт бүртгүүлэх
        </h1>
        <p className="text-lg text-white/80 mt-4 text-center z-10">
          Доорх мэдээллийг бөглөж суудлаа баталгаажуулна уу.
        </p>
      </div>

      <main className="bg-[#ECE3DE] py-16 px-4">
        <div className="max-w-2xl mx-auto bg-white p-8 rounded shadow-md font-neue">
          {success && (
            <div className="bg-green-100 text-green-800 text-sm px-4 py-2 mb-6 rounded">
              Амжилттай бүртгэгдлээ!
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block mb-2 font-semibold text-lg">
                Хөтөлбөр сонгох
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {programs.map((p) => (
                  <div
                    key={p._id}
                    onClick={() => setSelectedId(p._id)}
                    className={`cursor-pointer border rounded-lg overflow-hidden shadow-sm transition hover:shadow-md ${
                      selectedId === p._id
                        ? "ring-2 ring-[#152C5B]"
                        : "border-gray-300"
                    }`}
                  >
                    <Image
                      src={p.image || "/images/placeholder.png"}
                      alt={p.title}
                      width={400}
                      height={200}
                      className="w-full h-40 object-cover"
                    />
                    <div className="p-3">
                      <p className="font-bold text-[#152C5B]">{p.title}</p>
                      <p className="text-sm text-gray-600">{p.subtitle}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <input type="hidden" name="programId" value={selectedId} />

            <div>
              <label className="block mb-1 font-semibold">Овог нэр</label>
              <input
                type="text"
                name="name"
                required
                className="w-full border px-4 py-2 rounded"
              />
            </div>

            <div>
              <label className="block mb-1 font-semibold">Имэйл хаяг</label>
              <input
                type="email"
                name="email"
                required
                className="w-full border px-4 py-2 rounded"
              />
            </div>

            <div>
              <label className="block mb-1 font-semibold">Утасны дугаар</label>
              <input
                type="number"
                name="phone"
                required
                className="w-full border px-4 py-2 rounded"
              />
            </div>

            <div>
              <label className="block mb-1 font-semibold">
                Нэмэлт мэдээлэл
              </label>
              <textarea
                name="notes"
                rows={3}
                className="w-full border px-4 py-2 rounded"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={!selectedId}
              className="w-full bg-[#152C5B] text-white py-2 rounded hover:bg-[#1b3974] transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Бүртгүүлэх
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </>
  );
}
