const express = require("express");
const router = express.Router();   // requiring router object
const wrapAsync = require("../utils/wrapAsync");

const Service = require("../model/product");
const upload = require("../utils/upload");
const productController = require("../controllers/productController");


router.get("/:id", wrapAsync(productController.getProductById));
router.put("/:id", wrapAsync(productController.getProductIdAndUpdate));
router.delete("/:id", wrapAsync(productController.getProductIdAndDelete));

router.post(
    "/verify-return/:bookingId",
    upload.single("video"),
    wrapAsync(productController.verifyReturn)
);
module.exports = router;