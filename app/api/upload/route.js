import { writeFile } from 'fs/promises';
import path from 'path';

export async function POST(req) {
    const formData = await req.formData();
    const file = formData.get('file');

    if (!file) {
        return new Response(JSON.stringify({ error: 'No file uploaded' }), { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const originalName = file.name;
    const cleanFileName = originalName.replace(/\s+/g, '-').toLowerCase();

    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    const filePath = path.join(uploadDir, cleanFileName);
    await writeFile(filePath, buffer);

    return new Response(JSON.stringify({ imagePath: `/uploads/${cleanFileName}` }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}
