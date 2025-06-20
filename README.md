# 🔐 User Manager – Custom API Server with MongoDB and Next.js

This is a fullstack CRUD app built using **Next.js (App Router)** and **MongoDB Atlas**. It demonstrates how to build and consume your own REST APIs using Next.js API routes with a lightweight frontend UI.

---

## 📌 APIs Created & Their Functionality

| Method | Endpoint         | Description             |
|--------|------------------|-------------------------|
| GET    | /api/users       | Get all users           |
| POST   | /api/users       | Create a new user       |
| PUT    | /api/users/:id   | Update a user by ID     |
| DELETE | /api/users/:id   | Delete a user by ID     |

---

## 🛠️ Database Integration (MongoDB)

- **Database**: MongoDB Atlas (cloud)
- **Library Used**: [Mongoose](https://mongoosejs.com/)
- Connection handled via a `connectToDB()` function inside `lib/mongodb.js`

### 🧪 Setup

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and create a cluster.
2. Whitelist your IP (`0.0.0.0/0` for testing) and create a database user.
3. Copy your connection string and create a `.env.local` file in your root directory.

```
MONGODB_URI=your-mongodb-uri-here
```

---

## 🚀 How to Run the Server

```bash
# 1. Clone the repo
git clone https://github.com/harshpdsingh/custom-api-server.git
cd custom-api-server

# 2. Install dependencies
npm install

# 3. Create environment file
touch .env.local

# Add this inside .env.local
MONGODB_URI=your-mongodb-uri

# 4. Run the development server
npm run dev
```

Visit the app at `http://localhost:3000`

---

## 💻 How to Run the Frontend Locally (Optional)

> No separate setup needed — frontend and backend are combined using **Next.js App Router**

- Go to `http://localhost:3000`
- You'll see:
  - A form to **Add a User**
  - A list of users with options to **Edit** or **Delete**

---

## 📬 How to Interact with the API

You can test API endpoints using **Postman**, **curl**, or directly from the browser.

---

### ➕ POST `/api/users`

**Request:**

```json
{
  "name": "Harsh",
  "email": "harsh@example.com"
}
```

**Response:**

```json
{
  "_id": "665c789b83ef49b7ff23ba33",
  "name": "Harsh",
  "email": "harsh@example.com",
  "__v": 0
}
```

---

### 🔁 PUT `/api/users/:id`

**Request:**

```json
{
  "name": "Updated Harsh",
  "email": "updated@example.com"
}
```

---

### 🗑 DELETE `/api/users/:id`

No request body required. Just send a DELETE request.

---

## 🧪 Example Test with curl

```bash
# Create a user
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name": "hasrh", "email": "harsh@example.com"}'

# Get all users
curl http://localhost:3000/api/users

# Update a user
curl -X PUT http://localhost:3000/api/users/<id> \
  -H "Content-Type: application/json" \
  -d '{"name": "Updated harsh", "email": "updated@example.com"}'

# Delete a user
curl -X DELETE http://localhost:3000/api/users/<id>
```

---

## 🙋 Author

**Harsh Prasad Singh**  
Built with 💻 Next.js, ❤️ MongoDB, and 🚀 love for learning!

---

[![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)](./UNLICENSE)

