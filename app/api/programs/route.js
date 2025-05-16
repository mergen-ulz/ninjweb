import connectToDatabase from '@/lib/mongodb';
import Program from '@/models/Program';
import mongoose from "mongoose";
import Teacher from "@/models/Teacher";


export async function POST(req) {
    try {
        const body = await req.json();
        await connectToDatabase();

        const program = await Program.create({
            ...body,
            teacher: body.teacher ? new mongoose.Types.ObjectId(body.teacher) : undefined,
        });

        return new Response(JSON.stringify(program), {
            status: 201,
            headers: { "Content-Type": "application/json" },
        });
    } catch (err) {
        console.error("POST error:", err);
        return new Response(JSON.stringify({ error: err.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}

export async function GET() {
    try {
        await connectToDatabase();
        const programs = await Program.find().populate("teacher");

        return new Response(JSON.stringify(programs), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (err) {
        console.error('GET error:', err);
        return new Response(JSON.stringify({ error: err.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
