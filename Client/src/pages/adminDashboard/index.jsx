import React from "react";
import "../login/styles.css";
import StudentDropdown from "../../components/adminDashboard/Dropdownfile";

import { useState } from "react";
import { NavMenu2 } from "../../components/Navbar/Navbar";

function index() {
  const [admin, setAdmin] = useState("Admin");
  return (
    <div className="animate-gradient4 h-screen w-screen p-4">
      <div>
        <NavMenu2 User={admin} />
      </div>
      <div className="bg-gray-800 text-white mt-24 flex justify-center items-center flex-col rounded-3xl">
        <h1 className="mt-7 mb-9 text-3xl">Select qualification</h1>
        <div className="mt-4 mb-9">
          <StudentDropdown />
        </div>
      </div>
    </div>
  );
}

export default index;
