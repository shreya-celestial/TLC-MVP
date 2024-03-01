import React from 'react';
import Signup from '../../Pages/Signup/Signup';
import Login from '../../Pages/Login/Login';
import ForgetPassword from '../../Pages/ForgetPassword/ForgetPassword';
import ResetPassword from '../../Pages/ResetPassword/ResetPassword';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from '../../Pages/Dashboard/Dashboard';
import Volunteers from '../../Pages/Volunteers/Volunteers';
import Wrapper from '../Wrapper/Wrapper';

function Main() {
  return (
    <BrowserRouter>
      <Wrapper>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/forgotPass" element={<ForgetPassword />} />
          <Route exact path="/resetPass" element={<ResetPassword />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/volunteers" element={<Volunteers />} />
        </Routes>
      </Wrapper>
    </BrowserRouter>
  );
}

export default Main;
