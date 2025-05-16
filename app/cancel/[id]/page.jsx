import { notFound, redirect } from "next/navigation";
import connectToDatabase from "@/lib/mongodb";
import Registration from "@/models/Registration";

export default async function CancelRegistrationPage({ params }) {
  const { id } = params;

  await connectToDatabase();
  const deleted = await Registration.findByIdAndDelete(id);

  if (!deleted) return notFound();

  return (
    <div className="text-center py-20 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold text-red-600 mb-4">
        Бүртгэл амжилттай цуцлагдлаа
      </h1>
      <p>
        Та дахин бүртгүүлэхийг хүсвэл{" "}
        <a href="/register" className="underline text-blue-600">
          энд дарна уу
        </a>
        .
      </p>
    </div>
  );
}
