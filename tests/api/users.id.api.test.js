// 📁 File: tests/api/users.id.api.test.js

import mongoose from "mongoose";
import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";
import { PUT, DELETE } from "@/app/api/users/[id]/route";

describe("/api/users/:id - Real DB Integration", () => {
  let userId;

  beforeAll(async () => {
    process.env.MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/test-db";
    await connectToDatabase();
    const newUser = await User.create({ name: "Temp", email: "temp@example.com" });
    userId = newUser._id.toString();
  });

  afterAll(async () => {
    await User.deleteMany({});
    await mongoose.connection.close();
  });

  test("PUT /api/users/:id - update user", async () => {
    const req = new Request(`http://localhost/api/users/${userId}`, {
      method: "PUT",
      body: JSON.stringify({ name: "Updated", email: "updated@example.com" }),
    });

    const res = await PUT(req, { params: { id: userId } });
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.name).toBe("Updated");
  });

  test("DELETE /api/users/:id - delete user", async () => {
    const req = new Request(`http://localhost/api/users/${userId}`, {
      method: "DELETE",
    });

    const res = await DELETE(req, { params: { id: userId } });
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.message).toMatch(/deleted/i);
  });

  test("PUT /api/users/:id - user not found", async () => {
    const fakeId = new mongoose.Types.ObjectId();

    const req = new Request(`http://localhost/api/users/${fakeId}`, {
      method: "PUT",
      body: JSON.stringify({ name: "None", email: "none@example.com" }),
    });

    const res = await PUT(req, { params: { id: fakeId } });
    expect(res.status).toBe(404);
  });

  test("DELETE /api/users/:id - user not found", async () => {
    const fakeId = new mongoose.Types.ObjectId();

    const req = new Request(`http://localhost/api/users/${fakeId}`, {
      method: "DELETE",
    });

    const res = await DELETE(req, { params: { id: fakeId } });
    expect(res.status).toBe(404);
  });
});
