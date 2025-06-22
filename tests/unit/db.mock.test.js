// tests/unit/db.mock.test.js
import mongoose from "mongoose";
import { connectToDatabase } from "../../lib/db";

jest.mock("mongoose", () => {
  const actual = jest.requireActual("mongoose");
  return {
    ...actual,
    connect: jest.fn().mockResolvedValue({ connected: true }),
    connection: { readyState: 0 },
  };
});

describe("Database Connection - Mocking", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mongoose.connection.readyState = 0;
    process.env.NODE_ENV = "test";
  });

  afterEach(() => {
    delete global.mongoose;
  });

  test("should connect with mocked mongoose", async () => {
    const result = await connectToDatabase();
    expect(mongoose.connect).toHaveBeenCalled();
    expect(result).toBeDefined();
  });

  test("should handle connection errors with mocks", async () => {
    mongoose.connect.mockRejectedValueOnce(new Error("Connection failed"));
    await expect(connectToDatabase()).rejects.toThrow("Connection failed");
  });

  test("should use existing connection with mocks", async () => {
    mongoose.connection.readyState = 1;
    const result = await connectToDatabase();
    expect(mongoose.connect).not.toHaveBeenCalled();
    expect(result).toBeDefined();
  });

  test("should use cached connection if already present", async () => {
    mongoose.connection.readyState = 0;
    process.env.NODE_ENV = "development";

    global.mongoose = {
      conn: { mockCached: true },
      promise: Promise.resolve({ mockCached: true }),
    };

    const result = await connectToDatabase();
    expect(result).toBeDefined();
  });
});
