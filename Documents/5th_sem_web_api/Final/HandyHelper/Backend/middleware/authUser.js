// const jwt = require("jsonwebtoken");

// const authenticateUser = (req, res, next) => {
//   const token = req.header("Authorization").replace("Bearer ", "");

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.userId = decoded.id;
//     next();
//   } catch (error) {
//     res.status(401).json({
//       success: false,
//       message: "Authentication failed!",
//     });
//   }
// };

// module.exports = authenticateUser;
