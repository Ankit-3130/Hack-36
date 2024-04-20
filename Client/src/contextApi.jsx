import React, { createContext, useContext, useEffect, useState } from "react";


const Appcontext = createContext();

const AppProvider = ({ children }) => {
  const [signer, setSigner] = useState();
  
  const [address, setAddress] = useState("");
  const [rpcProvider, setRpcProvider] = useState();
  const [studentRecords,setStudentRecords]=useState();


  return (
    <Appcontext.Provider
      value={{
  signer, setSigner,

        address,
        setAddress,
        rpcProvider,
        setRpcProvider,
        studentRecords,
        setStudentRecords
         }}
    >
      {children}
    </Appcontext.Provider>
  );
};

export const Appstate = () => {
  return useContext(Appcontext);
};

export default AppProvider;