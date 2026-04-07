const express = require("express");
const router = express.Router();   // requiring router object
const wrapAsync = require("../utils/wrapAsync");

const CreateNewProduct = require("../controllers/CreateNewProduct");

router.post(
    "/",
    wrapAsync(CreateNewProduct.getNewProductByFormFilling)
);

module.exports = router;