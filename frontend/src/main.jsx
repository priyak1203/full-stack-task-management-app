import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import App from './App.jsx';
import { ToastContainer } from 'react-toastify';
import { UserProvider } from './context/userContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <App />
      <ToastContainer position="top-center" autoClose={2000} />
    </UserProvider>
  </StrictMode>
);
