const { signUp
    ,login,
    logout
 } = require("../controllers/user.controller.js");

const router = require("express").Router();

router.post("/signUp",signUp);
router.post("/login",login);
router.post("/logout",logout);

module.exports=router;