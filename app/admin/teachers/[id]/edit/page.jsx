"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { UploadCloud } from "lucide-react";
import Image from "next/image";

export default function EditTeacherPage() {
  const { id } = useParams();
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    occupation: "",
    bio: "",
    photo: "",
  });

  const [imagePreview, setImagePreview] = useState(null);

  // Багшийн мэдээллийг авах
  useEffect(() => {
    const fetchTeacher = async () => {
      const res = await fetch(`/api/teachers/${id}`);
      const data = await res.json();
      setForm(data);
      setImagePreview(data.photo);
    };

    fetchTeacher();
  }, [id]);

  // Зураг оруулах
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
      setForm((prev) => ({ ...prev, photo: data.imagePath }));
      setImagePreview(data.imagePath);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`/api/teachers/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      alert("Багшийн мэдээлэл шинэчлэгдлээ!");
      router.push("/admin/teachers");
    } else {
      alert("Шинэчлэхэд алдаа гарлаа.");
    }
  };

  return (
    <div className="min-h-screen px-6 py-12 bg-gray-100 flex justify-center font-neue">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-2xl">
        <h1 className="text-2xl font-bold mb-6 text-[#152C5B]">Багш засах</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Нэр */}
          <div>
            <label className="block text-sm font-semibold text-[#152C5B] mb-1">
              Нэр
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full bg-white border p-2 rounded"
              required
            />
          </div>

          {/* Мэргэжил */}
          <div>
            <label className="block text-sm font-semibold text-[#152C5B] mb-1">
              Мэргэжил
            </label>
            <input
              name="occupation"
              value={form.occupation}
              onChange={handleChange}
              className="w-full bg-white border p-2 rounded"
            />
          </div>

          {/* Танилцуулга */}
          <div>
            <label className="block text-sm font-semibold text-[#152C5B] mb-1">
              Богино танилцуулга
            </label>
            <textarea
              name="bio"
              value={form.bio}
              onChange={handleChange}
              rows={4}
              className="w-full bg-white border p-2 rounded"
            />
          </div>

          {/* Зураг оруулах */}
          <div>
            <label className="block text-sm font-semibold text-[#152C5B] mb-1">
              Профайл зураг
            </label>
            <label
              htmlFor="photoUpload"
              className="block border-2 border-dashed border-gray-300 rounded-md p-4 text-center cursor-pointer bg-gray-50 hover:bg-gray-100"
            >
              <div className="flex flex-col items-center">
                <UploadCloud className="mb-2 text-gray-500" size={28} />
                <span className="text-sm text-gray-500">
                  {imagePreview ? "Зураг солих" : "Зураг оруулах"}
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

            {imagePreview && (
              <Image
                src={imagePreview}
                alt="Preview"
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
            Багшийг шинэчлэх
          </button>
        </form>
      </div>
    </div>
  );
}
