import { NextResponse } from 'next/server';
import { getUsersByEmail, createUser } from '@/services/users';

export async function POST(request) {
  try {
    const body = await request.json();

    const { name, email, password } = body;
    if (!email || !password) {
      return new NextResponse(JSON.stringify({ error: 'email and password are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const existing = await getUsersByEmail(email);
    if (existing && existing.length > 0) {
      return new NextResponse(JSON.stringify({ error: 'User already exists' }), {
        status: 409,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const res = await createUser({ name: name || '', email, password });

    return new NextResponse(JSON.stringify({ message: 'User created successfully', id: res.lastInsertRowid }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Register error:', error);
    return new NextResponse(JSON.stringify({ error: 'Registration failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
