import React, { useEffect, useState } from "react";
import {
  deleteWatchlistRoute,
  getWatchlistRoute,
} from "../utility/APIRoutes.js";
import { getIntradayDataRoute } from "../utility/APIRoutes.js";
import { formatedData } from "../utility/formatedData.js";
import Chart from "./Chart.jsx";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Watchlist() {

    const toastOption = {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        newestOnTop: false,
        rtl: false,
      };

  const [searchKeyword, setSearchKeyword] = useState("");
  const [intradayData, setIntradayData] = useState(null);
  const [chartData, setChartData] = useState(null);

  const [data, setData] = useState([]);
  const userString = localStorage.getItem("NiveshNetra-app");
  const user = JSON.parse(userString);
  const userID = user._id;

  useEffect(() => {
    try {
      const fetchWatchlist = async () => {
        try {
          const response = await axios.post(getWatchlistRoute, {
            userID: userID,
          });
          if (response.data) {
            setData((prevData) => [
              ...new Set([...prevData, ...response.data]),
            ]);
          } else {
            console.log("No symbols found in response");
          }
        } catch (error) {
          console.error("Error fetching watchlist:", error.message);
        }
      };

      fetchWatchlist();
    } catch (error) {}
  }, []);

  const handleDelete = async (symbol) => {
    try {
      // Update on server
      const response = await axios.post(deleteWatchlistRoute, {
        userID,
        symbol,
      });

      // Update locally
      if (response.status == 200) {
        setData((currentData) => currentData.filter((item) => item !== symbol));
        window.location.reload();
      }
      
    } catch (error) {
      console.error("Failed to delete symbol:", error.message);
    }
  };

  const handleWatchButton = async (symbol, event) => {
    setSearchKeyword(symbol);
    console.log(symbol)

    try {
        const response = await axios.post(getIntradayDataRoute, {
          symbol: symbol.toUpperCase(),
        });
        setIntradayData(response.data);
  
        if(response.data['Error Message']){
          toast.error("Please enter a valid symbol/ticker.",toastOption);
        }
  
        const newData= formatedData(response.data);
        setChartData(newData);
      //   console.log(data);
      } catch (error) {
        console.error("Error fetching intraday data:", error.message);
      }
  }
  return (
    <>
      <div className="flex flex-col justify-center items-center w-full p mt-14">
        <div className="flex flex-col gap-12 justify-center items-center p-4 max-w-screen-lg w-full mb-[5rem]">
          <div className=" flex flex-col justify-center items-center gap-2 ">
            <span className="text-[#7A73FC] text-5xl font-bold ">
              WatchList
            </span>
            <span className="text-[#606F7B]">
              Here you can keep an eye on your favourite stocks.
            </span>
          </div>

          {data.length > 0 ? (
            <div className="bg-white drop-shadow-md border border-gray-300 rounded-md w-full min-h-80 p-4 grid grid-cols-4 gap-4">
              {data.map((symbol, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center justify-center gap-5 rounded-md drop-shadow-md  bg-white border border-[#7A73FC] w-40 h-40"
                >
                  <span className="text-2xl font-bold">{symbol}</span>
                  <div className="flex flex-col items-center justify-center gap-1">
                    <button
                     onClick={() =>handleWatchButton(symbol)}
                      className="bg-[#7A73FC] rounded-md px-4 py-1 text-white font-semibold active:scale-95 transition-all ease-in active:bg-violet-700">
                      Watch
                    </button>
                    <button
                      onClick={() => handleDelete(symbol)}
                      className="bg-red-500 rounded-md px-4 py-1 text-white font-semibold active:scale-95 transition-all ease-in active:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white drop-shadow-md border border-gray-300 rounded-md w-full min-h-80 p-4 flex justify-center items-center">
              <span className="text-2xl font-semibold text-gray-500">
                Watchlist is empty
              </span>
            </div>
          )}
        </div>
        <div>
          <div className=" max-w-screen-lg bg-white p-4 rounded-lg drop-shadow-md">
            {chartData !== null ? (
              <>
                <Chart data={chartData} />
                
              </>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}
