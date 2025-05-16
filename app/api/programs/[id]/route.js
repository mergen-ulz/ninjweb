import connectToDatabase from "@/lib/mongodb";
import Program from "@/models/Program";
import { NextResponse } from "next/server";


export async function DELETE(req, contextPromise) {
    const { params } = await contextPromise;

    try {
        await connectToDatabase();
        const deleted = await Program.findByIdAndDelete(params.id);

        if (!deleted) {
            return NextResponse.json({ error: "Program not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Program deleted" });
    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}


export async function GET(req, contextPromise) {
    const { params } = await contextPromise;

    try {
        await connectToDatabase();
        const program = await Program.findById(params.id).populate("teacher");

        if (!program) {
            return NextResponse.json({ error: "Program not found" }, { status: 404 });
        }

        return NextResponse.json(program);
    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}


export async function PUT(req, contextPromise) {
    const { params } = await contextPromise;

    try {
        const body = await req.json();
        console.log("Incoming update:", body);

        await connectToDatabase();

        const updated = await Program.findByIdAndUpdate(params.id, body, {
            new: true,
            runValidators: true,
        });

        if (!updated) {
            return NextResponse.json({ error: "Program not found" }, { status: 404 });
        }

        return NextResponse.json(updated);
    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
