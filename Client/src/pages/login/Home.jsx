import React, { useEffect, useState } from "react";
import bg from "../../images/loginbg.jpg";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import "./home.css";
import Loader from "../../components/loaders/loader";


const Home = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  const handleConnectToMetamask = () => {
    // connect to metamask here
    navigate('/studentregister');
    // navigate('/studentdashboard');
    // navigate('/admindashboard');
  }

  return (
    <>
      {loading &&
        <Loader backgroundColor={'#000000ff'} />}

      <div className=" animate-gradient h-screen w-screen flex items-center justify-center border-black shadow-2xl ">
        <div className="relative home-card rounded-3xl">

          {/* Card background */}
          <div className="absolute top-0 bg-cover w-full h-full z-[0]">
            <img
              src={bg}
              className="w-full h-full rounded-3xl border-black shadow-2xl "
            />
          </div>

          <div className=" inset-0 backdrop-blur-sm  h-full rounded-3xl flex flex-col justify-center items-center  ">

            {/* Login Heading */}
            <div className="flex justify-center">
              <h1 className="text-white mb-20 font-bold text-5xl flex justify-center">
                Thalachain
              </h1>
            </div>

            {/* Card center */}
            <div>


              {/* Connect to metamask button */}
              <button
                className=" mb-10 bg-white flex rounded-xl font-bold p-2 justify-center items-center text-lg hover:scale-110 hover:bg-gray-400"
                onClick={(e) => {
                  handleConnectToMetamask()
                }}
              >
                Connect Metamask
              </button>



              {/* Register page link */}
              {/* <button
                className="text-white mt-24 ml-2 hover:underline"
                onClick={() => {
                  navigate("/register");
                }}
              >
                {" "}
                new ? register here !{" "}
              </button> */}

            </div>


          </div>


        </div>
      </div>

    </>
  );
};

export default Home;
