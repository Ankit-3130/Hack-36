/* eslint-disable react/no-unknown-property */
import React, { useEffect } from "react";
import "../login/styles.css";
import { useState } from "react";
import { NavMenu } from "../../components/Navbar/Navbar";
import Pdfopener from "../../components/pdfopener/pdfopener";
import Loader from "../../components/loaders/loader";

function Index() {
  const [name, setName] = useState("Student1");
  const [aadhar, setAadhar] = useState("8888 8888 8888");
  const [tenth, setTenth] = useState(true);
  const [twelfth, setTwelfth] = useState(true);
  const [college, setCollege] = useState(true);
  const [showtenth, setShowpdftenth] = useState(false);
  const [showtwelfth, setShowpdftwelfth] = useState(false);
  const [showCollege, setShowpdfCollege] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch aadhar and name
    setLoading(false);
  }, []);

  return (
    <>
      {loading ?
        <Loader backgroundColor={'#000000ff'} />
        :
        <div className=" animate-gradient3 h-full w-full p-4">
          <NavMenu User={name} Aadhar={aadhar} />

          <div className="p-4 ">

            {/* Class 10th */}
            {tenth && (
              <div className="bg-gray-800 text-white flex-col border-black rounded-3xl mb-8 pb-2">
                <div className="p-4 border-black  flex justify-center text-3xl">
                  <div className="bg-blue-300 w-80 flex justify-center rounded-full">
                    Result 10th
                  </div>
                </div>
                <div className="flex justify-center mt-2">
                  <button className=" mb-2 group group-hover:before:duration-500 group-hover:after:duration-500 after:duration-500 hover:border-blue-300 hover:before:[box-shadow:_20px_20px_20px_30px_#a21caf] duration-500 before:duration-500 hover:duration-500 underline-offset-2 hover:after:-right-8 hover:before:right-12 hover:before:-bottom-8 hover:before:blur hover:underline hover:underline-offset-4  origin-left hover:decoration-2 hover:text-blue-500 relative bg-neutral-800 h-16 w-64 border text-left p-3 text-gray-50 text-base font-bold rounded-lg  overflow-hidden  before:absolute before:w-12 before:h-12 before:content[''] before:right-1 before:top-1 before:z-10 before:bg-blue-700 before:rounded-full before:blur-lg  after:absolute after:z-10 after:w-20 after:h-20 after:content['']  after:bg-blue-900 after:right-8 after:top-3 after:rounded-full after:blur-lg">
                    Download Result
                  </button>
                </div>
                <div className="flex justify-center mb-2">
                  <button
                    className="border hover:scale-95 duration-300 relative group cursor-pointer text-sky-50  overflow-hidden h-16 w-64 rounded-md bg-sky-200 p-2 flex justify-center items-center font-extrabold"
                    onClick={() => {
                      setShowpdftenth(true);
                    }}
                  >
                    <div className="absolute right-32 -top-4  group-hover:top-1 group-hover:right-2 z-10 w-40 h-40 rounded-full group-hover:scale-150 duration-500 bg-sky-900"></div>
                    <div className="absolute right-2 -top-4  group-hover:top-1 group-hover:right-2 z-10 w-32 h-32 rounded-full group-hover:scale-150  duration-500 bg-sky-800"></div>
                    <div className="absolute -right-12 top-4 group-hover:top-1 group-hover:right-2 z-10 w-24 h-24 rounded-full group-hover:scale-150  duration-500 bg-sky-700"></div>
                    <div className="absolute right-20 -top-4 group-hover:top-1 group-hover:right-2 z-10 w-16 h-16 rounded-full group-hover:scale-150  duration-500 bg-sky-600"></div>
                    <p className="z-10">See Result</p>
                  </button>{" "}
                  {showtenth && (
                    <button
                      title="Close Result"
                      className="group cursor-pointer outline-none -rotate-45 hover:rotate-45 duration-300 ml-28"
                      onClick={() => {
                        setShowpdftenth(false);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="50px"
                        height="50px"
                        viewBox="0 0 24 24"
                        className="stroke-red-400 fill-none group-hover:fill-red-800 group-active:stroke-blue-200 group-active:fill-red-600 group-active:duration-0 duration-300"
                      >
                        <path
                          d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                          stroke-width="1.5"
                        ></path>
                        <path d="M8 12H16" stroke-width="1.5"></path>
                        <path d="M12 16V8" stroke-width="1.5"></path>
                      </svg>
                    </button>
                  )}
                </div>
                <div className="m-3" style={{ borderRadius: '10px', overflow: 'hidden' }}>
                  {showtenth && (
                    <div className="h-64 overflow-x-scroll overflow-y-scroll ">
                      <Pdfopener />
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Class 12th */}
            {twelfth && (
              <div className="bg-gray-800 text-white flex-col border-black rounded-3xl mb-8 pb-2">
                <div className="p-4 border-black  flex justify-center text-3xl">
                  <div className="bg-blue-600 w-80 flex justify-center rounded-full">
                    Result 12th
                  </div>
                </div>
                <div className="flex justify-center mt-2">
                  <button className=" mb-2 group group-hover:before:duration-500 group-hover:after:duration-500 after:duration-500 hover:border-blue-300 hover:before:[box-shadow:_20px_20px_20px_30px_#a21caf] duration-500 before:duration-500 hover:duration-500 underline-offset-2 hover:after:-right-8 hover:before:right-12 hover:before:-bottom-8 hover:before:blur hover:underline hover:underline-offset-4  origin-left hover:decoration-2 hover:text-blue-500 relative bg-neutral-800 h-16 w-64 border text-left p-3 text-gray-50 text-base font-bold rounded-lg  overflow-hidden  before:absolute before:w-12 before:h-12 before:content[''] before:right-1 before:top-1 before:z-10 before:bg-blue-700 before:rounded-full before:blur-lg  after:absolute after:z-10 after:w-20 after:h-20 after:content['']  after:bg-blue-900 after:right-8 after:top-3 after:rounded-full after:blur-lg">
                    Download Result
                  </button>
                </div>
                <div className="flex flex-row justify-center mb-2">
                  <button
                    className="border hover:scale-95 duration-300 relative group cursor-pointer text-sky-50  overflow-hidden h-16 w-64 rounded-md bg-sky-200 p-2 flex justify-center items-center font-extrabold"
                    onClick={() => {
                      setShowpdftwelfth(true);
                    }}
                  >
                    <div className="absolute right-32 -top-4  group-hover:top-1 group-hover:right-2 z-10 w-40 h-40 rounded-full group-hover:scale-150 duration-500 bg-sky-900"></div>
                    <div className="absolute right-2 -top-4  group-hover:top-1 group-hover:right-2 z-10 w-32 h-32 rounded-full group-hover:scale-150  duration-500 bg-sky-800"></div>
                    <div className="absolute -right-12 top-4 group-hover:top-1 group-hover:right-2 z-10 w-24 h-24 rounded-full group-hover:scale-150  duration-500 bg-sky-700"></div>
                    <div className="absolute right-20 -top-4 group-hover:top-1 group-hover:right-2 z-10 w-16 h-16 rounded-full group-hover:scale-150  duration-500 bg-sky-600"></div>
                    <p className="z-10">See Result</p>
                  </button>{" "}
                  {showtwelfth && (
                    <button
                      title="Close Result"
                      className="group cursor-pointer outline-none -rotate-45 hover:rotate-45 duration-300 ml-28"
                      onClick={() => {
                        setShowpdftwelfth(false);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="50px"
                        height="50px"
                        viewBox="0 0 24 24"
                        className="stroke-red-400 fill-none group-hover:fill-red-800 group-active:stroke-blue-200 group-active:fill-red-600 group-active:duration-0 duration-300"
                      >
                        <path
                          d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                          stroke-width="1.5"
                        ></path>
                        <path d="M8 12H16" stroke-width="1.5"></path>
                        <path d="M12 16V8" stroke-width="1.5"></path>
                      </svg>
                    </button>
                  )}
                </div>
                <div className="m-3" style={{ borderRadius: '10px', overflow: 'hidden' }}>
                  {showtwelfth && (
                    <div className="h-64 overflow-x-scroll overflow-y-scroll ">
                      <Pdfopener />
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* College */}
            {college && (
              <div className="bg-gray-800 text-white flex-col border-black rounded-3xl mb-8 pb-2">
                <div className="p-4 border-black  flex justify-center text-3xl">
                  <div className="bg-blue-900 w-80 flex justify-center rounded-full">
                    Result College
                  </div>
                </div>
                <div className="flex justify-center mt-2">
                  <button className=" mb-2 group group-hover:before:duration-500 group-hover:after:duration-500 after:duration-500 hover:border-blue-300 hover:before:[box-shadow:_20px_20px_20px_30px_#a21caf] duration-500 before:duration-500 hover:duration-500 underline-offset-2 hover:after:-right-8 hover:before:right-12 hover:before:-bottom-8 hover:before:blur hover:underline hover:underline-offset-4  origin-left hover:decoration-2 hover:text-blue-500 relative bg-neutral-800 h-16 w-64 border text-left p-3 text-gray-50 text-base font-bold rounded-lg  overflow-hidden  before:absolute before:w-12 before:h-12 before:content[''] before:right-1 before:top-1 before:z-10 before:bg-blue-700 before:rounded-full before:blur-lg  after:absolute after:z-10 after:w-20 after:h-20 after:content['']  after:bg-blue-900 after:right-8 after:top-3 after:rounded-full after:blur-lg">
                    Download Result
                  </button>
                </div>
                <div className="flex justify-center mb-2">
                  <button
                    className="border hover:scale-95 duration-300 relative group cursor-pointer text-sky-50  overflow-hidden h-16 w-64 rounded-md bg-sky-200 p-2 flex justify-center items-center font-extrabold"
                    onClick={() => {
                      setShowpdfCollege(true);
                    }}
                  >
                    <div className="absolute right-32 -top-4  group-hover:top-1 group-hover:right-2 z-10 w-40 h-40 rounded-full group-hover:scale-150 duration-500 bg-sky-900"></div>
                    <div className="absolute right-2 -top-4  group-hover:top-1 group-hover:right-2 z-10 w-32 h-32 rounded-full group-hover:scale-150  duration-500 bg-sky-800"></div>
                    <div className="absolute -right-12 top-4 group-hover:top-1 group-hover:right-2 z-10 w-24 h-24 rounded-full group-hover:scale-150  duration-500 bg-sky-700"></div>
                    <div className="absolute right-20 -top-4 group-hover:top-1 group-hover:right-2 z-10 w-16 h-16 rounded-full group-hover:scale-150  duration-500 bg-sky-600"></div>
                    <p className="z-10">See Result</p>
                  </button>{" "}
                  {showCollege && (
                    <button
                      title="Close Result"
                      className="group cursor-pointer outline-none -rotate-45 hover:rotate-45 duration-300 ml-28"
                      onClick={() => {
                        setShowpdfCollege(false);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="50px"
                        height="50px"
                        viewBox="0 0 24 24"
                        className="stroke-red-400 fill-none group-hover:fill-red-800 group-active:stroke-blue-200 group-active:fill-red-600 group-active:duration-0 duration-300"
                      >
                        <path
                          d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                          stroke-width="1.5"
                        ></path>
                        <path d="M8 12H16" stroke-width="1.5"></path>
                        <path d="M12 16V8" stroke-width="1.5"></path>
                      </svg>
                    </button>
                  )}
                </div>
                <div className="m-3" style={{ borderRadius: '10px', overflow: 'hidden' }}>
                  {showCollege && (
                    <div className="h-64 overflow-x-scroll overflow-y-scroll ">
                      <Pdfopener />
                    </div>
                  )}
                </div>
              </div>

            )}
          </div>
        </div>
      }
    </>
  );
}

export default Index;
