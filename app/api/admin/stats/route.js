import connectToDatabase from "@/lib/mongodb";
import Program from "@/models/Program";
import Registration from "@/models/Registration";
import Teacher from "@/models/Teacher";
import Visitor from "@/models/Visitor";

export async function GET() {
    try {
        await connectToDatabase();

        const [programs, teachers, registrations, visitorDoc] = await Promise.all([
            Program.countDocuments(),
            Teacher.countDocuments(),
            Registration.countDocuments(),
            Visitor.findOne(),
        ]);

        return new Response(
            JSON.stringify({
                programs,
                teachers,
                registrations,
                visitors: visitorDoc?.count || 0,
            }),
            { status: 200 }
        );
    } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), { status: 500 });
    }
}
