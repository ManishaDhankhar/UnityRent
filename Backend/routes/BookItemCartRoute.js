const express=require('express');
const router=express.Router();
const wrapAsync = require("../utils/wrapAsync");
const Product=require("../model/product");
const BookingItemCart=require("../model/BookingItemCart");
const BookItemCart=require("../controllers/BookItemCart");

router.post("/verify", wrapAsync(BookItemCart.verifyPayment));
router.post("/new",wrapAsync(BookItemCart.getBookItemCartDetail));
router.get("/my-cart/:phone", wrapAsync(BookItemCart.getUserCart));


module.exports = router;