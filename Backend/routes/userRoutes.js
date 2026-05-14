const express = require("express");
const userAuth = require("../middleware/userAuth");
const { getUserData } = require("../controllers/userController");
const router = express.Router();  

router.
    get("/data", userAuth, getUserData);


module.exports = router;