require('dotenv').config({ path: '.env.test' }); // ✅ Load .env.test before anything else

module.exports = {
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1'
  },
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', {
      presets: [
        ['@babel/preset-env', { targets: { node: 'current' } }]
      ]
    }]
  },
  collectCoverageFrom: [
    'app/api/**/*.js',
    'lib/**/*.js',
    'models/**/*.js'
  ],
  coverageThreshold: {
    global: {
      lines: 70,
      functions: 70
    }
  },
  maxWorkers: 1,
  forceExit: true
};
