import { getAllItems } from '@/services/items';

export async function GET() {
    const items = await getAllItems();
    return new Response(JSON.stringify(items), {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

