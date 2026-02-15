import { getAllItems } from '@/services/mongo.js';
import { NextResponse } from 'next/server';

export async function GET() {
    const items = await getAllItems();
    return new NextResponse(JSON.stringify(items), {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}