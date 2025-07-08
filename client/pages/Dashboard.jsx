import React, { useContext } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { assets } from "../src/assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";

const Dashboard = () => {
  const navigate = useNavigate();
  const { companyData, companyToken } = useContext(AppContext);
  const handleLogout = () => {
    localStorage.removeItem("companyToken");
    navigate("/");
    toast.success("Logout Successfully");
  };
  return (
    <div className="min-h-screen">
      {/* navbar for Recruiter */}
      <div className="shadow py-4 ">
        <div className="px-5 flex justify-between items-center">
          <img
            onClick={() => navigate("/")}
            className="max-sm:w-32 cursor-pointer"
            src={assets.logo}
            alt=""
          />
          {companyData && (
            <div className="flex items-center gap-3">
              <p className="max-sm:hidden">Welcome, {companyData?.name}</p>
              <div className="relative group">
                <img
                  className="w-8 border rounded-full"
                  src={companyData?.image}
                  alt=""
                />
                <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12">
                  <ul className="list-none m-0 p-2 bg-white rounded-md border text-sm">
                    <li className="py-1 px-2 cursor-pointer pr-10">Profile</li>
                    <li
                      className="py-1 px-2 cursor-pointer pr-10"
                      onClick={handleLogout}
                    >
                      Logout
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-start">
        {/* left sidebars with option to add jobs manage jobs amd view applications */}
        <div className="inline-block min-h-screen border-r-2">
          <ul className="flex flex-col items-start pt-5 text-gray-800 ">
            <NavLink
              className={({ isActive }) =>
                `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${
                  isActive && "bg-blue-100 border-l-4 border-blue-500"
                }`
              }
              to={"/dashboard/add-job"}
            >
              <img className="min-w-4" src={assets.add_icon} alt="" />
              <p className="max-sm:hidden">Add Job</p>
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 transition ${
                  isActive ? "bg-blue-100 border-l-4 border-blue-500" : ""
                }`
              }
              to={"/dashboard/manage-jobs"}
            >
              <img className="min-w-4" src={assets.home_icon} alt="" />
              <p className="max-sm:hidden">Manage Jobs</p>
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 transition ${
                  isActive ? "bg-blue-100 border-l-4 border-blue-500" : ""
                }`
              }
              to={"/dashboard/view-applications"}
            >
              <img className="min-w-4" src={assets.person_tick_icon} alt="" />
              <p className="max-sm:hidden">View Applications</p>
            </NavLink>
          </ul>
        </div>
        <div className="flex-1 h-full p-2 sm:p-5">
          <Outlet />
        </div>
      </div>
      <footer className="border-t border-gray-300 mt-6 py-4 text-center text-sm text-gray-500 shadow py-4">
        © {new Date().getFullYear()} JobHunt. All rights reserved.
      </footer>
    </div>
  );
};

export default Dashboard;
