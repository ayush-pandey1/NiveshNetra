const UserWatchlists = require("../models/userWatchlist.model.js");

module.exports.createWatchlist = async (req,res,next) => {
    try{
        const { userID, symbolData } = req.body;
        // console.log("User ID:", userID);
        // console.log("Symbol Data:", symbolData);

        // Find the user's watchlist
        let watchlist = await UserWatchlists.findOne({ user: userID });
        
        if (watchlist) {
            if (!watchlist.symbols.includes(symbolData)) {
                watchlist.symbols.push(symbolData);
                await watchlist.save();
                return res.status(201).json(watchlist);
            } else {
                return res.status(202).json(watchlist);
            }
        } else {
        
            watchlist = new UserWatchlists({ user: userID, symbols: [symbolData] });
            await watchlist.save();
            console.log("Created new watchlist:", watchlist);
        }

        return res.status(201).json(watchlist);
    }
    catch(error){
       return res.status(500).json({ message: error.message });
    }
};

module.exports.getWatchlistByUser = async (req,res,next) => {
    try {
        const {userID} = req.body;
        const watchlist = await UserWatchlists.findOne({ user: userID });
        return res.status(200).json(watchlist.symbols);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports.deleteWatchlistByUser = async (req,res,next) => {
    try {
        const { userID, symbol } = req.body;


        const result = await UserWatchlists.updateOne(
            { user: userID },
            { $pull: { symbols: symbol } }
        );
        
       
        if (result.modifiedCount > 0) {
            return res.status(200).json({ message: 'Symbol removed successfully' });
        } else {
            return res.status(404).json({ message: 'Symbol not found in watchlist' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};