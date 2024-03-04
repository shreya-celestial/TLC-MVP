import React from 'react';
import Signup from '../../Pages/Signup/Signup';
import Login from '../../Pages/Login/Login';
import ForgetPassword from '../../Pages/ForgetPassword/ForgetPassword';
import ResetPassword from '../../Pages/ResetPassword/ResetPassword';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from '../../Pages/Dashboard/Dashboard';
import Volunteers from '../../Pages/Volunteers/Volunteers';
import Wrapper from '../Wrapper/Wrapper';
import VolunteerDetails from '../../Pages/Volunteers/VolunteerDetails/VolunteerDetails';
import DeletePopup from '../DeletePopup/DeletePopup';
import InvitePopup from '../../Pages/Volunteers/InvitePopup/InvitePopup';
import VerifyPopup from '../../Pages/Volunteers/VerifyPopup/VerifyPopup';

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
          <Route exact path="/volunteerdetail" element={<VolunteerDetails />} />
          <Route exact path="/delete" element={<DeletePopup />} />
          <Route exact path="/invite" element={<InvitePopup />} />
          <Route exact path="/verify" element={<VerifyPopup />} />
        </Routes>
      </Wrapper>
    </BrowserRouter>
  );
}

export default Main;
