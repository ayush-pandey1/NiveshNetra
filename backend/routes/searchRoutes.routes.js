const router = require("express").Router();
const {getIntradayData} = require("../controllers/search.controller.js");


router.post('/intraday', getIntradayData);

module.exports = router;
