import connectToDatabase from "@/lib/mongodb";
import Registration from "@/models/Registration";
import { NextResponse } from "next/server";

// ✅ PUT — update paid status
export async function PUT(req, context) {
    const { id } = context.params;

    try {
        await connectToDatabase();
        const { paid } = await req.json();

        const updated = await Registration.findByIdAndUpdate(
            id,
            { paid },
            { new: true, runValidators: true }
        );

        if (!updated) {
            return NextResponse.json({ error: "Registration not found" }, { status: 404 });
        }

        return NextResponse.json(updated);
    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

// ✅ DELETE — remove registration
export async function DELETE(req, context) {
    const { id } = context.params;

    try {
        await connectToDatabase();

        const deleted = await Registration.findByIdAndDelete(id);
        if (!deleted) {
            return NextResponse.json({ error: "Registration not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Deleted successfully" });
    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
