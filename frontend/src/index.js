import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { UserProvider } from './context/usercontext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Ensure BrowserRouter is imported

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <Router>
      <UserProvider>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </UserProvider>
    </Router>
  // </React.StrictMode>
);


