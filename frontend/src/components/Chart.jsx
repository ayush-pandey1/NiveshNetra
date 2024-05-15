import React, { useMemo } from 'react'
import ReactApexChart from "react-apexcharts";
import { candleStickOptions } from '../utility/constants';

function Chart(props) {
    const chartData = props.data;
    // useMemo(()=> console.log(chartData),[]);
  
  return (
    <>  
        <ReactApexChart
            series={
                [
                    {
                        data:chartData,
                    }
                ]
            }
            options={candleStickOptions}
            type="candlestick"
            height={500}
            width={1000}
            

        
        />
    </>
  )
}

export default Chart