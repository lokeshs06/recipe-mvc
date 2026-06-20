# Recipes CRUD API

A complete RESTful API for managing recipes, built with Node.js, Express.js, and MongoDB (Mongoose), strictly following the MVC (Model-View-Controller) architecture.

## Features
- Create, Read, Update, and Delete (CRUD) recipes.
- Structured JSON responses for both success and error cases.
- Centralized error handling and validation middleware.
- Input validation (e.g., required fields, positive numbers for time and servings).
- MongoDB ObjectId validation.
- Health Check endpoint.
- CORS enabled for front-end integration.

## Technologies Used
- **Node.js**: JavaScript runtime environment.
- **Express.js**: Web framework for Node.js.
- **MongoDB Atlas**: Cloud-based NoSQL database.
- **Mongoose**: Object Data Modeling (ODM) library for MongoDB and Node.js.

## Folder Structure (MVC)
```text
recipes-api/
├── config/
│   └── db.js              # Database connection
├── controllers/
│   └── recipeController.js # Route logic
├── models/
│   └── Recipe.js          # Mongoose schema
├── routes/
│   └── recipeRoutes.js    # Express routes
├── middleware/
│   └── errorHandler.js    # Centralized error handler
├── server.js              # Entry point
├── .env                   # Environment variables
├── package.json
└── README.md
```

## Installation Steps

1. Clone the repository or navigate to the `recipes-api` folder.
2. Install the required dependencies:
   ```bash
   npm install
   ```

## Environment Variables Setup

Create a `.env` file in the root of the project with the following contents:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```
*Note: Replace `your_mongodb_connection_string` with your actual MongoDB Atlas connection string.*

## Running the Project Locally

To run the application in development mode (with auto-reloading using `nodemon`):
```bash
npm run dev
```

To run the application in production mode:
```bash
npm start
```

The API will be accessible at `http://localhost:5000`.

## API Endpoints Documentation

### Health Check
- **URL**: `/api/health`
- **Method**: `GET`
- **Success Response**: `{ "success": true, "message": "API is running" }`

### Create Recipe
- **URL**: `/api/recipes`
- **Method**: `POST`
- **Body** (JSON):
  ```json
  {
      "title": "Chicken Curry",
      "ingredients": ["Chicken", "Curry Powder"],
      "instructions": "Cook chicken and add powder.",
      "cookingTime": 30,
      "servings": 2
  }
  ```
- **Success Status Code**: `201 Created`

### Get All Recipes
- **URL**: `/api/recipes`
- **Method**: `GET`
- **Success Status Code**: `200 OK`

### Get Recipe By ID
- **URL**: `/api/recipes/:id`
- **Method**: `GET`
- **Success Status Code**: `200 OK`
- **Error Status Code**: `404 Not Found` (If recipe doesn't exist) or `400 Bad Request` (Invalid ID format)

### Update Recipe
- **URL**: `/api/recipes/:id`
- **Method**: `PUT`
- **Body** (JSON): Include any fields you want to update.
- **Success Status Code**: `200 OK`

### Delete Recipe
- **URL**: `/api/recipes/:id`
- **Method**: `DELETE`
- **Success Status Code**: `200 OK`

## Postman Collection Usage

1. Open Postman.
2. Click on **Import**.
3. Select the `Recipes API.postman_collection.json` file provided in the repository.
4. Set the `baseUrl` variable in the collection to your server's URL (default is `http://localhost:5000`).
5. You can now test all the available endpoints.

## Deployment Instructions (Render)

This project is configured for out-of-the-box deployment to Render using the `render.yaml` configuration file.

1. Push your code to a GitHub/GitLab repository.
2. Log in to [Render](https://render.com/).
3. Create a new **Blueprint Instance** and connect your repository. Render will automatically detect the `render.yaml` file.
4. **Important:** In your Render dashboard, navigate to the newly created Web Service, go to **Environment**, and add your `MONGO_URI` environment variable manually.
5. Save changes, and Render will deploy your application.
