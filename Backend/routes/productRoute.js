const express = require("express");
const router = express.Router();   // requiring router object
const wrapAsync = require("../utils/wrapAsync");

const Service = require("../model/product");
const productController = require("../controllers/productController");


router
    .route("/:id")
    .get(wrapAsync(productController.getProductById));

module.exports = router;