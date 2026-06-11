import { NextResponse } from 'next/server';
import { createItems } from '@/services/items';

export async function POST(request) {
  try {
    const body = await request.json();
    if (!Array.isArray(body)) {
      return new NextResponse(JSON.stringify({ error: 'Expected an array of items' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    const items = body.map((it) => ({
      title: it.title || '',
      description: it.description || '',
      price: it.price != null ? Number(it.price) : 0,
      image: it.image || null,
      category: it.category || null,
    }));

    const res = await createItems(items);
    return new NextResponse(JSON.stringify({ message: 'Items inserted', inserted: res.inserted }), { status: 201, headers: { 'Content-Type': 'application/json' } });
  } catch (err) {
    console.error('Bulk insert error:', err);
    return new NextResponse(JSON.stringify({ error: 'Bulk insert failed' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
