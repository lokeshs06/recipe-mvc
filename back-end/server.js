require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const recipeRoutes = require('./routes/recipeRoutes');
const errorHandler = require('./middleware/errorHandler');

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API is running'
  });
});

// Routes
app.use('/api/recipes', recipeRoutes);

// Error Handling Middleware
app.use(errorHandler);

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
  const path = require('path');
  
  // Set static folder
  app.use(express.static(path.join(__dirname, '../front-end/recipe-app/dist')));

  // Any route that is not API will be redirected to index.html
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../', 'front-end', 'recipe-app', 'dist', 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.send('API is running. Please set to production to serve frontend.');
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
