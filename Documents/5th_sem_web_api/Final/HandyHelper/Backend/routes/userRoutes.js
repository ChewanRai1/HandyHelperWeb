const router = require("express").Router();
const userControllers = require("../controllers/userControllers");
const authenticateUser = require("../middleware/authUser"); // Import the authentication middleware
const { authGuard } = require("../middleware/authGuard");

// Make a create user API
router.post("/register", userControllers.createUser);

// controllers -routes- (Index.js)

// login user api
router.post("/login", userControllers.loginUser);

// get profile info
router.get("/getprofile", authGuard, userControllers.getProfile);

// Update Profile
router.put("/updateprofile", authGuard, userControllers.updateProfile);
router.post("/changePassword", authGuard, userControllers.changePassword);

// forgot password api
router.post("/forgot_password", userControllers.forgotPassword);

router.post("/verify_otp", userControllers.verifyOtpAndPassword);
//exporting
module.exports = router;
