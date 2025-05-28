const express = require("express");
const userController = require("../controllers/user.controller");

const router = express.Router();

// Create a new user
router.post("/user/register", userController.signUp);

// Verify a user by email
router.get("/verify-email", userController.verifyEmail);

module.exports = router;
