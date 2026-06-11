import { getAllItems, getItemsByCategory, deleteItem, createItem } from '@/services/items';
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
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
        return new NextResponse(JSON.stringify({ error: 'id is required' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    const res = await deleteItem(id);
    console.log(res);
    if (!res || res.changes === 0) {
        return new NextResponse(JSON.stringify({ error: 'Item not found' }), {
            status: 404,
            headers: { 'Content-Type': 'application/json' }
        });
    }
    return new NextResponse(JSON.stringify({ message: 'Item deleted successfully' }), {
        headers: { 'Content-Type': 'application/json' }
    });
}

export async function POST(request) {
    try {
        const body = await request.json();
        
        if (!body.title || !body.price || !body.category) {
            return new NextResponse(JSON.stringify({ error: 'title, price, and category are required' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const res = await createItem(body);
        return new NextResponse(JSON.stringify({ message: 'Item created successfully', id: res.lastInsertRowid }), {
            status: 201,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error(error);
        return new NextResponse(JSON.stringify({ error: 'Failed to create item' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
