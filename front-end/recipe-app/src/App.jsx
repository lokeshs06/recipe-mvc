import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { RecipeProvider } from './context/RecipeContext';
import Navbar from './components/Navbar';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <Router>
      <RecipeProvider>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <AppRoutes />
          </main>
          
          {/* Footer (Optional, added for completion) */}
          <footer className="py-6 text-center text-slate-500 text-sm border-t border-slate-200 mt-auto">
            <p>&copy; {new Date().getFullYear()} Recipes CRUD. Built with React and Tailwind CSS.</p>
          </footer>
        </div>
        
        {/* Toast Notifications Configuration */}
        <Toaster 
          position="bottom-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#334155',
              color: '#fff',
              borderRadius: '12px',
              padding: '16px',
            },
            success: {
              iconTheme: {
                primary: '#10b981',
                secondary: '#fff',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
      </RecipeProvider>
    </Router>
  );
}

export default App;
