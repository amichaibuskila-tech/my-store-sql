import { getAllItems, getItemsByCategory } from '@/services/items';
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

