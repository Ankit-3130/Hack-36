import React, { useEffect, useState } from "react";
import bg from "../../images/loginbg.jpg";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import Loader from "../../components/loaders/loader";
import { Appstate } from "../../contextApi";
import { ethers } from "ethers";


const networks = {
  polygon: {
    chainId: `0x${Number(80002).toString(16)}`,
    chainName: "POLYGON AMOY TESTNET",
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18,
    },
    rpcUrls: ["https://rpc-amoy.polygon.technology/"],
    blockExplorerUrls: [" https://www.oklink.com/amoy"],
  },
};

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const {address, setAddress,setSigner, setRpcProvider} = Appstate();
  const [balance,setBalance]=useState(0);
  const [admin,setAdmin]=useState(false);
  
  useEffect(() => {
    setLoading(false);
  }, []);

  // function to fetch wallet Address
  const connectWallet = async () => {
    await window.ethereum.request({ method: "eth_requestAccounts" });
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    if (provider.network !== "matic") {
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            ...networks["polygon"],
          },
        ],
      });
    } 
      const account = provider.getSigner();
      const Address = await account.getAddress();
      alert(Address);
      setAddress(Address);
      setSigner(account);
     
      console.log(account)
      console.log(address);
      const Balance = ethers.utils.formatEther(await account.getBalance());
      setBalance(Balance);
      const RPC_Provider =new ethers.providers.JsonRpcProvider(
        import.meta.env.VITE_REACT_APP_PUBLIC_RPC_URL
    );
    setRpcProvider(RPC_Provider);
    console.log(RPC_Provider)
    if(Address==import.meta.env.VITE_REACT_APP_ADMIN){
      setAdmin(true);
    }
    
    
  };

  return (
    <>
      {loading &&
        <Loader backgroundColor={'#000000ff'} />}

      <div className=" animate-gradient h-screen w-screen flex items-center justify-center border-black shadow-2xl ">
        <div className="relative w-2/4 ml-72 mr-72 h-3/4 rounded-3xl">

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
                Login
              </h1>
            </div>

            {/* Login page center */}
            <div>


              {/* connect to wallet button  */}
              <button
                className=" mb-10 bg-white flex rounded-xl font-bold w-40 justify-center h-10 items-center text-lg hover:scale-110 hover:bg-gray-400"
                onClick={()=>connectWallet()}
              >
                Connect To Wallet
              </button>

              {/* Login as student button */}
             { address?<>
              {
                admin?
                <button
                className=" mb-10 bg-white flex rounded-xl font-bold w-40 justify-center h-10 items-center text-lg hover:scale-110 hover:bg-gray-400"
                onClick={() => {
                  navigate("/admindashboard");
                }}
              >
                Go To Admin Page
              </button>:
              <>
              <button
                className=" mb-10 bg-white flex rounded-xl font-bold w-40 justify-center h-10 items-center text-lg hover:scale-110 hover:bg-gray-400"
                onClick={() => {
                  navigate("/studentregister");
                }}
              >
                Register As a Student
              </button>
              <button
                className=" mb-10 bg-white flex rounded-xl font-bold w-40 justify-center h-10 items-center text-lg hover:scale-110 hover:bg-gray-400"
                onClick={() => {
                  navigate("/studentdashboard");
                }}
              >
               Dashboard
              </button>
              </>
              }
              </>:
              <>
              </>}
              {/* <button
                className=" mb-10 bg-white flex rounded-xl font-bold w-40 justify-center h-10 items-center text-lg hover:scale-110 hover:bg-gray-400"
                onClick={() => {
                  navigate("/studentlogin");
                }}
              >
                As Student
              </button>



              {/* Login as institution button */}
             {/* <button
                className=" bg-white flex rounded-xl font-bold w-40 justify-center h-10 items-center text-lg hover:scale-110 hover:bg-gray-400"
                onClick={() => {
                  navigate("/institutionlogin");
                }}
              >
                As Institution
              </button> */}


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

export default Login;
