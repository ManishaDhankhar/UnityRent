const mongoose = require("mongoose");
const Product = require("../model/product");
const allData = require("./data");

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/UnityRental');
}

async function init() {
  try {
    await Product.deleteMany({});
    console.log("Database cleared...");

    await Product.insertMany(allData.data);
    console.log("Data inserted successfully!");

    // CRITICAL: Use await here to actually see the result
    const items = await Product.find({}); 
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