const express = require("express");
const router = express.Router();
const userController = require("./user.controller");

// Routes
router.post("/user/create", userController.createUser);       
router.get("/user/all", userController.getAllUsers);      
router.get("/user/:id", userController.getUserById);    
router.put("/user/:id", userController.updateUser);     
router.delete("/user/:id", userController.deleteUser);  

module.exports = router;
