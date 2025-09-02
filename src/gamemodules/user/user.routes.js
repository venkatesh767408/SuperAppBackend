const express = require("express");
const router = express.Router();
const userController = require("./user.controller");

// authenticaation 
const {
  register,
  verifyRegistration,
  login,
  forgotPassword,
  verifyOtpReset,
  resetPassword,
} = require('./userauth.controller');

// user registration and login
router.post('/user/register', register);
router.post('/user/verify-registration', verifyRegistration);
router.post('/user/login', login);
router.post('/user/forgot-password', forgotPassword);
router.post('/user/verify-otp-reset', verifyOtpReset);
router.post('/user/reset-password', resetPassword);

// User management
//router.post("/user", userController.createUser);
router.get("/user/all", userController.getAllUsers);
router.get("/user/:id", userController.getUserById);
router.delete("/users/:id", userController.deleteUser);

// Role & subscription management
router.post("/users/:id/subscribe", userController.subscribeToTeam); // Fan/Parent subscribes to team
router.post("/users/:id/assign-role", userController.assignTeamRole); // Assign Coach/Player role

module.exports = router;
