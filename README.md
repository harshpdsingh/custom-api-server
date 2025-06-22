# 🔐 User Manager – Custom API Server with MongoDB and Next.js

This is a fullstack CRUD app built using **Next.js (App Router)** and **MongoDB Atlas**. It includes:

* REST API endpoints for user management
* Integrated database using Mongoose
* Fully tested with **Jest** and **Supertest** for unit, integration, and mocked API tests

---

## 📌 APIs Created & Their Functionality

| Method | Endpoint        | Description       |
| ------ | --------------- | ----------------- |
| GET    | /api/users      | Get all users     |
| POST   | /api/users      | Create a new user |
| GET    | /api/users/\:id | Get user by ID    |
| PUT    | /api/users/\:id | Update user by ID |
| DELETE | /api/users/\:id | Delete user by ID |

---

## 🛠️ Tech Stack

* **Framework**: Next.js (App Router)
* **Database**: MongoDB Atlas
* **ODM**: Mongoose
* **Testing**: Jest, Supertest, mongodb-memory-server

---

## 🤝 How to Run the App

```bash
# 1. Clone the repo
https://github.com/harshpdsingh/custom-api-server.git
cd custom-api-server

# 2. Install dependencies
npm install

# 3. Create a .env.local file and add:
MONGODB_URI=your-mongodb-uri

# 4. Start the development server
npm run dev
```

Visit: `http://localhost:3000`

---

## 💻 Frontend UI

> Integrated inside Next.js app

* Form to **Create User**
* Table to **View/Edit/Delete Users**

---

## 🔢 API Examples

### POST /api/users

```json
{
  "name": "Harsh",
  "email": "harsh@example.com"
}
```

### PUT /api/users/\:id

```json
{
  "name": "Updated Harsh",
  "email": "updated@example.com"
}
```

### DELETE /api/users/\:id

No body required.

### Test with curl:

```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Harsh","email":"harsh@example.com"}'
```

---

## 🔮 How to Run Tests

```bash
# Run all tests
npm run test

# Run tests with coverage
npm run test:coverage
```

---

## 🌟 Testing Frameworks Used

* **Jest**: Testing framework
* **Supertest**: HTTP assertions
* **mongodb-m<<<<<<< HEAD
## 🌟 Testing Frameworks Used

* **Jest**: Testing framework
* **Supertest**: HTTP assertions
* **mongodb-memory-server**: In-memory MongoDB for integration tests

---

## 🔍 What Is Tested?

### ✅ Unit Tests:

* Database connection logic (`lib/db.js`)
* User model logic (`models/User.js`)

### ✅ Integration Tests:

* CRUD operations with real database (in-memory)
* User flow end-to-end

### ✅ API Route Tests (mocked + non-mocked):

* POST /api/users
* GET /api/users
* PUT /api/users/\:id
* DELETE /api/users/\:id
* GET /api/users/\:id

---

## 📊 Test Coverage Screenshot

![Test Coverage](./coverage/coverage-summary.png)


---

## 👤 Author

**Harsh Prasad Singh**
Built with 💻 Next.js, ❤️ MongoDB, and ✨ love for clean code and testing!

---

## 📜 License

[![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)](./UNLICENSE)

