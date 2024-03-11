import React, { useEffect, useState } from 'react';
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
import WorkshopsDetails from '../../Pages/Workshops/WorkshopsDetails/WorkshopsDetails';
import Workshops from '../../Pages/Workshops/Workshops';
import AutocompletePopup from '../AutocompletePopup/AutocompletePopup';
import InfoTable from '../InfoTable/InfoTable';
import EnrollmentsDetails from '../../Pages/Enrollments/EnrollmentsDetails/EnrollmentsDetails';
import MeetingsDetails from '../../Pages/Meetings/MeetingsDetails/MeetingsDetails';
import Meetings from '../../Pages/Meetings/Meetings';
import Enrollments from '../../Pages/Enrollments/Enrollments';
import UserContext from '../../store/userContext';
import { logStatus } from '../../apis/user';

let SESSIONUSER = localStorage.getItem('keys');
SESSIONUSER = SESSIONUSER ? JSON.parse(SESSIONUSER) : null
function Main() {
  const [user, setUser] = useState(null)
  const [loader, setLoader] = useState(SESSIONUSER)
  const [error, setError] = useState(null)

  useEffect(() => {
    const data = async (body) => {
      const userData = await logStatus(body)
      if (userData?.status === "success") {
        setUser(userData?.user);
        setLoader(null)
        const keys = {
          id: userData?.user?.email,
          key: userData?.user?.key
        }
        localStorage.setItem('keys', JSON.stringify(keys))
        return
      }
      setError(userData?.message)
      localStorage.clear()
    }
    if (SESSIONUSER) {
      const { id: email, key } = SESSIONUSER
      data({ email, key })
    }
  }, [])

  const value = {
    user, setUser
  }

  return (
    <UserContext.Provider value={value}>
      <BrowserRouter>
        <Wrapper>
          <Routes>
            {!user && !loader && <Route exact path="/" element={<Login />} />}
            {!user && !loader && <Route exact path="/signup" element={<Signup />} />}
            {!user && !loader && <Route exact path="/forgotPass" element={<ForgetPassword />} />}
            {!user && !loader && <Route exact path="/resetPass" element={<ResetPassword />} />}
            {!user && !loader && <Route exact path='*' element={<>Error</>} />}
            {loader && !error && <Route exact path='*' element={<>Loading...</>} />}
            {loader && error && <Route exact path='*' element={<>{error} <a href='/'>Click</a></>} />}
            {user && !loader && <Route exact path="/" element={<Dashboard />} />}
            {user && !loader && <Route exact path="/dashboard" element={<Dashboard />} />}
            {user && !loader && <Route exact path="/volunteers" element={<Volunteers />} />}
            {user && !loader && <Route
              exact
              path="/volunteerdetail/:email/:type"
              element={<VolunteerDetails />}
            />}
            {user && !loader && <Route exact path="/delete" element={<DeletePopup />} />}
            {user && !loader && <Route exact path="/invite" element={<InvitePopup />} />}
            {user && !loader && <Route exact path="/verify" element={<VerifyPopup />} />}
            {user && !loader && <Route exact path="/workshops" element={<Workshops />} />}
            {user && !loader && <Route
              exact
              path="/workshopdetail/:id/:type"
              element={<WorkshopsDetails />}
            />}
            {user && !loader && <Route
              exact
              path="/workshopdetail/:type"
              element={<WorkshopsDetails />}
            />}
            {user && !loader && <Route exact path="/autocomplete" element={<AutocompletePopup />} />}
            {user && !loader && <Route exact path="/infotable" element={<InfoTable />} />}
            {user && !loader && <Route exact path="/meetings" element={<Meetings />} />}
            {user && !loader && <Route
              exact
              path="/meetingdetails/:id/:type"
              element={<MeetingsDetails />}
            />}
            {user && !loader && <Route
              exact
              path="/meetingdetails/:type"
              element={<MeetingsDetails />}
            />}
            {user && !loader && <Route
              exact
              path="/enrollmentdetails/:id/:type"
              element={<EnrollmentsDetails />}
            />}
            {user && !loader && <Route
              exact
              path="/enrollmentdetails/:type"
              element={<EnrollmentsDetails />}
            />}
            {user && !loader && <Route exact path="/enrollments" element={<Enrollments />} />}
            {user && !loader && <Route exact path='*' element={<>Error</>} />}
          </Routes>
        </Wrapper>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default Main;
