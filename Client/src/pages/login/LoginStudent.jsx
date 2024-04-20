import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import Loader from "../../components/loaders/loader";
import "react-datepicker/dist/react-datepicker.css";
import "./styles.css";
import { useNavigate } from "react-router-dom";



const LoginPageStudent = () => {
  const navigate = useNavigate();
  const [aadharNumber, setAadharNumber] = useState("");
  const [dob, setDOB] = useState(null); // Change to null initially
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  const handleLogin = () => {
    // Here you can implement your login logic
    // For demonstration purposes, let's consider login successful if Aadhar number and DOB are not empty
    if (aadharNumber.trim() !== "" && dob) {
      setLoggedIn(true);
      // Redirect to student dashboard
      navigate('/studentdashboard');
    } else {
      alert("Please enter a valid Aadhar number and date of birth.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen animate-gradient">

      {loading ?
        <Loader backgroundColor={'#000000ff'} />
        :
        <div className="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center  bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Aadhar Card Number"
                value={aadharNumber}
                onChange={(e) => setAadharNumber(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <DatePicker
                selected={dob}
                onChange={(date) => setDOB(date)}
                dateFormat="dd/MM/yyyy"
                placeholderText="Date of Birth"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <button
              onClick={handleLogin}
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
              Login
            </button>
          </div>
        </div>
      }

    </div>
  );
};

export default LoginPageStudent;
