import { NextResponse } from 'next/server';
import { upsertUserByEmail } from '@/services/users';

export async function POST(request) {
  try {
    const body = await request.json();
    const { uid, name, email, photoURL } = body;

    if (!email) {
      return new NextResponse(JSON.stringify({ error: 'email is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const userPayload = {
      uid,
      name: name || '',
      email,
      photoURL: photoURL || '',
      googleId: uid,
      provider: 'google',
    };

    const user = await upsertUserByEmail(userPayload);

    return new NextResponse(JSON.stringify({ message: 'User upserted', user }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Google auth upsert error:', error);
    return new NextResponse(JSON.stringify({ error: 'Failed to upsert user' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
