import React, { useEffect, useState } from "react";
import bg from "../../images/registerbg.jpg";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loaders/loader";
import "./styles.css";


const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <>
      {loading ?
        <Loader backgroundColor={'#000000ff'} />
        :
        <div className=" animate-gradient2 h-screen w-screen flex items-center justify-center border-black shadow-2xl ">
          <div className="relative w-2/4 ml-72 mr-72 h-3/4 rounded-3xl">

            {/* Card background */}
            <div className="absolute top-0 bg-cover w-full h-full z-[0]">
              <img
                src={bg}
                className="w-full h-full rounded-3xl border-black shadow-2xl "
              />
            </div>

            <div className=" inset-0 backdrop-blur-sm  h-full rounded-3xl flex flex-col justify-center items-center  ">

              {/* Register Heading */}
              <div className="flex justify-center">
                <h1 className="text-white mb-20 font-bold text-5xl flex justify-center">
                  Register
                </h1>
              </div>

              {/* Register page center */}
              <div>

                {/* Student register button */}
                <button
                  className=" mb-10 bg-white flex rounded-xl font-bold w-40 justify-center h-10 items-center text-lg hover:scale-110 hover:bg-gray-400"
                  onClick={() => {
                    navigate("/studentregister");
                  }}
                >
                  Student
                </button>


                {/* Login page link */}
                <button
                  className="text-white mt-24 flex items-center justify-center hover:underline ml-5"
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  {"          "}
                  Back To Login !{" "}
                </button>
              </div>


            </div>
          </div>
        </div>
      }
    </>
  );
};

export default Register;
