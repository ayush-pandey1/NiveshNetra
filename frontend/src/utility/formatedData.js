

export const formatedData = (intradayData) => {
    const data =[];


    if(intradayData["Time Series (30min)"]){
        Object.entries(intradayData["Time Series (30min)"])
        .map(
            ([key,value]) => {
                data.push({
                    x:key,
                    y:[
                        value['1. open'],
                        value['2. high'],
                        value['3. low'],
                        value['4. close'],
                    ]
                })
            }
        )
    }
   
    return data;

}