const express = require("express");
const router = express.Router();   // requiring router object
const wrapAsync = require("../utils/wrapAsync");

const Service = require("../model/product");
const upload = require("../utils/upload");
const productController = require("../controllers/productController");


router
    .route("/:id")
    .get(wrapAsync(productController.getProductById));

router.post(
    "/verify-return/:bookingId",
    upload.single("video"),
    wrapAsync(productController.verifyReturn)
);
module.exports = router;