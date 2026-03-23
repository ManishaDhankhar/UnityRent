const express=require("express");
const cors=require("cors"); // middleware which help in make frontend backend connection without blocking frontend
const app=express();
const mongoose=require("mongoose");
const Product=require("./model/product");

const port=8080;

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/UnityRental');

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

app.get("/",(req,res)=>{
    res.send("working");
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


app.listen(port,()=>{
    console.log("app is listening the port:8080");
})
