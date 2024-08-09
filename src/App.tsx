import React from 'react';
import UserProvider from './contexts/UserContext';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Pages/login/Login';
import Home from './Pages/home/Home';



function App() {

  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
        </Routes>

      </BrowserRouter>

    </UserProvider>
  );
}

export default App;