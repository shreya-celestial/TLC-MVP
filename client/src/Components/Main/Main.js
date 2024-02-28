import React from 'react';
import Signup from '../../Pages/Signup/Signup';
import Login from '../../Pages/Login/Login';
import ForgetPassword from '../../Pages/ForgetPassword/ForgetPassword';
import ResetPassword from '../../Pages/ResetPassword/ResetPassword';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from '../../Pages/Dashboard/Dashboard';

function Main() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/forgotPass" element={<ForgetPassword />} />
        <Route exact path="/resetPass" element={<ResetPassword />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Main;
