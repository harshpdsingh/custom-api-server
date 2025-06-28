import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'
import User from '../../models/User'
import { connectToDatabase } from '../../lib/db'

describe('Database Integration - Real Database', () => {
  let mongoServer

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create()
    process.env.MONGODB_URI = mongoServer.getUri()
    await connectToDatabase()
  })

  afterAll(async () => {
    await mongoose.disconnect()
    await mongoServer.stop()
  })

  test('should perform CRUD operations with real database', async () => {
    // Create
    const user = await User.create({ name: 'John Doe', email: 'john@example.com' })
    expect(user.name).toBe('John Doe')

    // Read
    const foundUser = await User.findById(user._id)
    expect(foundUser.email).toBe('john@example.com')

    // Update (name)
    const updated = await User.findByIdAndUpdate(user._id, { name: 'Updated Name' }, { new: true })
    expect(updated.name).toBe('Updated Name')

    // Delete
    await User.findByIdAndDelete(user._id)
    const deletedUser = await User.findById(user._id)
    expect(deletedUser).toBeNull()
  })
})
