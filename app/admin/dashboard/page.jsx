"use client";

import { useEffect, useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { BookOpenText, Users2, UserCheck } from "lucide-react";
import Link from "next/link";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    programs: 0,
    teachers: 0,
    registrations: 0,
    visitors: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      const res = await fetch("/api/admin/stats");
      const data = await res.json();
      setStats(data);
    };

    fetchStats();
  }, []);

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />

      <main className="flex-1 px-6 py-12 bg-gray-100 font-neue ml-64">
        <h1 className="text-3xl font-bold mb-8 text-[#152C5B]">
          Хяналтын Самбар
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Programs */}
          <div className="bg-white rounded-lg shadow-md p-6 flex items-center gap-4 border-l-4 border-blue-500">
            <BookOpenText className="text-blue-500" size={40} />
            <div>
              <p className="text-sm text-gray-500">Нийт хөтөлбөрүүд</p>
              <p className="text-2xl font-bold">{stats.programs}</p>
            </div>
          </div>

          {/* Teachers */}
          <div className="bg-white rounded-lg shadow-md p-6 flex items-center gap-4 border-l-4 border-green-500">
            <Users2 className="text-green-500" size={40} />
            <div>
              <p className="text-sm text-gray-500">Нийт багш нар</p>
              <p className="text-2xl font-bold">{stats.teachers}</p>
            </div>
          </div>

          {/* Registered Users */}
          <div className="bg-white rounded-lg shadow-md p-6 flex items-center gap-4 border-l-4 border-purple-500">
            <UserCheck className="text-purple-500" size={40} />
            <div>
              <p className="text-sm text-gray-500">Бүртгүүлсэн хэрэглэгчид</p>
              <p className="text-2xl font-bold">{stats.registrations}</p>
            </div>
          </div>

          {/* Visitors */}
          <div className="bg-white rounded-lg shadow-md p-6 flex items-center gap-4 border-l-4 border-gray-500">
            <span className="text-gray-500 text-4xl">👁️</span>
            <div>
              <p className="text-sm text-gray-500">
                Вэб хуудсанд зочилсон хүмүүсийн тоо
              </p>
              <p className="text-2xl font-bold">{stats.visitors}</p>
            </div>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href="/admin/programs"
            className="bg-[#152C5B] text-white py-3 text-center rounded-lg hover:bg-[#1b3974]"
          >
            Бүх хөтөлбөрийг харах
          </Link>
          <Link
            href="/admin/teachers"
            className="bg-[#107FBB] text-white py-3 text-center rounded-lg hover:bg-[#0e6da3]"
          >
            Бүх багш нарыг харах
          </Link>
        </div>
      </main>
    </div>
  );
}
