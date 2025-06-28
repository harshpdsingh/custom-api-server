import { connectToDatabase } from '@/lib/db';
import User from '@/models/user';

// GET /api/users → Fetch all users
export async function GET() {
  try {
    await connectToDatabase();
    const users = await User.find();
    return Response.json(users);
  } catch (error) {
    return Response.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}

// POST /api/users → Create a new user
export async function POST(request) {
    const body = await request.json();
    console.log('Request Body:', body);
  try {
    
    const { name, email } = body;
    await connectToDatabase();
    const newUser = await User.create({ name, email });
    console.log('Request Body:', { name, email }) // instead of whole body

    return Response.json(newUser.toObject(), { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    return Response.json({ error: 'Failed to create user' }, { status: 400 });
  }
}
