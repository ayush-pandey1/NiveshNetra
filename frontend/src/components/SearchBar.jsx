import React, { useState } from "react";
import axios from "axios";
import { formatedData } from "../utility/formatedData.js";
import Chart from "./Chart.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { getIntradayDataRoute } from "../utility/APIRoutes.js";
import {addWatchlistRoute} from "../utility/APIRoutes.js"

export default function SearchBar() {
  const toastOption = {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: false,
    newestOnTop: false,
    rtl: false,
  };

  const [searchKeyword, setsearchKeyword] = useState("");
  const [intradayData, setIntradayData] = useState(null);
  const [chartData, setChartData] = useState(null)

  const handleChange = (event) => {
    setsearchKeyword(event.target.value);
  };
axios.defaults.withCredentials = true;
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(getIntradayDataRoute, {
        symbol: searchKeyword.toUpperCase(),
      });
      setIntradayData(response.data);

      if(response.data['Error Message']){
        toast.error("Please enter a valid symbol/ticker.",toastOption);
      }

      const data= formatedData(response.data);
      setChartData(data);
    //   console.log(data);
    } catch (error) {
      console.error("Error fetching intraday data:", error.message);
    }
  };
  
  // Watchlist 
  const handleWatchlistButtonClick = async (event) =>{
    try {
      const symbolData = intradayData['Meta Data']['2. Symbol'];
      const userString = localStorage.getItem("NiveshNetra-app");
   
      
      const user = JSON.parse(userString);
      
      const userID = user._id;
     

      const response = await axios.post(addWatchlistRoute,{
        userID,
        symbolData
      })
      if(response.status==201){
        toast.success("Successfully added to your watchlist",toastOption);
      }else if(response.status==202){
        toast.success("Stock Already exists in your watchlist",toastOption);
      }
    } catch (error) {
      console.error("Error fetching intraday data:", error.message);
    }
  }


  return (
    <>
      <div className="flex flex-col justify-center items-center w-full p mt-14">
        <div className="flex  p-4 max-w-screen-lg mb-[5rem]">
          <form action="" onSubmit={(event) => handleSubmit(event)}>
            <input
              type="text"
              name="searchKeyword"
              onChange={(e) => handleChange(e)}
              placeholder="Enter the symbol/ticker of stock"
              className="p-4 w-[27rem] rounded-md border border-gray-300 text-black"
            />
            <button
              type="submit"
              className="bg-white font-semibold rounded-lg text-black  px-6 py-4 ml-4 border border-gray-300 hover:bg-slate-200 active:scale-95 transition-all ease-in"
            >
              Search
            </button>
          </form>
        </div>

        <div className=" max-w-screen-lg bg-white p-4 rounded-lg drop-shadow-md">
            {chartData!==null 
            ? (<>
            <Chart data={chartData}/>
            <button onClick={handleWatchlistButtonClick} className="text-white bg-black rounded-lg px-4 py-2 active:scale-95 active:bg-gray-900 transition-all ease-in ">Add to Watchlist</button>
            </>
        )
            :<>
                <p className="text-lg font-semibold">Search for the stock</p>
            </>}
        </div>
      </div>
      <ToastContainer/>
    </>
  );
}
