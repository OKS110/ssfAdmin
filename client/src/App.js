import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout.jsx';
import Login from './pages/Login.jsx';
import Main from './pages/Main.jsx';
import RegiProduct from './pages/RegiProduct.jsx';
import { AuthProvider } from './auth/AuthContext.js';
import PrivateRoute from './auth/PrivateRoute.js';
import './styles/admin.css';

function App() {
  return (
    <div className="adminLogin-wrap">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Layout />}>
                <Route path='/admin/login' element={<Login />} />
                <Route element={<PrivateRoute />}>
                  <Route index element={<Main />} />
                  <Route path='/admin/register' element={<RegiProduct />} />
                </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
