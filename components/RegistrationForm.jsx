"use client";

export default function RegistrationForm({ programId }) {
  return (
    <div className="mt-12 bg-white p-6 rounded shadow max-w-2xl mx-auto">
      <h2 className="text-xl font-bold text-[#152C5B] mb-4">
        Register for this Program
      </h2>

      <form
        className="space-y-4"
        onSubmit={async (e) => {
          e.preventDefault();

          const formData = new FormData(e.target);
          const payload = {
            programId,
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
            alert("✅ Registered successfully!");
            e.target.reset();
          } else {
            alert("❌ Registration failed.");
          }
        }}
      >
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          required
          className="w-full border px-4 py-2 rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          required
          className="w-full border px-4 py-2 rounded"
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          required
          className="w-full border px-4 py-2 rounded"
        />
        <textarea
          name="notes"
          placeholder="Notes (optional)"
          rows="3"
          className="w-full border px-4 py-2 rounded"
        ></textarea>
        <button
          type="submit"
          className="w-full bg-[#152C5B] text-white py-2 rounded hover:bg-[#1b3974] transition"
        >
          Register
        </button>
      </form>
    </div>
  );
}
