import { NextRequest } from "next/server";
import { GET, POST } from "../../app/api/users/route";
import { PUT, DELETE } from "../../app/api/users/[id]/route";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import User from "../../models/User";

describe("Users API - Real API Calls", () => {
  let mongoServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    process.env.MONGODB_URI = mongoServer.getUri();
    await mongoose.connect(mongoServer.getUri());
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  beforeEach(async () => {
    await User.deleteMany({});
  });

  test("GET /api/users - real database call", async () => {
    await User.create([
      { name: "John", email: "john@example.com" },
      { name: "Jane", email: "jane@example.com" },
    ]);

    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toHaveLength(2);
  });

  test("POST /api/users - real database operation", async () => {
    const request = new NextRequest("http://localhost/api/users", {
      method: "POST",
      body: JSON.stringify({
        name: "John",
        email: "john@example.com",
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(201);
    expect(data.name).toBe("John");

    // Verify in database
    const user = await User.findOne({ email: "john@example.com" });
    expect(user).toBeTruthy();
  });
});
