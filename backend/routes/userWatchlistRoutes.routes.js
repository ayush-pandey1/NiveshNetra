const {createWatchlist,
    getWatchlistByUser,
    deleteWatchlistByUser
} = require("../controllers/userWatchlist.controller.js");

const router = require("express").Router();

router.post("/",createWatchlist);
router.post("/retrieve",getWatchlistByUser);
router.post("/delete",deleteWatchlistByUser);

module.exports=router;