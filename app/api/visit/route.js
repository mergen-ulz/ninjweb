import connectToDatabase from "@/lib/mongodb";
import Visitor from "@/models/Visitor";

export async function POST() {
    await connectToDatabase();

    let visitor = await Visitor.findOne();

    if (!visitor) {
        visitor = await Visitor.create({ count: 1 });
    } else {
        visitor.count += 1;
        await visitor.save();
    }

    return new Response(JSON.stringify({ success: true, count: visitor.count }), {
        status: 200,
    });
}
