const express=require("express");
const app=express();
const mongoose=require("mongoose");
const product=require("./model/product");

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

app.get("/",(req,res)=>{
    res.send("working");
})
app.listen(port,()=>{
    console.log("app is listening the port:8080");
})
