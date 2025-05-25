const express = require("express");
const dotenv = require("dotenv");
const userRoutes = require("./router/user.router.js");
dotenv.config();
const dbConnect = require("./config/database");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin:process.env.FRONTEND_URL,
  credentials:true,
  methods:"GET,POST,PUT,DELETE",
  allowedHeaders: ["content-type", "Authoriztion"]
}))
const PORT = process.env.PORT || 4002;
//database connection call
dbConnect();

// Use routes
app.use("/user", userRoutes);
app.listen(PORT, () => {
  console.log(`Sever is running at Port : ${PORT}`);
});
