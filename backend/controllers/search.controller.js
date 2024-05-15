const axios = require('axios');

module.exports.getIntradayData = async (req, res,next) => {
    try {
        const { symbol } = req.body;

        console.log(symbol);
        const apiKey = 'XYCF40WWPHTUEH4Z';
        // const apiUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${apiKey}`;
        const apiUrl = "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol="+symbol+"&interval=30min&apikey="+apiKey;

        
        const response = await axios.get(apiUrl);
        const data = response.data;
        
        return res.json(data);
    } catch (error) {
        
        
        console.error('Error fetching intraday data:', error);
        res.status(500).json({ error: 'An error occurred while fetching intraday data' });
    }
};
