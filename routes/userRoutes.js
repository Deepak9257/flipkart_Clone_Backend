const express = require("express");
const verifyToken = require("../middlewares/verifyToken");
const userController = require("../controllers/userController");
const router = express.Router();

router.post("/create", userController.createUser);
router.post("/login", userController.loginUser);
router.post("/send-otp", userController.sendOtp);
router.post("/verify-otp", userController.verifyOtp);
router.post('/forgot-password', userController.forgotPassword)
router.put('/reset-password/:token', userController.resetPassword)

//protected routes

router.post('/logout', verifyToken, userController.logoutUser);
router.delete("/delete", verifyToken, userController.deleteUser);
router.put("/update", verifyToken, userController.updateUser);


module.exports = userRoutes = router;

