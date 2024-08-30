// const jwt = require("jsonwebtoken");
// const authGuard = (req, res, next) => {
//   //# check incoming data
//   console.log(req.headers);
//   //   //1.Get auth headers(content type, authorization...)
//   //   //2. Get 'Atuhorization'
//   const authHeader = req.headers.authorization;
//   //   //3. if not found stop the process (response)
//   if (!authHeader) {
//     return res.status(400).json({
//       success: false,
//       message: "Authorization header not found",
//     });
//   }
//   //   //4. authorization format : 'Bearer tokens'
//   //   //5. get only token by splitting by space(0-Bearer, 1-token)
//   const token = authHeader.split(" ")[1];
//   //   //   6. if token not found or mismatch(stop the process, res)
//   if (!token || token == "") {
//     return res.status(400).json({
//       success: false,
//       message: "Token is missing!",
//     });
//   }
//   //   //7. verify the token
//   //   // 8. if verified. next
//   //   //9. not:d not authenticated
//   try {
//     //get verfied the token and the user info
//     const decodeUser = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decodeUser;
//     next();
//   } catch (error) {
//     console.log(error);
//     res.status(400).json({
//       success: false,
//       message: "Not Authenticated",
//     });
//   }
// };

// //admin Guard
// const adminGuard = (req, res, next) => {
//   //# check incoming data
//   console.log(req.headers);
//   //   //1.Get auth headers(content type, authorization...)
//   //   //2. Get 'Atuhorization'
//   const authHeader = req.headers.authorization;
//   //   //3. if not found stop the process (response)
//   if (!authHeader) {
//     return res.status(400).json({
//       success: false,
//       message: "Authorization header not found",
//     });
//   }
//   //   //4. authorization format : 'Bearer tokens'
//   //   //5. get only token by splitting by space(0-Bearer, 1-token)
//   const token = authHeader.split(" ")[1];
//   //   //   6. if token not found or mismatch(stop the process, res)
//   if (!token || token == "") {
//     return res.status(400).json({
//       success: false,
//       message: "Token is missing!",
//     });
//   }
//   //   //7. verify the token
//   //   // 8. if verified. next
//   //   //9. not:d not authenticated
//   try {
//     //get verfied the token and the user info
//     const decodeUser = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decodeUser;
//     console.log(decodeUser);

//     // check if user is admin or not
//     if (!req.user.isAdmin) {
//       console.log("isadmin check");
//       return res.status(400).json({
//         success: false,
//         message: "Permission Denied",
//       });
//     }
//     next();
//   } catch (error) {
//     console.log(error);
//     res.status(400).json({
//       success: false,
//       message: "Not Authenticated",
//     });
//   }
// };
// module.exports = { authGuard, adminGuard };
// // module.exports = authGuard

// // const authGuard = require()
const jwt = require("jsonwebtoken");
const User = require("../models/userModels");

const authGuard = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("Authorization Header:", authHeader);

  if (!authHeader) {
    return res.status(400).json({
      success: false,
      message: "Authorization header not found",
    });
  }

  const token = authHeader.split(" ")[1];
  console.log("Token:", token);

  if (!token || token === "") {
    return res.status(400).json({
      success: false,
      message: "Token is missing!",
    });
  }

  try {
    const decodeUser = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded User:", decodeUser);

    // If decodeUser contains the user data directly, like this:
    // { id: 'some-id', isAdmin: false, iat: 1620978341 }
    req.user = decodeUser;

    // Or if decodeUser wraps the user data inside another object:
    // { user: { id: 'some-id', isAdmin: false }, iat: 1620978341 }
    // req.user = decodeUser.user;

    next();
  } catch (error) {
    console.log("Authentication error:", error);
    return res.status(401).json({
      success: false,
      message: "Not Authenticated",
    });
  }
};
const adminGuard = (req, res, next) => {
  //# check incoming data
  console.log(req.headers);
  //   //1.Get auth headers(content type, authorization...)
  //   //2. Get 'Atuhorization'
  const authHeader = req.headers.authorization;
  //   //3. if not found stop the process (response)
  if (!authHeader) {
    return res.status(400).json({
      success: false,
      message: "Authorization header not found",
    });
  }
  //   //4. authorization format : 'Bearer tokens'
  //   //5. get only token by splitting by space(0-Bearer, 1-token)
  const token = authHeader.split(" ")[1];
  //   //   6. if token not found or mismatch(stop the process, res)
  if (!token || token == "") {
    return res.status(400).json({
      success: false,
      message: "Token is missing!",
    });
  }
  //   //7. verify the token
  //   // 8. if verified. next
  //   //9. not:d not authenticated
  try {
    //get verfied the token and the user info
    const decodeUser = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodeUser;
    console.log(decodeUser);

    // check if user is admin or not
    if (!req.user.isAdmin) {
      console.log("isadmin check");
      return res.status(400).json({
        success: false,
        message: "Permission Denied",
      });
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "Not Authenticated",
    });
  }
};
module.exports = { authGuard, adminGuard };
