import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { logoutRoute } from "../utility/APIRoutes.js";
import axios from "axios";

export default function Navbar() {
  const navigate = useNavigate();
  const loggedIn = JSON.parse(localStorage.getItem("NiveshNetra-app"));

  const handleLogout = async () => {
    const user = await JSON.parse(localStorage.getItem("NiveshNetra-app"));
    const userId = user._id;
    await axios.post(logoutRoute, {
        userId,
      })
      .catch((error) => {
        console.error("Error :", error);
      });
    localStorage.removeItem("NiveshNetra-app");
    navigate("/auth/login");
  };

  return (
    <>
      <nav className="  w-full z-20 top-0 start-0 border-b border-gray-300    ">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto py-4 ">
          <span className="self-center text-2xl font-extrabold whitespace-nowrap text-[#7A73FC]">
            Nivesh<span className="text-[#606F7B]">Netra</span>
          </span>

          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            {!loggedIn ? (
              <>
                <Link to="/auth/login">
                  <button
                    type="button"
                    className="text-white bg-black  font-semibold rounded-lg text-sm px-4 py-2 text-center  "
                  >
                    Login
                  </button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/auth/login">
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="bg-white drop-shadow-md text-[#606F7B]  font-semibold rounded-lg text-sm px-4 py-2 text-center  "
                  >
                    Logout
                  </button>
                </Link>
              </>
            )}

            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-sticky"
              aria-expanded="false"
            ></button>
          </div>
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-sticky"
          >
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border  rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0  ">
              <li>
                <Link
                  to="/"
                  className="block py-2 px-3 text-[#606F7B]  font-semibold rounded md:bg-transparent  md:p-0 hover:-translate-y-1 transition-transform ease-in"
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/watchlist"
                  className="block py-2 px-3 text-[#606F7B] font-semibold  rounded md:bg-transparent  md:p-0 hover:-translate-y-1 transition-transform ease-in"
                >
                  Watchlist
                </Link>
              </li>
              
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
