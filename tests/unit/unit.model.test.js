import User from '../../models/User'
import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'

describe('User Model - Non-Mocking', () => {
  let mongoServer

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create()
    await mongoose.connect(mongoServer.getUri())
  })

  afterAll(async () => {
    await mongoose.disconnect()
    await mongoServer.stop()
  })

  beforeEach(async () => {
    await User.deleteMany({})
  })

  test('should create user with real database', async () => {
    const user = new User({
      name: 'John Doe',
      email: 'john@example.com',
      age: 25
    })
    
    const saved = await user.save()
    expect(saved.name).toBe('John Doe')
    expect(saved._id).toBeDefined()
  })

  test('should validate with real database', async () => {
    const user = new User({})
    await expect(user.save()).rejects.toThrow()
  })
})