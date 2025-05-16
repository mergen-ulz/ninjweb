// /app/api/public-programs/route.js
import connectToDatabase from '@/lib/mongodb';
import Program from '@/models/Program';

export async function GET() {
    try {
        await connectToDatabase();
        const programs = await Program.find()
            .sort({ createdAt: -1 })
            .limit(3)
            .lean();

        const programsWithNights = programs.map((p) => {
            const oneDay = 1000 * 60 * 60 * 24;
            const nights = p.startDate && p.endDate
                ? Math.round((new Date(p.endDate) - new Date(p.startDate)) / oneDay)
                : 0;
            return { ...p, nights };
        });

        return new Response(JSON.stringify(programsWithNights), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), {
            status: 500,
        });
    }
}
