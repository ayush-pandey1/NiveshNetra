import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";
import { signUpRoute } from "../utility/APIRoutes";

function Signup() {
  axios.defaults.withCredentials = true;

  const navigate=useNavigate();
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
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleValidation = () => {
    const { username, email, password } = values;
    if (username.length < 1) {
      toast.error("Username is required.", toastOption);

      return false;
    } else if (email === "") {
      toast.error("Email is required.", toastOption);

      return false;
    } else if (password.length < 1) {
      toast.error("Paasword is required.", toastOption);

      return false;
    } else if (password.length < 8) {
      toast.error(
        "Password should be equal or greater 8 character.",
        toastOption
      );

      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (handleValidation()) {
      try {
        const { username, email, password} = values;
        const { data } = await axios.post(signUpRoute, {
          username,
          email,
          password,
        });

        if (data.status === false) {
          toast.error(data.msg, toastOption);
        } else if (data.status === true) {
          localStorage.setItem("NiveshNetra-app", JSON.stringify(data.user));
          navigate("/");
          toast.success("Registration has been successfully done.", toastOption2);
        }
      } catch (error) {
        if (error.response) {
          // The request was made, but the server responded with an error status code
          console.error("Server returned an error:", error.response.data);
        } else if (error.request) {
          // The request was made, but no response was received
          console.error("No response received from the server:", error.request);
        } else {
          // Something else went wrong
          console.error("Error during the request:", error.message);
        }
      }
    }
  };
  return (
    <>
      <div className="flex w-full h-screen justify-center items-center">
        <div className="bg-white lg:w-3/12 md:6/12 w-10/12 m-auto drop-shadow-md rounded-lg">
          <div className="py-8 px-8 rounded-xl">
            <div>
              <h1 className="font-extrabold text-3xl mt-3 text-center text-[#7A73FC]">Nivesh<span className="text-[#606F7B]">Netra</span></h1>
              <h1 className="font-bold text-2xl mt-3 text-center ">SignUp</h1>
            </div>
            <form action="" onSubmit={(event) => handleSubmit(event)} className="mt-6">
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
                <label htmlFor="email" className="block text-black">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  onChange={(e) => handleChange(e)}
                  className="rounded-sm px-4 py-3 mt-3 focus:outline-none bg-gray-100 w-full"
                  placeholder="Email"
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
              </div>

              <button
                type="submit"
                className="block text-center rounded-md text-white bg-black p-3 duration-300 hover:bg-black w-full"
              >
                Continue
              </button>
            </form>

            <p className="mt-12 text-xs text-center font-light text-gray-400">
              {" "}
              Already have an account?{" "}
              <Link to="/auth/login" className="text-black font-medium">
                {" "}
                login{" "}
              </Link>{" "}
            </p>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Signup;
