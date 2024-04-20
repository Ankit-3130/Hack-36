import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import { CFormFloating, CFormLabel, CFormInput, CFormRange, CFormSelect } from '@coreui/react';
import Loader from "../../components/loaders/loader";

import "react-datepicker/dist/react-datepicker.css";
import "./styles.css";
import "./registerStudent.css";
import "bootstrap/dist/css/bootstrap.min.css"
import 'react-tooltip/dist/react-tooltip.css'



const RegisterStudent = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [aadharNumber, setAadharNumber] = useState(null);
    const [dob, setDOB] = useState(null); // Change to null initially
    const [qual, setQual] = useState(0); // highest qualification {0,1,2}
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
    }, []);

    const handleRegister = () => {
        // Here you can implement your register+login logic
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
                        <h2 className="text-2xl font-bold mb-4">Register</h2>
                        {/* Name */}
                        <CFormFloating className="mb-4">
                            <CFormInput type="text" id="floatingName" placeholder="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <CFormLabel htmlFor="floatingName" style={{ zIndex: 1 }}>Name</CFormLabel>
                        </CFormFloating>

                        {/* Aadhar number */}
                        <CFormFloating className="mb-4">
                            <CFormInput type="number" id="floatingAadhar" placeholder="Aadhar Card Number"
                                value={aadharNumber}
                                onChange={(e) => setAadharNumber(e.target.value)}
                            />
                            <CFormLabel htmlFor="floatingAadhar" style={{ zIndex: 1 }}>Aadhar Card Number</CFormLabel>
                        </CFormFloating>

                        {/* DOB */}
                        <div className="mb-4 ">
                            <DatePicker
                                selected={dob}
                                onChange={(date) => setDOB(date)}
                                dateFormat="dd/MM/yyyy"
                                placeholderText="Date of Birth"
                                className="w-full p-2 border border-gray-300 rounded focus:outline-none"
                            />
                        </div>
                        {/* Highest Qualification */}
                        <CFormSelect
                            label="Highest Qualification:"
                            options={[
                                "choose an option",
                                { label: 'Class 10th', value: '0' },
                                { label: 'Class 12th', value: '1' },
                                { label: 'UG', value: '2' }
                            ]}
                            value={qual}
                            onChange={(e) => setQual(e.target.value)}
                            className="mb-4"
                        />

                        {/* Submit button */}
                        <button
                            onClick={handleRegister}
                            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                        >
                            Confirm
                        </button>
                    </div>
                </div>
            }
        </div>
    );
};

export default RegisterStudent;
