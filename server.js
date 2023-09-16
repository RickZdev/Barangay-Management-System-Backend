require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// routes
const userRoutes = require("./server/routes/userRoute");
const authRoutes = require("./server/routes/authRoute");
const residentRoutes = require("./server/routes/residentRoute");
const complaintsRoutes = require("./server/routes/complaintsRoute");
const announcementRoute = require("./server/routes/announcementRoute");
const transactionRoute = require("./server/routes/transactionRoute");
const adminRoute = require("./server/routes/adminRoute");
const loginAuditRoute = require("./server/routes/loginAuditRoute");
const borrowedInventoryRoute = require("./server/routes/borrowedInventoryRoute");
const borrowedRecordRoute = require("./server/routes/borrowedRecordRoute");
const officialRoute = require("./server/routes/officialRoute");
const blotterRoute = require("./server/routes/blotterRoute");
const sulatReklamoRoute = require("./server/routes/sulatReklamoRoute");
const indigentBenefitRoute = require("./server/routes/indigentBenefitRoute");

// express app
const app = express();

// middleware
app.use(express.json());
// app.use(cors({ origin: "http://localhost:3000", optionsSuccessStatus: 200 }));
app.use(cors());
app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});

// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/residents", residentRoutes);
app.use("/api/complaints", complaintsRoutes);
app.use("/api/announcements", announcementRoute);
app.use("/api/transactions", transactionRoute);
app.use("/api/admins", adminRoute);
app.use("/api/loginaudits", loginAuditRoute);
app.use("/api/borrowedinventory", borrowedInventoryRoute);
app.use("/api/borrowedrecords", borrowedRecordRoute);
app.use("/api/officials", officialRoute);
app.use("/api/blotters", blotterRoute);
app.use("/api/sulatreklamo", sulatReklamoRoute);
app.use("/api/indigentbenefits", indigentBenefitRoute);

// connect to db/mongoose
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for request
    app.listen(process.env.PORT, () => {
      console.log(`connected to db and listening on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
  });
