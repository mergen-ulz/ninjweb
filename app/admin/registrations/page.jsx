"use client";

import { useEffect, useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { Trash2 } from "lucide-react";

export default function AdminRegistrationsPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchRegistrations = async () => {
      const res = await fetch("/api/registrations");
      const json = await res.json();
      setData(json.grouped || []);
    };

    fetchRegistrations();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      <main className="flex-1 p-8 font-neue ml-64">
        <h1 className="text-2xl font-bold mb-6 text-[#152C5B]">
          Бүртгэлийн жагсаалт
        </h1>

        {data.length === 0 ? (
          <p className="text-gray-500">Одоогоор бүртгэл алга байна.</p>
        ) : (
          data.map(({ program, registrations }) => (
            <div
              key={program._id}
              className="mb-10 bg-white rounded shadow p-6 border border-gray-200"
            >
              <h2 className="text-xl font-semibold text-[#152C5B] mb-4">
                {program.title} – {program.subtitle}
              </h2>

              <table className="w-full text-sm table-auto">
                <thead className="bg-[#F4F7FB]">
                  <tr>
                    <th className="text-left px-4 py-2">Нэр</th>
                    <th className="text-left px-4 py-2">И-мэйл</th>
                    <th className="text-left px-4 py-2">Утас</th>
                    <th className="text-left px-4 py-2">Тэмдэглэл</th>
                    <th className="text-left px-4 py-2">Огноо</th>
                    <th className="text-left px-4 py-2">Төлсөн эсэх</th>
                    <th className="text-left px-4 py-2">Үйлдэл</th>
                  </tr>
                </thead>
                <tbody>
                  {registrations.map((r) => (
                    <tr key={r._id} className="border-t">
                      <td className="px-4 py-2">{r.name}</td>
                      <td className="px-4 py-2">{r.email}</td>
                      <td className="px-4 py-2">{r.phone}</td>
                      <td className="px-4 py-2">{r.notes || "-"}</td>
                      <td className="px-4 py-2">
                        {new Date(r.createdAt).toLocaleDateString()}
                      </td>

                      {/* Paid Toggle */}
                      <td className="px-4 py-2">
                        <button
                          onClick={async () => {
                            const res = await fetch(
                              `/api/registrations/${r._id}`,
                              {
                                method: "PUT",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({ paid: !r.paid }),
                              }
                            );

                            if (res.ok) {
                              setData((prev) =>
                                prev.map((group) => ({
                                  ...group,
                                  registrations: group.registrations.map(
                                    (reg) =>
                                      reg._id === r._id
                                        ? { ...reg, paid: !r.paid }
                                        : reg
                                  ),
                                }))
                              );
                            }
                          }}
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            r.paid
                              ? "bg-green-200 text-green-800"
                              : "bg-yellow-200 text-yellow-800"
                          }`}
                        >
                          {r.paid ? "Төлсөн" : "Төлөөгүй"}
                        </button>
                      </td>

                      {/* Delete Button */}
                      <td className="px-4 py-2">
                        <button
                          onClick={async () => {
                            const confirm = window.confirm(
                              "Энэ бүртгэлийг устгах уу?"
                            );
                            if (!confirm) return;
                            const res = await fetch(
                              `/api/registrations/${r._id}`,
                              {
                                method: "DELETE",
                              }
                            );
                            if (res.ok) {
                              setData((prev) =>
                                prev
                                  .map((group) => ({
                                    ...group,
                                    registrations: group.registrations.filter(
                                      (reg) => reg._id !== r._id
                                    ),
                                  }))
                                  .filter(
                                    (group) => group.registrations.length > 0
                                  )
                              );
                            }
                          }}
                          title="Устгах"
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))
        )}
      </main>
    </div>
  );
}
