import { getAllItems, getItemsByCategory, deleteItem } from '@/services/items';
import { NextResponse } from 'next/server';

// export async function GET() {
//     const items = await getAllItems();

//     return new NextResponse(JSON.stringify(items), {
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     });
// }


export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    if (category) {
        const items = await getItemsByCategory(category);
        return new NextResponse(JSON.stringify(items), {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } else {
        const items = await getAllItems();
        return new NextResponse(JSON.stringify(items), {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}

export async function DELETE(request) {
    const body = await request.json();
    const id = body.id;
    
    if (!id) {
        return new NextResponse(JSON.stringify({ error: 'id is required' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        });
    }
    
    await deleteItem(id);
    return new NextResponse(null, { status: 204 });
}
