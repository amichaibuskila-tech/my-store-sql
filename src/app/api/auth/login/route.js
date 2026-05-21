import { NextResponse } from 'next/server';
import { getUsersByEmail } from '@/services/users';

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password } = body;
    if (!email || !password) {
      return new NextResponse(JSON.stringify({ error: 'email and password are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const users = await getUsersByEmail(email);
    if (!users || users.length === 0) {
      return new NextResponse(JSON.stringify({ error: 'Invalid credentials' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const user = users[0];
    // Note: passwords are stored in plaintext in this project (consider hashing)
    if (user.password !== password) {
      return new NextResponse(JSON.stringify({ error: 'Invalid credentials' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const safeUser = {
      id: user._id,
      name: user.name || '',
      email: user.email,
      photoURL: user.photoURL || user.photo || '',
      uid: user.googleId || '',
    };

    return new NextResponse(JSON.stringify({ message: 'Login successful', user: safeUser }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Login error:', error);
    return new NextResponse(JSON.stringify({ error: 'Login failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
