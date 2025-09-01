require("dotenv").config();
const userRoutes = require("./gamemodules/user/user.routes");
const express=require('express');
const app=express();
const connectDB = require("./config/db");
// Connect to MongoDB
connectDB();

app.use(express.json());
app.use("/api", userRoutes);

// Start Express Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
