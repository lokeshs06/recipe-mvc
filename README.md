# 🍲 Recipes CRUD API

A robust, backend-only RESTful API built with Node.js, Express.js, and MongoDB. This application implements the MVC architecture to manage recipes, providing full CRUD (Create, Read, Update, Delete) functionality with structured data validation and centralized error handling.

## 🚀 Features

*   **RESTful Endpoints:** Complete CRUD operations for recipes.
*   **MVC Architecture:** Clean separation of concerns (Models, Views/Routes, Controllers).
*   **MongoDB Atlas:** Cloud-hosted NoSQL database integration using Mongoose.
*   **Centralized Error Handling:** Global error-catching middleware for consistent API responses.
*   **Health Check:** Dedicated endpoint to monitor server uptime.
*   **Postman Ready:** Included collection for 1-click testing of all routes.

---

## 🛠️ Tech Stack

*   **Runtime:** [Node.js](https://nodejs.org/)
*   **Framework:** [Express.js](https://expressjs.com/) (v5.x)
*   **Database:** [MongoDB](https://www.mongodb.com/) via [Mongoose](https://mongoosejs.com/)
*   **Security & Middleware:** `cors`, `dotenv`
*   **Development:** `nodemon`

---

## 📂 Project Structure

```text
recipes-api/
├── config/           # Database connection logic
├── controllers/      # Business logic for route handling
├── middleware/       # Custom middleware (error handling)
├── models/           # Mongoose schemas
├── routes/           # Express route definitions
├── .env.example      # Environment variables template
├── package.json      # Dependencies and npm scripts
├── seed.js           # Database population script
└── server.js         # Entry point
```

---

## 🚦 Getting Started

### Prerequisites

*   Node.js (v18+)
*   MongoDB connection string (local or MongoDB Atlas)

### 1. Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/lokeshs06/recipe-mvc.git
cd recipe-mvc
npm install
```

### 2. Environment Configuration

Rename `.env.example` to `.env` and fill in your connection details:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
NODE_ENV=development
```

### 3. Seed Database (Optional)

You can quickly populate your database with 30 sample recipes:

```bash
node seed.js
```

### 4. Run the Server

**Development Mode (auto-restarts on changes):**
```bash
npm run dev
```

**Production Mode:**
```bash
npm start
```

---

## 📡 API Endpoints

All endpoints are prefixed with `/api`.

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Check if the API is running |
| `GET` | `/api/recipes` | Retrieve all recipes |
| `GET` | `/api/recipes/:id` | Retrieve a specific recipe by ID |
| `POST` | `/api/recipes` | Create a new recipe |
| `PUT` | `/api/recipes/:id` | Update an existing recipe by ID |
| `DELETE` | `/api/recipes/:id` | Delete a recipe by ID |

### Example Recipe Payload
```json
{
  "title": "Classic Beef Burger",
  "ingredients": ["1 lb ground beef", "4 buns", "Cheese", "Lettuce"],
  "instructions": "Form patties. Grill for 4 mins per side. Assemble burger.",
  "cookingTime": 15,
  "servings": 4
}
```

---

## 🧪 Postman Documentation

A Postman collection is included in the repository: `Recipes API.postman_collection.json`.

1. Open Postman.
2. Click **Import** and select the `.json` file from the repository root.
3. The collection contains pre-configured requests with sample payloads for all CRUD operations.

---

## 🌍 Deployment

This backend API is configured for easy deployment on **Render**.

1. Create a "Web Service" on [Render](https://render.com/).
2. Connect this GitHub repository.
3. Render will automatically detect the `render.yaml` configuration:
    *   **Build Command:** `npm install`
    *   **Start Command:** `node server.js`
4. Add your `MONGO_URI` in the Environment Variables section on the Render dashboard.
