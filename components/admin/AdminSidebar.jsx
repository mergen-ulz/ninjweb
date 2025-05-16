"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const links = [
    { href: "/admin/dashboard", label: "Хяналтын Самбар" },
    { href: "/admin/programs", label: "Хөтөлбөр" },
    { href: "/admin/teachers", label: "Багш" },
    { href: "/admin/calendar", label: "Хуанли" },
    { href: "/admin/registrations", label: "Бүртгэл" },
  ];

  const handleLogout = async () => {
    await fetch("/api/admin/logout");
    toast.success("Та системээс гарлаа.");
    setTimeout(() => router.push("/admin/login"), 1000);
  };

  return (
    <aside className="w-64 bg-[#152C5B] text-white h-screen fixed top-0 left-0 px-4 py-6 flex flex-col justify-between z-50">
      <div>
        <h2 className="text-xl font-bold mb-6">Админ цэс</h2>
        <nav className="flex flex-col gap-3">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`px-2 py-1 rounded hover:bg-[#1e3a5f] ${
                pathname.startsWith(href) ? "bg-[#1e3a5f]" : ""
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>

      <button
        onClick={handleLogout}
        className="text-sm w-full text-left px-3 py-2 rounded hover:bg-red-900 transition"
      >
        Гарах
      </button>
    </aside>
  );
}
