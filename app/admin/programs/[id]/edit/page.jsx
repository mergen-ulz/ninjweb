"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditProgramPage() {
  const router = useRouter();
  const { id } = useParams();

  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    teacher: "",
    price: "",
    capacity: "",
    description: "",
    image: "",
    startDate: "",
    endDate: "",
    availabilityStatus: "Available",
  });

  const [teachers, setTeachers] = useState([]);
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    const fetchProgram = async () => {
      const res = await fetch(`/api/programs/${id}`);
      const data = await res.json();

      setForm({
        ...data,
        teacher: data.teacher?._id || data.teacher || "",
        capacity: data.capacity || "",
        startDate: new Date(data.startDate).toISOString().slice(0, 10),
        endDate: new Date(data.endDate).toISOString().slice(0, 10),
      });

      setImagePreview(data.image);
    };

    const fetchTeachers = async () => {
      const res = await fetch("/api/teachers");
      const data = await res.json();
      setTeachers(data);
    };

    if (id) {
      fetchProgram();
      fetchTeachers();
    }
  }, [id]);

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
      setForm((prev) => ({ ...prev, image: data.imagePath }));
      setImagePreview(data.imagePath);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = {
      ...form,
      price: Number(form.price),
      capacity: Number(form.capacity),
      startDate: new Date(form.startDate),
      endDate: new Date(form.endDate),
    };

    console.log("📤 Илгээж буй өгөгдөл:", updatedData);

    const res = await fetch(`/api/programs/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    });

    if (res.ok) {
      router.push("/admin/programs");
    } else {
      alert("Хөтөлбөр шинэчлэхэд алдаа гарлаа");
    }
  };

  return (
    <div className="max-w-xl mx-auto py-12 px-4 font-neue bg-white my-5 rounded-md">
      <h1 className="text-2xl font-bold mb-6">Хөтөлбөр засах</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          name="title"
          placeholder="Гарчиг"
          value={form.title}
          onChange={handleChange}
          className="bg-white w-full border p-2 rounded"
        />

        <input
          name="subtitle"
          placeholder="Дэд гарчиг"
          value={form.subtitle}
          onChange={handleChange}
          className="bg-white w-full border p-2 rounded"
        />

        <select
          name="teacher"
          value={form.teacher}
          onChange={handleChange}
          className="bg-white w-full border p-2 rounded"
          required
        >
          <option value="">-- Багш сонгоно уу --</option>
          {teachers.map((t) => (
            <option key={t._id} value={t._id}>
              {t.name} ({t.occupation})
            </option>
          ))}
        </select>

        <input
          name="price"
          placeholder="Үнэ"
          type="number"
          value={form.price}
          onChange={handleChange}
          className="bg-white w-full border p-2 rounded"
        />

        <input
          name="capacity"
          placeholder="Суудлын тоо"
          type="number"
          min="1"
          value={form.capacity}
          required
          onChange={handleChange}
          className="bg-white w-full border p-2 rounded"
        />

        <textarea
          name="description"
          placeholder="Тайлбар"
          value={form.description}
          onChange={handleChange}
          className="bg-white w-full border p-2 rounded"
          rows={4}
        />

        <input
          name="startDate"
          type="date"
          value={form.startDate}
          onChange={handleChange}
          className="bg-white w-full border p-2 rounded"
        />

        <input
          name="endDate"
          type="date"
          value={form.endDate}
          onChange={handleChange}
          className="bg-white w-full border p-2 rounded"
        />

        <select
          name="availabilityStatus"
          value={form.availabilityStatus}
          onChange={handleChange}
          className="bg-white w-full border p-2 rounded"
        >
          <option value="Available">Нээлттэй</option>
          <option value="Limited">Хязгаартай</option>
          <option value="Full">Дүүрсэн</option>
        </select>

        {imagePreview && (
          <img
            src={imagePreview}
            alt="зураг"
            className="bg-white w-full h-40 object-cover rounded"
          />
        )}

        <input type="file" onChange={handleImageChange} />

        <button
          type="submit"
          className="w-full bg-[#152C5B] text-white py-2 px-4 rounded hover:bg-[#1e3a5f] transition"
        >
          Өөрчлөлт хадгалах
        </button>
      </form>
    </div>
  );
}
