"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Pencil, Trash2 } from "lucide-react";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function TeachersListPage() {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    const fetchTeachers = async () => {
      const res = await fetch("/api/teachers");
      const data = await res.json();
      setTeachers(data);
    };

    fetchTeachers();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Та энэ багшийг устгахдаа итгэлтэй байна уу?"
    );
    if (!confirmDelete) return;

    const res = await fetch(`/api/teachers/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setTeachers((prev) => prev.filter((t) => t._id !== id));
    } else {
      alert("Багшийг устгаж чадсангүй.");
    }
  };

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />

      <main className="flex-1 px-6 py-12 bg-gray-100 font-neue ml-64">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-[#152C5B]">
              Багшийн жагсаалт
            </h1>
            <Link
              href="/admin/teachers/new"
              className="bg-[#152C5B] text-white px-4 py-2 rounded hover:bg-[#1e3a5f]"
            >
              + Багш нэмэх
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full table-auto border border-gray-200 bg-white shadow-md rounded-lg overflow-hidden">
              <thead className="bg-[#152C5B] text-left text-sm font-semibold text-white">
                <tr>
                  <th className="px-4 py-3">Зураг</th>
                  <th className="px-4 py-3">Нэр</th>
                  <th className="px-4 py-3">Мэргэжил</th>
                  <th className="px-4 py-3">Үйлдэл</th>
                </tr>
              </thead>
              <tbody>
                {teachers.map((teacher) => (
                  <tr key={teacher._id} className="border-t">
                    <td className="px-4 py-3">
                      {teacher.photo ? (
                        <Image
                          src={teacher.photo}
                          alt={teacher.name}
                          width={48}
                          height={48}
                          className="rounded-full object-cover aspect-square"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-gray-300 rounded-full" />
                      )}
                    </td>
                    <td className="px-4 py-3 font-medium">{teacher.name}</td>
                    <td className="px-4 py-3">{teacher.occupation}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-4">
                        <Link
                          href={`/admin/teachers/${teacher._id}/edit`}
                          title="Засах"
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Pencil size={18} />
                        </Link>
                        <button
                          onClick={() => handleDelete(teacher._id)}
                          title="Устгах"
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {teachers.length === 0 && (
                  <tr>
                    <td
                      colSpan="4"
                      className="px-4 py-6 text-center text-gray-500"
                    >
                      Багш олдсонгүй.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
