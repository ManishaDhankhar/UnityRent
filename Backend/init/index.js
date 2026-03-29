if (process.env.NODE_ENV !== "production") {
  require('dotenv').config();
}
const mongoose = require("mongoose");
const Banner=require("../model/banner");
const bannerData=require("./bannerData");
const Product = require("../model/product");
const allData = require("./data");

async function main() {
  const Mongo=process.env.MongoURL;
  await mongoose.connect(Mongo);
}

async function init() {
  try {
    await Product.deleteMany({});
    await Banner.deleteMany({});
    console.log("Database cleared...");

    await Banner.insertMany(bannerData.data);
    await Product.insertMany(allData.data);
    console.log("Data inserted successfully!");

    // CRITICAL: Use await here to actually see the result
    const ban=await Banner.find({});
    const items = await Product.find({}); 
    console.log(ban);
    console.log("Current Items in DB:", items);
  } catch (err) {
    console.log("Initialization Error:", err);
  }
}

// THE FIX: Chain them so init() waits for main()
main()
  .then(() => {
    console.log("Mongoose working...");
    return init(); // This is the secret sauce!
  })
  .then(() => {
    console.log("Process complete. Closing connection.");
    mongoose.connection.close();
  })
  .catch((err) => {
    console.log("Connection Error:", err);
  });