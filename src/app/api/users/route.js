import { getUsersByEmail, getAllUsers, createUser, getUsersByPassword } from '@/services/users';
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
    const email = searchParams.get('email');

    if (email) {
        const users = await getUsersByEmail(email);
        return new NextResponse(JSON.stringify(users), {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } else {
        const items = await getAllUsers();
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

    const res = await deleteUser(id);
    console.log(res);
    if (res.deletedCount === 0) {
        return new NextResponse(JSON.stringify({ error: 'User not found' }), {
            status: 404,
            headers: { 'Content-Type': 'application/json' }
        });
    }
    return new NextResponse(JSON.stringify({ message: 'User deleted successfully' }), {
        headers: { 'Content-Type': 'application/json' }
    });
}

export async function POST(request) {
    try {
        const body = await request.json();
        
        if (!body.email || !body.password) {
            return new NextResponse(JSON.stringify({ error: 'email and password are required' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const res = await createUser(body);
        return new NextResponse(JSON.stringify({ message: 'User created successfully', id: res.insertedId }), {
            status: 201,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error(error);
        return new NextResponse(JSON.stringify({ error: 'Failed to create user' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
