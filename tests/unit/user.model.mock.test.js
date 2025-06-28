// ✅ Replace with module-level mock
jest.mock('@/models/user', () => {
  return jest.fn().mockImplementation((data) => ({
    ...data,
    save: jest.fn().mockResolvedValue({ ...data, _id: 'mock-id' }),
    validateSync: jest.fn(() => {
      const errors = {}
      if (!data.name) errors.name = { message: 'Name is required' }
      if (!data.email) errors.email = { message: 'Email is required' }
      return Object.keys(errors).length ? { errors } : null
    })
  }))
})

// ✅ Import AFTER the mock
import User from '@/models/user'

describe('User Model - Mocking', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should create user instance with mocked mongoose', () => {
    const user = new User({
      name: 'John Doe',
      email: 'john@example.com'
    })

    expect(user.name).toBe('John Doe')
    expect(user.save).toBeDefined()
  })

  test('should handle validation errors with mocks', () => {
    const user = new User({})
    const errors = user.validateSync()

    expect(errors.errors.name).toBeDefined()
    expect(errors.errors.email).toBeDefined()
  })
})
