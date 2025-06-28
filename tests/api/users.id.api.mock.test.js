import { GET } from "@/app/api/users/[id]/route";
import User from "@/models/User";

jest.mock("@/models/User");
jest.mock("@/lib/db");

describe("GET /api/users/:id - mocked tests", () => {
  const userId = "mock-id";

  test("should return 200 if user is found", async () => {
    User.findById.mockResolvedValue({
      _id: userId,
      name: "Test User",
      email: "test@example.com",
    });

    const req = new Request(`http://localhost/api/users/${userId}`, { method: "GET" });

    const res = await GET(req, { params: { id: userId } });
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.name).toBe("Test User");
  });

  test("should return 404 if user not found", async () => {
    User.findById.mockResolvedValue(null);

    const req = new Request(`http://localhost/api/users/${userId}`, { method: "GET" });

    const res = await GET(req, { params: { id: userId } });
    const data = await res.json();

    expect(res.status).toBe(404);
    expect(data.error).toMatch(/not found/i);
  });

  test("should return 500 on DB error", async () => {
    User.findById.mockRejectedValue(new Error("DB error"));

    const req = new Request(`http://localhost/api/users/${userId}`, { method: "GET" });

    const res = await GET(req, { params: { id: userId } });
    const data = await res.json();

    expect(res.status).toBe(500);
    expect(data.error).toMatch(/failed/i);
  });
});
