const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("connected Database successfully");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
module.exports = dbConnect;
