const mongoose = require("mongoose");

const bannerSchema=new mongoose.Schema({
    title:{
          type:String,
          required:true,
          default: "Rent premises and equipment hassle-free"
    },
    subtitle:{
          type:String,
          required:true,
          default: "Now we are here for those of you who are looking for equipment to rent camping gear"
    },
    imageUrl:{
          type:String,
          required:true,
          default:"studentHero.png"
    },
    buttonText:{
           type:String,
           default:"Looking For Now"
    },
    isActive:{
           type:Boolean,
           required:true
    }
});

module.exports = mongoose.model("Banner", bannerSchema);