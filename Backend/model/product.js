const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
        enum: ["Academic", "Residential", "Commercial", "Furniture", "Electronics"], 
        default: "Academic"
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: "https://www.jiomart.com/images/product/original/rv1hni2iix/mychetan-side-switch-electric-iron-made-in-india-heavy-weight-iron-450-w-dry-iron-2-kg-dry-iron-product-images-orv1hni2iix-p608957500-0-202409201657.jpg?im=Resize=(1000,1000)", 
        set: (v) => v === "" ? "https://www.jiomart.com/images/product/original/rv1hni2iix/mychetan-side-switch-electric-iron-made-in-india-heavy-weight-iron-450-w-dry-iron-2-kg-dry-iron-product-images-orv1hni2iix-p608957500-0-202409201657.jpg?im=Resize=(1000,1000)" : v
    },

    pricing: {
        type: {
            type: String,
            default: "RENT"
        },
        ratePerDay: {
            type: Number,
            required: true,
            min: 0
        },
        securityDeposit: {
            type: Number,
            default: 0
        },
        aiSuggestedPrice: {
            type: Number
        }
    },
    status: {
        type: String,
        enum: ["AVAILABLE", "RENTED", "MAINTENANCE"],
        default: "AVAILABLE"
    },
    condition: {
        type: String,
        enum: ["New", "Like New", "Good", "Fair"],
        default: "Good"
    },
    locationTag: {
        type: String,
        required: true
    }
}, { timestamps: true }); // Auto adds createdAt and updatedAt

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
