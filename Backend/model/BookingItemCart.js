const mongoose = require('mongoose');

const bookingItemCartSchema = new mongoose.Schema({
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
        required:true
    },
    // Client Detail
    renterName:{
        type:String,
        required:true
    },
    renterPhone:{
        type:String,
        required:true
    },
    renterAddress:{
        type:String,
        required:true,
    },

    rentalPeriod:{
       startDate:{type:Date,required:true},
       endDate:{type:Date,required:true},
    },

    pricing: {
        totalRent: { type: Number, required: true }, // ratePerDay * days
        securityDeposit: { type: Number, required: true },
        totalPayable: { type: Number, required: true } // totalRent + securityDeposit
    },
    razorpayOrderId: { type: String }, // Created before payment
    razorpayPaymentId: { type: String }, // Created after successful payment
    paymentStatus: {
        type: String,
        enum: ["PENDING", "COMPLETED", "FAILED"],
        default: "PENDING"
    },
    status: {
        type: String,
        enum: ["Order Placed", "In Transit", "Handed Over", "Completed"],
        default: "Order Placed"
    },
    isPaymentReleasedToSeller: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports= mongoose.model("BookingItemCart",bookingItemCartSchema);
