import React from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ToastContainer } from './components/Toast';

import { Home } from './pages/Home';
import { UserDetail } from './pages/UserDetail';
import { UserFormPage } from './pages/UserFormPage';
import { NotFound } from './pages/NotFound';

/**
 * Root Layout Component containing Navbar, main container, Toast alerts, and Footer
 */
const RootLayout = () => {
  return (
    <div className="app-wrapper">
      <Navbar />
      <main className="main-content">
        <Outlet />
      </main>
      <ToastContainer />
      <Footer />
    </div>
  );
};

/**
 * Modern React Router Data Router Configuration using createBrowserRouter
 */
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'user/:id',
        element: <UserDetail />,
      },
      {
        path: 'user/new',
        element: <UserFormPage />,
      },
      {
        path: 'user/edit/:id',
        element: <UserFormPage />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);

/**
 * Main App Root Component
 * Provides UserContext and RouterProvider
 */
function App() {
  return (
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  );
}

export default App;
