import React, { useState } from "react";
import Pdfopener from "../pdfopener/pdfopener";
import TableFromJSON from "../jsontotable/jsonToTable";
import { readPdf } from "../../utils/pdfExtract";
import { useEffect } from "react";
import StudentRecords from "../../abiJson/studentRecords.json"
import Student from "../../abiJson/student.json"
import { Appstate } from "../../contextApi";
import {ethers} from "ethers";
import axios from "axios";

const StudentDropdown = () => {
  const [selectedLabel, setSelectedLabel] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [file, setFile] = useState(null);
  const [submittedDocuments, setSubmittedDocuments] = useState({});
  const [jsondata, setJsondata] = useState(null);
  const [tenth,setTenth]=useState([]);
  const [twelfth,setTwelfth]=useState([]);
  const [college,setCollege]=useState([]);
  const {address,signer,rpcProvider}=Appstate();
  const [students,setStudents]=useState({
    "10th": [],
    "12th": [],
    "College": [],
  })
  const labels = ["10th", "12th", "College"];

  // const students = {
  //   "10th": [],
  //   "12th": [],
  //   "College": [],
  // };

  useEffect(()=>{
    const Request = async () => {
      
      
      const contract = new ethers.Contract(
          import.meta.env.VITE_REACT_APP_PUBLIC_ADDRESS,
           StudentRecords.abi,
          rpcProvider
      );

      const getAllStudents = contract.filters.studentRegistered();
      const AllStudents = await contract.queryFilter(getAllStudents);
      console.log(AllStudents);
      const AllData = AllStudents.map((e) => {
          return {
              owner: e.args.owner,
              studentId: e.args.studentId,
              course:Number(e.args.course),
              name: e.args.name,
              imgURL:e.args.dob,
              timeStamp: parseInt(e.args.timestamp),

          }
      });
      console.log(AllData);
      const updatedStudents = {
        "10th": [],
        "12th": [],
        "College": [],
      };
      AllData.forEach(obj => {
        
        if (obj.course === 0) {
          updatedStudents["10th"] = [...updatedStudents["10th"], `${obj.studentId}`];
        } else if (obj.course === 1) {
          updatedStudents["12th"] = [...updatedStudents["12th"],   `${obj.studentId}`];

        } else {
          updatedStudents["College"] = [...updatedStudents["College"], `${obj.studentId}`];

        }
    });
    

// Update the "10th" array in the new object
//updatedStudents["10th"] = [...updatedStudents["10th"], newValue]; // newValue is the value you want to add

// Update the state with the new object
setStudents(updatedStudents);
  }
  Request();
  },[])



  const [viewfile, setViewFile] = useState(false);

  const handleLabelChange = (label) => {
    setSelectedLabel(label);
    // alert(label)
    setSelectedStudent(null);
    setFile(null);
  };

  const handleStudentChange = (student) => {
    setSelectedStudent(student);
    setFile(null);
  };

  const handleFileChange = async (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);
    // read the pdf
    let jsonvalue = await readPdf(uploadedFile);
    setJsondata(jsonvalue);
  };

  const handleFileSubmit = async () => {
    // Here you can implement logic to save the file for the selected student
    console.log(`File for ${selectedStudent} (${selectedLabel}):`, file);
    // Reset selected student and file after submission
    if(file !== null) {
      try {
         const fileData=new FormData();
         fileData.append("file",file);
         const responseData=await axios({
            method:"POST",
            url:"https://api.pinata.cloud/pinning/pinFileToIPFS",
            data:fileData,
            headers:{
                pinata_api_key:import.meta.env.VITE_REACT_APP_PINATA_KEY,
                pinata_secret_api_key:import.meta.env.VITE_REACT_APP_PINATA_SECRET_KEY,
                "content-type":"multipart/form-data",

            },
         })
         const url=`${responseData.data.IpfsHash}`;
         const contract = new ethers.Contract(selectedStudent, Student.abi, signer);
         console.log(contract);
       const qual=await contract.qualification();
       console.log(qual);

       const studentData = await contract.feedData(
        qual,
        url
    );
    await studentData.wait();

   
    

      } catch (error) {
        console.log(error);
      } 
    }
    

    setSelectedStudent(null);
    setFile(null);
    // Update submittedDocuments state
    setSubmittedDocuments({
      ...submittedDocuments,
      [selectedStudent]: true,
    });
  };

  const isDocumentSubmitted = (student) => {
    return submittedDocuments[student];
  };

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex space-x-4">
        {labels.map((label) => (
          <button
            key={label}
            onClick={() => handleLabelChange(label)}
            className={`py-2 px-4 rounded ${selectedLabel === label
              ? "bg-blue-500 text-black"
              : "bg-gray-300 text-gray-700 hover:bg-green-500"
              }`}
          >
            {label}
          </button>
        ))}
      </div>
      {selectedLabel && (
        <div className=" flex space-x-4">
          <select
            value={selectedStudent || ""}
            onChange={(e) => handleStudentChange(e.target.value)}
            className="py-2 px-4 rounded bg-black border border-gray-300 max-h-11"
          >
            <option value="">Select Student</option>
            {students[selectedLabel].map((student) => (
              <option key={student} value={student}>
                {student}{" "}
                {isDocumentSubmitted(student) && (
                  <span className="text-green-500 ">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;✓
                  </span>
                )}
              </option>
            ))}
          </select>
          {selectedStudent && (
            <div className="flex-col">
              <div className="flex flex-row">
                <input
                  type="file"
                  accept=".pdf"
                  style={{ display: "none" }}
                  id="fileInput"
                  onChange={handleFileChange}
                  className="py-2 px-4 rounded bg-black border border-gray-300"
                />
                <label
                  htmlFor="fileInput"
                  className="hover:underline hover:cursor-pointer bg-black border border-gray-400 border-solid border-2 p-2"
                >
                  {file ? file.name : "Click Here To Select File"}
                </label>
                <button
                  onClick={handleFileSubmit}
                  className="py-2 px-4 rounded bg-blue-500 text-black ml-8 hover:scale-110 rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-[#1b85b6] via-[#04c8d2] to-[#091ab1] hover:shadow-xl hover:shadow-blue-500 hover:scale-105 duration-300 hover:from-[#2993b7] hover:to-[#3aaade]"
                >
                  Submit
                </button>
                <button
                  className=" ml-5 flex items-center  justify-center gap-2 w-28 h-12 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-[#fb7185] via-[#e11d48] to-[#be123c] hover:shadow-xl hover:shadow-red-500 hover:scale-105 duration-300 hover:from-[#be123c] hover:to-[#fb7185]"
                  onClick={() => {
                    setFile(null);
                  }}
                >
                  <svg viewBox="0 0 15 15" className="w-5 fill-white">
                    <svg
                      className="w-6 h-6"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                      ></path>
                    </svg>
                    Button
                  </svg>
                </button>
                {file && (
                  <button
                    className="w-64 ml-6 cursor-pointer flex justify-between bg-gray-800 px-3 py-2 rounded-full text-white tracking-wider shadow-xl hover:bg-gray-900 hover:scale-105 duration-500 hover:ring-1 font-mono "
                    onClick={() => {
                      if (!viewfile) setViewFile(true);
                      else setViewFile(false);
                    }}
                  >
                    {viewfile ? (
                      <div>Close File Preview</div>
                    ) : (
                      <div>View File Preview</div>
                    )}

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      className="w-5 h-5 animate-bounce"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
                      ></path>
                    </svg>
                  </button>
                )}
              </div>
              {viewfile && file && (
                <div className=" mt-6 h-48 overflow-x-scroll overflow-y-scroll">
                  <Pdfopener val={file} />
                </div>
              )}
              {file && (
                <div className="mt-3 mr-56">
                  <TableFromJSON jsonvalue={jsondata} />
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StudentDropdown;
