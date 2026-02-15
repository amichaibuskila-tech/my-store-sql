import { getAllItems } from '@/services/items';
import { NextResponse } from 'next/server';

export async function GET() {
    const items = await getAllItems();
    // const items = [
    //     {
    //         id: 1,
    //         name: 'Item 1',
    //         price: 100
    //     }
    // ];

    return new NextResponse(JSON.stringify(items), {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}