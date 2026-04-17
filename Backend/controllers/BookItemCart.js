const Product = require("../model/product");
const BookingItemCart=require("../model/BookingItemCart");
const Razorpay = require("razorpay");
const crypto = require("crypto");

const getRazorpayInstance = () => {
    return new Razorpay({
        key_id:"rzp_test_SdQyahlRvGquqk",
        key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
};

exports.getBookItemCartDetail=async(req,res)=>{
    try{
        const {productId, renterName, renterPhone, renterAddress, startDate, endDate}=req.body;


        const product=await Product.findById(productId);
        if(!product)return res.status(404).json({message:"Product not found"});

        const start=new Date(startDate);
        const end=new Date(endDate);
        const diffTime=Math.abs(end-start);
        const diffDays=Math.ceil(diffTime/(1000*60*60*24));

        const totalRent=product.pricing.ratePerDay*diffDays;
        const securityDeposit=product.pricing.securityDeposit;
        const totalPayable=Math.round(totalRent+securityDeposit);

        const options = {
            amount: totalPayable * 100, 
            currency: "INR",
            receipt: `receipt_${Date.now()}`,
        };
        const razorpayInstance = getRazorpayInstance();
        const razorpayOrder = await razorpayInstance.orders.create(options);

        const newBooking = new BookingItemCart({
            product: productId,
            renterName,
            renterPhone,
            renterAddress,
            rentalPeriod: { startDate: start, endDate: end },
            razorpayOrderId: razorpayOrder.id,
            pricing: {
                totalRent,
                securityDeposit,
                totalPayable
            },
            status: "Order Placed" 
        });

        const saveBooking=await newBooking.save();
        res.status(201).json({
            message:"Booking Initialized",
            bookingId:saveBooking._id,
            amountToPay:totalPayable,
            razorpayOrderId: razorpayOrder.id,
        });
    }catch(err){
        console.error("RAZORPAY ERROR:", err);
        res.status(500).json({error:err.message});
    }
}

exports.verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, bookingId } = req.body;

        const sign = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSign = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(sign.toString())
            .digest("hex");

        if (razorpay_signature === expectedSign) {
            // Update the booking status to COMPLETED
            await BookingItemCart.findByIdAndUpdate(bookingId, { 
                paymentStatus: "COMPLETED",
                razorpayPaymentId: razorpay_payment_id 
            });
            return res.status(200).json({ message: "Payment verified successfully" });
        } else {
            return res.status(400).json({ message: "Invalid signature!" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getUserCart = async (req, res) => {
    try {
        const { phone } = req.params;
        const bookings = await BookingItemCart.find({ renterPhone: phone })
            .populate("product") // This pulls the image and title from your Product model
            .sort({ createdAt: -1 });
            
        res.status(200).json(bookings);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

