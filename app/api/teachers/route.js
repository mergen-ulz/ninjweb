import { writeFile } from 'fs/promises';
import path from 'path';
import connectToDatabase from '@/lib/mongodb';
import Teacher from '@/models/Teacher';

export async function POST(req) {
    try {
        const formData = await req.formData();

        const name = formData.get("name");
        const occupation = formData.get("occupation");
        const bio = formData.get("bio");
        const photo = formData.get("photo");

        await connectToDatabase();

        let imageUrl = "";

        if (photo && typeof photo === "object") {
            const buffer = Buffer.from(await photo.arrayBuffer());
            const filename = `${Date.now()}-${photo.name}`;
            const filepath = path.join(process.cwd(), "public", "uploads", filename);

            await writeFile(filepath, buffer);
            imageUrl = `/uploads/${filename}`;
        }

        const newTeacher = new Teacher({
            name,
            occupation,
            bio,
            photo: imageUrl,
        });

        await newTeacher.save();

        return new Response(JSON.stringify({ message: "Teacher created" }), {
            status: 201,
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
        });
    }
}

export async function GET() {
    try {
        await connectToDatabase();
        const teachers = await Teacher.find().sort({ createdAt: -1 });
        return new Response(JSON.stringify(teachers), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
        });
    }
}
