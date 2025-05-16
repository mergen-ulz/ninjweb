import connectToDatabase from "@/lib/mongodb";
import Teacher from "@/models/Teacher";

export async function DELETE(req, { params }) {
    try {
        await connectToDatabase();
        await Teacher.findByIdAndDelete(params.id);

        return new Response(JSON.stringify({ message: "Teacher deleted" }), {
            status: 200,
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
        });
    }
}

export async function GET(_, { params }) {
    try {
        await connectToDatabase();
        const teacher = await Teacher.findById(params.id);
        return new Response(JSON.stringify(teacher), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}

export async function PUT(req, { params }) {
    try {
        await connectToDatabase();
        const body = await req.json();
        const updated = await Teacher.findByIdAndUpdate(params.id, body, { new: true });
        return new Response(JSON.stringify(updated), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}

