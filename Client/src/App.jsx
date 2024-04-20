import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/login/Home";
import RegisterStudent from "./pages/login/RegisterStudent";
import StudentDashboard from "./pages/studentDashboard";
import AdminDashboard from "./pages/adminDashboard";

import "bootstrap/dist/css/bootstrap.min.css";
import Loader from "./components/loaders/loader";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home */}
        <Route path="/" element={<Home />} />
        {/* <Route path="/studentlogin" element={<LoginPageStudent />} /> */}
        {/* <Route path="/institutionlogin" element={<LoginPageInstitution />} /> */}
        {/* Register */}
        {/* <Route path="/register" element={<Register />} /> */}
        <Route path="/studentregister" element={<RegisterStudent />} />
        {/* Dashboards */}
        <Route path="/studentdashboard" element={<StudentDashboard />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
