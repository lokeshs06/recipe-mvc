<div align="center">
  <img src="https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/chef-hat.svg" alt="Chef Hat" width="120"/>

  # 🍳 FlavorVault - Recipes MVC
  
  **Your Personal Culinary Canvas**
  
  [![React](https://img.shields.io/badge/React-19.0.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
  [![Vite](https://img.shields.io/badge/Vite-8.0.16-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
  [![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
  [![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
  
  ---
</div>

> **FlavorVault** is a full-stack MERN application that allows food enthusiasts to discover, store, and manage their favorite recipes with an elegant and modern user interface. From rich South Indian delicacies to global comfort foods, keep your kitchen adventures perfectly organized.

## ✨ Dazzling Features

✨ **Rich Aesthetics** - Glassmorphism UI, smooth hover micro-animations, and a premium color palette.  
📱 **Fully Responsive** - Flawless experience on mobile, tablet, and desktop devices.  
🔍 **Instant Search** - Real-time client-side filtering to find your favorite dishes instantly.  
🛡️ **Unified Deployment** - Configured for a seamless, cost-effective single-service deployment on Render.  
🍞 **Toast Notifications** - Elegant, non-intrusive alerts for all your CRUD actions.  
📦 **Ready-to-use Seeder** - Instantly populate your database with 30 diverse sample recipes!

<br/>

## 🛠️ Tech Stack & Architecture

This application employs a modern **Model-View-Controller (MVC)** architectural pattern.

| Layer | Technologies Used | Purpose |
| :--- | :--- | :--- |
| **Frontend (View)** | React 19, Tailwind CSS v4, Lucide Icons, React Router | Delivers a hyper-responsive, rich UI and seamless UX. |
| **Backend (Controller)** | Node.js, Express.js | Handles API requests, business logic, and serves the frontend in production. |
| **Database (Model)** | MongoDB, Mongoose | Stores recipe schemas, ingredients, and metadata. |
| **State & API** | Context API, Custom Hooks, Axios | Manages global application state and backend communication. |

<br/>

## 🚀 Quick Start Guide

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) and [Git](https://git-scm.com/) installed on your machine. You will also need a MongoDB URI.

### 1. Clone the repository
```bash
git clone https://github.com/lokeshs06/recipe-mvc.git
cd recipe-mvc
```

### 2. Backend Setup
```bash
cd back-end
npm install

# Create a .env file based on your environment
echo "MONGO_URI=your_mongodb_connection_string" > .env
echo "PORT=5000" >> .env
echo "NODE_ENV=development" >> .env

# Optional: Seed the database with 30 amazing recipes!
node seed.js

# Start the development server
npm run dev
```

### 3. Frontend Setup
```bash
cd ../front-end/recipe-app
npm install

# Start the Vite development server
npm run dev
```
Navigate to `http://localhost:5173` to experience the app!

<br/>

## 🌍 Unified Production Deployment

This repository is pre-configured with a `render.yaml` Blueprint for a unified deployment. This means both the frontend and backend are deployed onto a single Web Service on Render!

1. Connect this repository to your Render account.
2. Select **Blueprint** deployment.
3. Render will automatically:
   - Install backend dependencies.
   - Navigate to the frontend, install dependencies, and build the React app.
   - Start the Express server which serves the API *and* the static frontend files!

<br/>

<div align="center">
  <i>Built with ❤️ for culinary creators and code enthusiasts.</i>
</div>
