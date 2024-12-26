const express = require("express");
const authController = require('../controller/authController');

const {authenticateJWT} = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/google", authController.loginGoogle);

router.get('/oauth/google', authController.googleCallback);

router.get('/protected', authenticateJWT, authController.protectedRoute);

module.exports = router;