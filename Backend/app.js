if (process.env.NODE_ENV !== "production") {
  require('dotenv').config();
}
const express=require("express");
const cookieParser = require('cookie-parser');
const cors=require("cors"); // middleware which help in make frontend backend connection without blocking frontend
const app=express();
const mongoose=require("mongoose");
const Banner=require("./model/banner");
const Product=require("./model/product");
const Service = require("./model/services");
const serviceRouter = require("./routes/services");
const productRouter=require("./routes/productRoute");
const authRouter=require("./routes/authRoutes");
const userRouter=require("./routes/userRoutes");
const PORT=process.env.PORT || 8080;


async function main() {
  const Mongo=process.env.MongoURL;
  await mongoose.connect(Mongo);
}

main().then((req,res)=>{
    console.log("working");
})
.catch((err)=>{
    console.log(err);
})

// app.get("/testListing",async(req,res)=>{
//     const sampleProducts = new Product(
//     {
//         category: "Academic",
//         title: "Scientific Calculator Casio fx-991EX",
//         description: "Perfect for engineering students. High-resolution display allowed in exams.",
//         image: "https://rukminim2.flixcart.com/image/480/640/k9u8zgw0/calculator/c/s/q/casio-plus-2nd-edition-fx82es-original-imafrjhubycumwvq.jpeg?q=90",
//         pricing: {
//             type: "RENT",
//             ratePerDay: 15,
//             securityDeposit: 500,
//             aiSuggestedPrice: 12
//         },
//         status: "AVAILABLE",
//         condition: "Like New",
//         locationTag: "Hostel Block A"
//     })
//     await sampleProducts.save();
//     console.log("working sample");
//     res.send("testcase working");
// })

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get("/",(req,res)=>{
    res.send("working");
})

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

app.use("/newProduct",AddNewProduct);
app.use("/item",productRouter);
app.use("/api/booking",bookItemCartRouter);
app.use("/services", serviceRouter);
app.get("/api/hero", async (req, res) => {
    try {
        const heroData = await Banner.findOne({ isActive: true });
        
        if (!heroData) {
            return res.status(404).json({ message: "No active banner found" });
        }
        res.status(200).json(heroData);
    } catch (err) {
        console.error("Hero API Error:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

app.get("/api/products",async(req,res)=>{
    try{
       const allProduct=await Product.find({});
       res.status(200).json(allProduct);
    }catch(err){
        console.log(err);
    }
})
app.get("/api/product/:id",async(req,res)=>{
   const {id}=req.params;
   try{
   const product=await Product.findById(id);
   if(!product){
    res.status(404).json({message:"Product not found"});
   }
   res.status(200).json({product});
}catch(err){
   console.log(err);
}
})

// ---------services-------- 
// app.get("/api/services", async(req,res) =>{
//     try{
//         const allServices = await Service.find({});
//         res.status(200).json(allServices);
//     }catch(err){
//         console.log(err);
//     }
// });

// app.get("/api/services/:id",async(req,res)=>{
//    const {id}=req.params;
//    try{
//    const service=await Service.findById(id);
//    if(!service){
//     res.status(404).json({message:"Service not found"});
//    }
//    res.status(200).json({service});
// }catch(err){
//    console.log(err);
// }
// });





app.listen(PORT,()=>{
    console.log("app is listening the port:8080");
})
