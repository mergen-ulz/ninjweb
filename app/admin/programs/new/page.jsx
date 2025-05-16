"use client";

import { useRouter } from "next/navigation";
import { UploadCloud } from "lucide-react";
import { useEffect, useState } from "react";

export default function AddProgramPage() {
  const router = useRouter();
  const [imagePreview, setImagePreview] = useState(null);

  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    teacher: "",
    price: "",
    capacity: "",
    description: "",
    image: null,
    startDate: "",
    endDate: "",
    availabilityStatus: "Available",
  });

  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    const fetchTeachers = async () => {
      const res = await fetch("/api/teachers");
      const data = await res.json();
      setTeachers(data);
    };

    fetchTeachers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (data.imagePath) {
      setForm({ ...form, image: data.imagePath });
      setImagePreview(data.imagePath);
    } else {
      alert("Зураг байршуулахад алдаа гарлаа");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const programData = {
      ...form,
      price: Number(form.price),
      capacity: Number(form.capacity),
      image: form.image,
      startDate: new Date(form.startDate),
      endDate: new Date(form.endDate),
    };

    const res = await fetch("/api/programs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(programData),
    });

    if (res.ok) {
      router.push("/admin/dashboard");
    } else {
      alert("Хөтөлбөр хадгалахад алдаа гарлаа");
    }
  };

  return (
    <div className="min-h-screen px-6 py-12 bg-gray-100 flex justify-center font-neue">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-6 text-[#152C5B]">
          Шинэ хөтөлбөр нэмэх
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Text Inputs */}
          {["title", "subtitle", "price", "capacity"].map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium capitalize">
                {
                  {
                    title: "Хөтөлбөрийн нэр",
                    subtitle: "Хөтөлбөрийн тайлбар",
                    price: "Үнэ",
                    capacity: "Суудлын тоо",
                  }[field]
                }
              </label>
              <input
                name={field}
                min={field === "price" || field === "capacity" ? 1 : undefined}
                value={form[field]}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded"
              />
            </div>
          ))}

          {/* Teacher */}
          <div>
            <label className="block text-sm font-medium mb-1">Багш</label>

            {teachers.length === 0 ? (
              <div className="bg-yellow-50 border border-yellow-300 text-yellow-800 p-4 rounded text-sm">
                <p className="mb-2">Багш бүртгэгдээгүй байна.</p>
                <a
                  href="/admin/teachers/new"
                  className="inline-block bg-[#152C5B] text-white px-4 py-2 rounded hover:bg-[#1b3974] transition text-sm"
                >
                  Багш нэмэх
                </a>
              </div>
            ) : (
              <select
                name="teacher"
                value={form.teacher}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded bg-white"
              >
                <option value="">-- Багш сонгоно уу --</option>
                {teachers.map((t) => (
                  <option key={t._id} value={t._id}>
                    {t.name} ({t.occupation})
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium">Тайлбар</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 border rounded"
            />
          </div>

          {/* Start Date */}
          <div>
            <label className="block text-sm font-medium">Эхлэх огноо</label>
            <input
              type="date"
              name="startDate"
              value={form.startDate}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded"
            />
          </div>

          {/* End Date */}
          <div>
            <label className="block text-sm font-medium">Дуусах огноо</label>
            <input
              type="date"
              name="endDate"
              value={form.endDate}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded"
            />
          </div>

          {/* Availability */}
          <div>
            <label className="block text-sm font-medium">
              Элсэх боломжтой эсэх
            </label>
            <select
              name="availabilityStatus"
              value={form.availabilityStatus}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
            >
              <option value="Available">Нээлттэй</option>
              <option value="Limited">Хязгаартай</option>
              <option value="Full">Дүүрсэн</option>
            </select>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Хөтөлбөрийн зураг
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-md p-4 flex items-center justify-center cursor-pointer bg-gray-50 hover:bg-gray-100">
              <label
                htmlFor="imageUpload"
                className="flex flex-col items-center cursor-pointer"
              >
                <UploadCloud className="mb-2 text-gray-500" size={28} />
                <span className="text-sm text-gray-500">
                  {imagePreview
                    ? "Зураг солих"
                    : "Зургаа чирж эсвэл дарж оруулна уу"}
                </span>
              </label>
              <input
                type="file"
                id="imageUpload"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="mt-4 w-full max-h-60 object-cover rounded"
              />
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-[#152C5B] text-white py-2 rounded hover:bg-[#1b3974] transition"
          >
            Хөтөлбөр хадгалах
          </button>
        </form>
      </div>
    </div>
  );
}
