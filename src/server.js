require("dotenv").config();
const express=require('express');
const app=express();
const connectDB = require("./config/db");
// Connect to MongoDB
connectDB();
// Start Express Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
