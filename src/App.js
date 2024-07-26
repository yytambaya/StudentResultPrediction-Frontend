import {Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './dashboard/Login';
import Dashboard from './dashboard/app/';
import Signup from './dashboard/signup';
import UserMain from './dashboard/user/UserMain';
import { ProtectedRoutes } from './dashboard/ProtectedRoutes';
import { useAuth } from './hooks/useAuth';
import HostelMain from './dashboard/hostel/HostelMain';
import ComplaintMain from './dashboard/complaint/ComplaintMain';
import ReservationMain from './dashboard/reservation/ReservationMain';
import Profile from './dashboard/app/Profile';
import Prediction from './prediction/Prediction';

function App() {

  return (
    <Routes>
      <Route exact path="/" element={<Prediction/>} />
      <Route exact path="prediction" element={<Prediction/>} />
      <Route exact path="signup" element={<Signup/>} />
      <Route exact path="login" element={<Login/>} />
      <Route element={<ProtectedRoutes/>}>
        <Route exact path="profile" element={<Profile/>} />
        <Route exact path="students" element={<UserMain/>} />
        <Route exact path="hostels" element={<HostelMain/>} />
        <Route exact path="complaints" element={<ComplaintMain/>} />
        <Route exact path="reservations" element={<ReservationMain/>} />
      </Route>
    </Routes>
  );
}

export default App;
