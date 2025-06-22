import { GET, POST } from "../../app/api/users/route";
import User from "../../models/User";

// Mock the User model and db connection
jest.mock("../../models/User", () => ({
  __esModule: true,
  default: {
    find: jest.fn(),
    create: jest.fn(),
  },
}));

jest.mock("../../lib/db");

describe("Users API - Mocking Approach", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("GET /api/users - with mocked database", async () => {
    const mockUsers = [
      { _id: "1", name: "John", email: "john@example.com" },
      { _id: "2", name: "Jane", email: "jane@example.com" },
    ];

    User.find.mockResolvedValue(mockUsers);

    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toHaveLength(2);
    expect(User.find).toHaveBeenCalled();
  });

  test("POST /api/users - with mocked create + toObject", async () => {
    const mockToObject = jest.fn().mockReturnValue({
      _id: "mock-id",
      name: "John",
      email: "john@example.com",
    });

    const mockCreatedUser = {
      toObject: mockToObject,
    };

    User.create.mockResolvedValue(mockCreatedUser);

    const request = new Request("http://localhost/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "John",
        email: "john@example.com",
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(201);
    expect(data.name).toBe("John");
    expect(User.create).toHaveBeenCalled();
    expect(mockToObject).toHaveBeenCalled();
  });

  test("should handle errors with mocked failures", async () => {
    User.find.mockRejectedValue(new Error("Database error"));

    const response = await GET();

    expect(response.status).toBe(500);
  });
});
