"use client";

import { useState } from "react";
import Image from "next/image";
import { UploadCloud } from "lucide-react";

export default function AddTeacherPage() {
  const [form, setForm] = useState({
    name: "",
    occupation: "",
    bio: "",
    photo: null,
  });

  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, photo: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setForm({ ...form, photo: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleDragOver = (e) => e.preventDefault();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", form.name);
    data.append("occupation", form.occupation);
    data.append("bio", form.bio);
    if (form.photo) data.append("photo", form.photo);

    const res = await fetch("/api/teachers", {
      method: "POST",
      body: data,
    });

    if (res.ok) {
      alert("Багш амжилттай нэмэгдлээ!");
      setForm({ name: "", occupation: "", bio: "", photo: null });
      setPreview(null);
    } else {
      alert("Алдаа гарлаа.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-lg mt-5">
      <h1 className="text-2xl font-bold mb-6 text-[#152C5B]">
        Шинэ багш нэмэх
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Нэр */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-semibold text-[#152C5B] mb-1"
          >
            Нэр
          </label>
          <input
            id="name"
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full bg-white border p-2 rounded"
            required
          />
        </div>

        {/* Мэргэжил */}
        <div>
          <label
            htmlFor="occupation"
            className="block text-sm font-semibold text-[#152C5B] mb-1"
          >
            Мэргэжил
          </label>
          <input
            id="occupation"
            type="text"
            name="occupation"
            value={form.occupation}
            onChange={handleChange}
            className="w-full bg-white border p-2 rounded"
          />
        </div>

        {/* Танилцуулга */}
        <div>
          <label
            htmlFor="bio"
            className="block text-sm font-semibold text-[#152C5B] mb-1"
          >
            Богино танилцуулга
          </label>
          <textarea
            id="bio"
            name="bio"
            value={form.bio}
            onChange={handleChange}
            className="w-full bg-white border p-2 rounded"
            rows={4}
          />
        </div>

        {/* Зураг оруулах */}
        <div>
          <label className="block text-sm font-semibold text-[#152C5B] mb-1">
            Профайл зураг
          </label>
          <label
            htmlFor="photoUpload"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className="block border-2 border-dashed border-gray-300 rounded-md p-4 text-center cursor-pointer bg-gray-50 hover:bg-gray-100"
          >
            <div className="flex flex-col items-center">
              <UploadCloud className="mb-2 text-gray-500" size={28} />
              <span className="text-sm text-gray-500">
                {preview ? "Зураг солих" : "Чирж оруулах эсвэл дарж сонгох"}
              </span>
            </div>
            <input
              type="file"
              id="photoUpload"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>

          {preview && (
            <Image
              src={preview}
              alt="Урьдчилсан харагдац"
              width={200}
              height={200}
              className="mt-4 rounded-full object-cover mx-auto aspect-square"
            />
          )}
        </div>

        {/* Илгээх */}
        <button
          type="submit"
          className="w-full bg-[#152C5B] text-white py-2 rounded hover:bg-[#1e3a5f] transition"
        >
          Багш хадгалах
        </button>
      </form>
    </div>
  );
}
