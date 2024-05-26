const express = require("express");
const app = express();
const cors = require("cors");
// const http = require('http');
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// require("./Backend/models/server.js");

const router = require("./Backend/routes/userRoutes");
const router2 = require("./Backend/routes/productRoutes");
const router3 = require("./Backend/routes/transactionRoutes");
const router4 = require("./Backend/routes/bookingRoutes");

app.use("/api/user", router);
app.use("/api/items", router2);
app.use("/api/transac", router3);
app.use("/api/bookings", router4);

app.get("/", (req, res) => {
  res.send("<h1> welcome </h1>");
});

app.listen(process.env.PORT, "0.0.0.0", () => {
  console.log("running");
});
