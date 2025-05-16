"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import Link from "next/link";
import { Pencil, Trash2, PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminProgramsPage() {
  const [programs, setPrograms] = useState([]);
  const [sortBy, setSortBy] = useState("startDate");
  const [sortOrder, setSortOrder] = useState("asc");
  const router = useRouter();

  useEffect(() => {
    async function fetchPrograms() {
      const res = await fetch("/api/programs");
      const data = await res.json();

      const sorted = [...data].sort((a, b) => {
        let aVal = a[sortBy];
        let bVal = b[sortBy];

        if (sortBy === "startDate" || sortBy === "endDate") {
          aVal = new Date(aVal);
          bVal = new Date(bVal);
        } else if (sortBy === "price") {
          aVal = Number(aVal);
          bVal = Number(bVal);
        } else if (sortBy === "nights") {
          const aNights = new Date(a.endDate) - new Date(a.startDate);
          const bNights = new Date(b.endDate) - new Date(b.startDate);
          aVal = aNights;
          bVal = bNights;
        } else {
          aVal = String(aVal).toLowerCase();
          bVal = String(bVal).toLowerCase();
        }

        if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
        if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
        return 0;
      });

      setPrograms(sorted);
    }

    fetchPrograms();
  }, [sortBy, sortOrder]);

  const handleDelete = async (id) => {
    const confirmed = confirm(
      "Та энэ хөтөлбөрийг устгахдаа итгэлтэй байна уу?"
    );
    if (!confirmed) return;

    const res = await fetch(`/api/programs/${id}`, { method: "DELETE" });

    if (res.ok) {
      setPrograms((prev) => prev.filter((p) => p._id !== id));
    } else {
      alert("Хөтөлбөрийг устгаж чадсангүй");
    }
  };

  const toggleSort = (field) => {
    if (sortBy === field) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  const renderSortIcon = (field) =>
    sortBy === field ? (sortOrder === "asc" ? "↑" : "↓") : "";

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />

      <div className="flex-1 px-6 py-12 bg-gray-100 relative ml-64">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold text-gray-800">
              Хөтөлбөрийн жагсаалт
            </h1>
            <Link
              href="/admin/programs/new"
              className="inline-flex items-center gap-2 bg-[#152C5B] text-white px-4 py-2 rounded hover:bg-[#1f3d73] transition"
            >
              <PlusCircle size={18} />
              Хөтөлбөр нэмэх
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow-sm">
              <thead className="bg-[#152C5B] text-white text-left text-sm rounded">
                <tr>
                  {[
                    { key: "image", label: "Зураг" },
                    { key: "title", label: "Гарчиг" },
                    { key: "subtitle", label: "Дэд гарчиг" },
                    { key: "startDate", label: "Эхлэх огноо" },
                    { key: "endDate", label: "Дуусах огноо" },
                    { key: "nights", label: "Шөнө" },
                    { key: "teacher", label: "Багш" },
                    { key: "price", label: "Үнэ (₮)" },
                    { key: "registeredCount", label: "Бүртгүүлсэн" },
                    { key: "capacity", label: "Хүний хязгаар" },
                    { key: "availabilityStatus", label: "Төлөв" },
                  ].map((col) => (
                    <th
                      key={col.key}
                      onClick={() => toggleSort(col.key)}
                      className="px-4 py-3 cursor-pointer select-none"
                    >
                      {col.label} <span>{renderSortIcon(col.key)}</span>
                    </th>
                  ))}
                  <th className="px-4 py-3">Үйлдэл</th>
                </tr>
              </thead>

              <tbody>
                {programs.map((program) => {
                  const start = new Date(program.startDate);
                  const end = new Date(program.endDate);
                  const nights = Math.round(
                    (end - start) / (1000 * 60 * 60 * 24)
                  );

                  return (
                    <tr
                      key={program._id}
                      className="border-t text-sm text-gray-800"
                    >
                      <td className="px-4 py-3">
                        <img
                          src={program.image || "/placeholder.png"}
                          alt={program.title}
                          className="w-16 h-16 object-cover rounded"
                        />
                      </td>
                      <td className="px-4 py-3 font-medium">{program.title}</td>
                      <td className="px-4 py-3">{program.subtitle}</td>
                      <td className="px-4 py-3">
                        {start.toLocaleDateString("en-CA")}
                      </td>
                      <td className="px-4 py-3">
                        {end.toLocaleDateString("en-CA")}
                      </td>
                      <td className="px-4 py-3">{nights}</td>
                      <td className="px-4 py-3">
                        {program.teacher?.name || "Байхгүй"}
                      </td>
                      <td className="px-4 py-3">
                        {program.price?.toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-center">
                        {program.registeredCount || 0}
                      </td>
                      <td className="px-4 py-3 text-center">
                        {program.capacity || "-"}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-3 py-1 rounded-3xl text-xs font-semibold ${
                            program.availabilityStatus === "Full"
                              ? "bg-red-200 text-red-800"
                              : program.availabilityStatus === "Limited"
                              ? "bg-yellow-200 text-yellow-800"
                              : "bg-green-200 text-green-800"
                          }`}
                        >
                          {{
                            Full: "Дүүрсэн",
                            Limited: "Хязгаартай",
                            Available: "Нээлттэй",
                          }[program.availabilityStatus] ||
                            program.availabilityStatus}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <Link href={`/admin/programs/${program._id}/edit`}>
                            <Pencil
                              size={18}
                              className="text-blue-600 hover:text-blue-800 transition"
                            />
                          </Link>
                          <button
                            onClick={() => handleDelete(program._id)}
                            className="text-red-500 hover:text-red-700 transition"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {programs.length === 0 && (
                  <tr>
                    <td colSpan="12" className="text-center py-6 text-gray-500">
                      Хөтөлбөр олдсонгүй.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
