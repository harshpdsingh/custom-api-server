import { connectToDatabase } from '../../lib/db'
import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'

describe('Database Connection - Non-Mocking', () => {
  let mongoServer

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create()
    process.env.MONGODB_URI = mongoServer.getUri()
  })

  afterAll(async () => {
    await mongoose.disconnect()
    await mongoServer.stop()
  })

  test('should connect to real database', async () => {
    const connection = await connectToDatabase()
    expect(connection).toBeDefined()
    expect(mongoose.connection.readyState).toBe(1)
  })
})