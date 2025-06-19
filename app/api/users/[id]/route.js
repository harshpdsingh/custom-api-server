import { connectToDB } from '@/lib/db';
import User from '@/models/user';


// GET /api/users/[id] → Get a single user
export async function GET(_, props) {
  const params = await props.params;
  try {
    await connectToDB();
    const user = await User.findById(params.id);

    if (!user) {
      return Response.json({ error: 'User not found' }, { status: 404 });
    }

    return Response.json(user);
  } catch (error) {
    return Response.json({ error: 'Failed to fetch user' }, { status: 500 });
  }
}

// PUT /api/users/[id] → Update user
export async function PUT(request, props) {
  const params = await props.params;
  try {
    const { name, email } = await request.json();
    await connectToDB();

    const updatedUser = await User.findByIdAndUpdate(
      params.id,
      { name, email },
      { new: true } // return updated doc
    );

    if (!updatedUser) {
      return Response.json({ error: 'User not found' }, { status: 404 });
    }

    return Response.json(updatedUser);
  } catch (error) {
    return Response.json({ error: 'Failed to update user' }, { status: 400 });
  }
}

// DELETE /api/users/[id] → Delete user
export async function DELETE(_, props) {
  const params = await props.params;
  try {
    await connectToDB();
    const deletedUser = await User.findByIdAndDelete(params.id);

    if (!deletedUser) {
      return Response.json({ error: 'User not found' }, { status: 404 });
    }

    return Response.json({ message: 'User deleted successfully' });
  } catch (error) {
    return Response.json({ error: 'Failed to delete user' }, { status: 500 });
  }
}
