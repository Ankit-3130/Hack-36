import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import { CFormFloating, CFormLabel, CFormInput, CFormRange, CFormSelect } from '@coreui/react';
import Loader from "../../components/loaders/loader";
import { Appstate } from "../../contextApi";
import { ethers } from "ethers";
import styled from "styled-components";
import axios from "axios";

import "react-datepicker/dist/react-datepicker.css";
import "./styles.css";
import "./registerStudent.css";
import "bootstrap/dist/css/bootstrap.min.css"
import 'react-tooltip/dist/react-tooltip.css'
import StudentRecords from "../../abiJson/studentRecords.json"



const RegisterStudent = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [aadharNumber, setAadharNumber] = useState(null);
    const [image, setImage] = useState(); // Change to null initially
    const [imageUploaded, setImageUploaded] = useState(false); // Change to null initially
    const [qual, setQual] = useState(0); // highest qualification {0,1,2}
    const [loading, setLoading] = useState(true);
    const { address, signer, rpcProvider } = Appstate();

    useEffect(() => {
        setLoading(false);
    }, []);

    const ImageHandler = (e) => {
        setImage(e.target.files[0]);
    }

    const uploadFiles = async (e) => {
        e.preventDefault();
        //setUploadLoading(true);


        if (image !== null) {
            try {
                const fileData = new FormData();
                fileData.append("file", image);
                const responseData = await axios({
                    method: "POST",
                    url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
                    data: fileData,
                    headers: {
                        pinata_api_key: import.meta.env.VITE_REACT_APP_PINATA_KEY,
                        pinata_secret_api_key: import.meta.env.VITE_REACT_APP_PINATA_SECRET_KEY,
                        "content-type": "multipart/form-data",

                    },
                })
                const url = `${responseData.data.IpfsHash}`;
                setImage(url);
                setImageUploaded(true);
                alert("image uploaded successfully");
                console.log(url);
            } catch (error) {
                console.log(error);
            }
        }
    }

    const handleRegister = async (e) => {
        e.preventDefault();

        setLoading(true);

        const pubAdd = import.meta.env.VITE_REACT_APP_PUBLIC_ADDRESS;


        const contract = new ethers.Contract(
            pubAdd,
            StudentRecords.abi,
            signer
        );

        const getAllStudents = contract.filters.studentCreated(null, aadharNumber);
        const AllStudents = await contract.queryFilter(getAllStudents);
        const condition2 = contract.filters.studentCreated(address);
        const Condition2 = await contract.queryFilter(condition2);

        if (AllStudents.length > 0 || Condition2.length > 0) {
            alert("Student Already Exist");
            navigate('/studentdashboard');
        } else {

            const studentData = await contract.createStudentId(
                name,
                image,
                aadharNumber,
                qual
            );

            await studentData.wait();
            navigate('/studentdashboard');
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
                        {/* <div className="mb-4 ">
                            <DatePicker
                                selected={dob}
                                onChange={(date) => setDOB(date)}
                                dateFormat="dd/MM/yyyy"
                                placeholderText="Date of Birth"
                                className="w-full p-2 border border-gray-300 rounded focus:outline-none"
                            />
                        </div> */}
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

                        {/* image upload */}
                        <label>Select Image:</label>
                        <input alt="dapp" onChange={ImageHandler} type={'file'} accept=''
                            className="mb-1"
                        />



                        <button onClick={uploadFiles}
                            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 mb-3">
                            Upload Files to IPFS
                        </button>

                        {imageUploaded ?
                            <button
                                onClick={handleRegister}
                                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                            >
                                Confirm
                            </button>
                            :
                            <button disabled
                                onClick={handleRegister}
                                className="w-full bg-gray-500 text-white py-2 rounded"
                            >
                                Confirm
                            </button>
                        }
                    </div>
                </div>
            }
        </div>
    );
};

const Button = styled.button`
    display: flex;
  justify-content:center;
  width:30% ;
  padding:15px ;
  color:white ;
  background-color:#00b712 ;
  background-image:
      linear-gradient(180deg, #00b712 0%, #5aff15 80%) ;
  border:none;
  margin-top:30px ;
  cursor: pointer;
  font-weight:bold ;
  font-size:large ;
`
export default RegisterStudent;

//https://gateway.pinata.cloud/ipfs
