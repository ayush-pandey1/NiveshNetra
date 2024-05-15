import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";
import { loginRoute } from "../utility/APIRoutes.js";

function Login() {
  const navigate=useNavigate();

  useEffect(() => {
    if (localStorage.getItem("NiveshNetra-app")) {
      navigate("/");
    }
  }, [])
  const toastOption = {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: false,
    newestOnTop: false,
    rtl: false,
  };

  const toastOption2 = {
    position: "bottom-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  };

  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const validateForm = () => {
    const { username, password } = values;
    if (username < 1) {
      toast.error("Username and Password is required.", toastOption);
      return false;
    } else if (password < 1) {
      toast.error("Username and Password is required.", toastOption);
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      const { username, password } = values;
      const { data } = await axios.post(loginRoute, {
        username,
        password,
      });
      if (data.status === false) {
        toast.error(data.msg, toastOption);
      }
      if (data.status === true) {
        // toast.success("Successful",toastOption);
        localStorage.setItem("NiveshNetra-app", JSON.stringify(data.user));

        navigate("/");
        toast.success("Successful",toastOption);
      }
    }
  };

  return (
    <>
      <div className="flex w-full h-screen justify-center items-center">
        <div className="bg-white lg:w-3/12 md:6/12 w-10/12 m-auto drop-shadow-md rounded-lg">
          <div className="py-8 px-8 rounded-xl">
            <div className="">
              <h1 className="font-extrabold text-3xl mt-3 text-center text-[#7A73FC]">Nivesh<span className="text-[#606F7B]">Netra</span></h1>
              <h1 className="font-bold text-2xl mt-3 text-center ">Login</h1>
            </div>
            <form
              action=""
              onSubmit={(event) => handleSubmit(event)}
              className="mt-6"
            >
              <div className="my-5 text-sm">
                <label htmlFor="username" className="block text-black">
                  Username
                </label>
                <input
                  type="text"
                  autoFocus
                  id="username"
                  name="username"
                  onChange={(e) => handleChange(e)}
                  className="rounded-sm px-4 py-3 mt-3 focus:outline-none bg-gray-100 w-full"
                  placeholder="Username"
                />
              </div>

              <div className="my-5 text-sm">
                <label htmlFor="password" className="block text-black">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  onChange={(e) => handleChange(e)}
                  className="rounded-sm px-4 py-3 mt-3 focus:outline-none bg-gray-100 w-full"
                  placeholder="Password"
                />
                <div className="flex justify-end mt-2 text-xs text-gray-600">
                  <a href="#">
                    <button
                      onClick={() => alert("Feature Will be added soon !!")}
                    >
                      Forget Password?
                    </button>
                  </a>
                </div>
              </div>

              <button
                type="submit"
                className="block text-center rounded-md text-white bg-black p-3 duration-300 hover:bg-black w-full"
              >
                Login
              </button>
            </form>

            <p className="mt-12 text-xs text-center font-light text-gray-400">
              {" "}
              Don't have an account?{" "}
              <Link to="/auth/signup" className="text-black font-medium">
                {" "}
                Signup{" "}
              </Link>{" "}
            </p>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Login;
