import connectToDatabase from "@/lib/mongodb";
import Registration from "@/models/Registration";
import { NextResponse } from "next/server";
import Program from "@/models/Program";
import { sendConfirmationEmail } from "@/lib/mailer";

export async function POST(req) {
    try {
        const body = await req.json();
        const { programId, name, email, phone, notes } = body;

        if (!programId || !name || !email || !phone) {
            return NextResponse.json(
                { error: "Missing required fields." },
                { status: 400 }
            );
        }

        await connectToDatabase();

        const program = await Program.findById(programId);

        if (!program) {
            return NextResponse.json({ error: "Program not found." }, { status: 404 });
        }

        if (
            typeof program.capacity === "number" &&
            program.registeredCount >= program.capacity
        ) {
            return NextResponse.json(
                { error: "This program is already full." },
                { status: 400 }
            );
        }

        const registration = await Registration.create({
            programId,
            name,
            email,
            phone,
            notes,
        });

        program.registeredCount = (program.registeredCount || 0) + 1;

        if (
            typeof program.capacity === "number" &&
            program.registeredCount >= program.capacity
        ) {
            program.availabilityStatus = "Full";
        }

        await program.save();

        await sendConfirmationEmail({
            to: email,
            name,
            programTitle: program.title,
            startDate: program.startDate,
            endDate: program.endDate,
        });

        return NextResponse.json({ message: "Registered successfully!" }, { status: 201 });
    } catch (err) {
        console.error("Registration error:", err);
        return NextResponse.json(
            { error: "Something went wrong." },
            { status: 500 }
        );
    }
}


export async function GET() {
    try {
        await connectToDatabase();

        const registrations = await Registration.find().sort({ createdAt: -1 }).lean();
        const programs = await Program.find().lean();

        const grouped = programs.map((program) => ({
            program,
            registrations: registrations.filter((r) => r.programId.toString() === program._id.toString()),
        })).filter((group) => group.registrations.length > 0);

        return new Response(JSON.stringify({ grouped }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (err) {
        return new Response(
            JSON.stringify({ error: err.message }),
            { status: 500 }
        );
    }
}