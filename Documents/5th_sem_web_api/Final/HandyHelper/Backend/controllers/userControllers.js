const User = require("../models/userModels");
const userModel = require("../models/userModels");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const sendOtp = require("../service/sendOtp");
// Make a functon (Logic)

// 1. creating user function

const createUser = async (req, res) => {
  // res.send("Create API is working")
  // 1. Get data from the user (Fname, lname, email,pp)
  console.log(req.body);
  // #. Destruction
  const { firstName, lastName, email, password, phone } = req.body;
  // 2. validation
  if (!firstName || !lastName || !email || !password || !phone) {
    return res.json({
      success: false,
      message: "please enter all fields!",
    });
  }
  // error handling= Try and Catch
  try {
    // 2.1 if not : send the reponse and stop the process
    // 3. if proper data
    // 4. check existing User
    const existingUser = await userModel.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User Already Exists!",
      });
    }

    //Hashing / Encrypt the Password
    const randomSalt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, randomSalt);

    // 4.1 if yes : Send the response and stop the process
    //  if not:
    // 5. Save in the database
    const newUser = new userModel({
      //fields : Values received form user
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashPassword,
      phone: phone,
    });

    //Actually save the user in database
    const myUser = await newUser.save();
    // 6. send the succes response
    res.status(201).json({
      success: true,
      message: "User Created successfully",
      myUser,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "internal server error!",
    });
  }
};
//2. Login user function
const loginUser = async (req, res) => {
  console.log(req.body);

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please enter both fields!",
    });
  }

  try {
    // Find user by email
    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found!",
      });
    }

    // Compare the password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({
        success: false,
        message: "Incorrect Password!",
      });
    }

    // Generate JWT token
    const token = await jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET
    );

    // Send the response with token and user data
    res.json({
      success: true,
      message: "Logged in successfully",
      token: token,
      userData: user,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};
// Fetch the Profile info
const getProfile = async (req, res) => {
  // receive id from URL
  const userId = req.user.id;

  try {
    const user = await userModel.findById(userId);
    console.log(user);
    res.status(201).json({
      success: true,
      message: "User Fetched!",
      user: user,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Server Error!",
    });
  }
};
//3. Update profile

// Update user profile function
const updateProfile = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.user.id, req.body);

    // if (!user) {
    //   return res.json({
    //     success: false,
    //     message: "User not found!",
    //   });
    // }

    // user.firstName = firstName;
    // user.lastName = lastName;
    // user.email = email;

    // const updatedUser = await user.save();

    res.status(201).json({
      success: true,
      message: "User Updated!",
      updatedUser: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error,
    });
  }
};

const changePassword = async (req, res) => {
  const userId = req.user.id;

  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    return res.status(400).json({ msg: "Please fill in all fields" });
  }

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ msg: "Password changed successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
};

//4. Change Password
const forgotPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Store OTP and its expiry time (1 hour)
    user.otpReset = otp;
    user.otpResetExpires = Date.now() + 3600000;
    await user.save();

    // Configure the email transport
    const nodemailer = require("nodemailer");

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // Access email user from .env
        pass: process.env.EMAIL_PASS, // Access email password from .env
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER, // Use the same email as the sender
      to: email,
      subject: "Password Reset OTP",
      text: `Your OTP for password reset is: ${otp}`,
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Email send error:", error);
        return res.status(500).json({ message: "Error sending email" });
      } else {
        console.log("Email sent:", info.response);
        return res.status(200).json({ message: "Password reset OTP sent" });
      }
    });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Verify OTP and Reset Password
const verifyOtpAndPassword = async (req, res) => {
  const { email, otp, password } = req.body;

  if (!email || !otp || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    let storedOtp = String(user.otpReset).trim();
    let receivedOtp = String(otp).trim();

    console.log("Stored OTP:", storedOtp, "Length:", storedOtp.length);
    console.log("Received OTP:", receivedOtp, "Length:", receivedOtp.length);

    if (storedOtp !== receivedOtp) {
      console.log("OTPs do not match");
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (Date.now() > user.otpResetExpires) {
      console.log("OTP has expired");
      return res.status(400).json({ message: "Expired OTP" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.otpReset = undefined;
    user.otpResetExpires = undefined;
    await user.save();

    console.log("Password reset successfully");
    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

//4. Change Password
// fOrgot password
// forgot password using PHONE number
// const forgotPassword = async (req, res) => {
//   const { phone } = req.body;
//   if (!phone) {
//     res.status(400).json({
//       success: false,
//       message: "Please provide phone number!",
//     });
//   }
//   try {
//     // user find and validate
//     const user = await userModel.findOne({ phone: phone });
//     if (!user) {
//       return res.status(400).json({
//         success: false,
//         message: "User Not Found!",
//       });
//     }
//     // generate random otp
//     const otp = Math.floor(100000 + Math.random() * 900000); // 6 digit otp
//     // update in database for verification
//     user.otpReset = otp;
//     user.otpResetExpires = Date.now() + 3600000;
//     await user.save();
//     // sending otp to phone number
//     // const isSent = await sendOtp(phone, otp);
//     // if (!isSent) {
//     //   return res.status(400).json({
//     //     success: false,
//     //     message: "Error Sending OTP",
//     //   });
//     // }
//     // Success Message
//     res.status(200).json({
//       success: true,
//       message: "OTP Send Successfully!",
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       success: false,
//       message: "Server Error!",
//     });
//   }
// };
// //verify otp and set new password
// const verifyOtpAndSetPassword = async (req, res) => {};

// Export the updateProfile function along with createUser and loginUser
module.exports = {
  createUser,
  loginUser,
  getProfile,
  updateProfile,
  changePassword,
  forgotPassword,
  verifyOtpAndPassword,
};
