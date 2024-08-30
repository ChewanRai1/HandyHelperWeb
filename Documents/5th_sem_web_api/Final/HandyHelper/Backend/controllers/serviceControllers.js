const path = require("path");
const serviceModel = require("../models/serviceModels");
const User = require("../models/userModels");
const Review = require("../models/reviewModels");
const FavoriteModel = require("../models/favoriteModels");
const fs = require("fs");

const createService = async (req, res) => {
  console.log("Request user:", req.user); // Check if req.user is available
  const userId = req.user ? req.user.id : null;

  if (!userId) {
    return res.status(400).json({
      success: false,
      message: "User not authenticated",
    });
  }

  console.log(req.body);
  console.log(req.files); // Log file details

  const {
    serviceName,
    servicePrice,
    serviceCategory,
    serviceDescription,
    serviceLocation,
  } = req.body;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({
      success: false,
      message: "No file was uploaded.",
    });
  }

  const serviceImage = req.files.serviceImage;

  if (
    !serviceName ||
    !servicePrice ||
    !serviceCategory ||
    !serviceDescription ||
    !serviceLocation ||
    !serviceImage
  ) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  const uploadPath = path.join(
    __dirname,
    "../public/uploads/",
    serviceImage.name
  );

  serviceImage.mv(uploadPath, async (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({
        success: false,
        message: "File upload failed.",
        error: err,
      });
    }

    try {
      const newService = new serviceModel({
        serviceName,
        servicePrice,
        serviceCategory,
        serviceDescription,
        serviceLocation,
        serviceImage: serviceImage.name, // Save only the filename
        userId,
      });
      const service = await newService.save();
      res.status(201).json({
        success: true,
        message: "Service created",
        data: service,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
    }
  });
};

const getServicesByUser = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming you are using a middleware that adds user data to the request
    const services = await serviceModel.find({ userId });

    if (!services) {
      return res
        .status(404)
        .json({ success: false, message: "No services found for this user" });
    }
    res.status(200).json({ success: true, services });
  } catch (error) {
    console.error("Error fetching user services:", error);
    res
      .status(500)
      .json({ success: false, message: "Error fetching services" });
  }
};

//fetch all Services
const getAllServices = async (req, res) => {
  try {
    //logic
    //Find all the Services
    const services = await serviceModel.find({});
    // send response
    res.status(201).json({
      success: true,
      message: "Service fetched successfully!",
      services: services,
    });
  } catch (error) {
    console.log(error);
  }
};
//delete Service
const deleteService = async (req, res) => {
  //get service id
  const serviceId = req.params.id;

  try {
    await serviceModel.findByIdAndDelete(serviceId);

    res.status(201).json({
      success: true,
      message: "Service Deleted!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
const getService = async (req, res) => {
  const serviceId = req.params.id;
  console.log("Service ID:", serviceId);

  try {
    // Attempt to find the service by its ID
    const service = await serviceModel.findById(serviceId);

    // Check if the service was found
    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    // If the service is found, return it in the response
    res.status(200).json({
      success: true,
      message: "Service fetched successfully",
      service,
    });
  } catch (error) {
    // Handle any errors that occur during the process
    console.log("Error fetching service:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
// approve service
const approveService = async (req, res) => {
  const serviceId = req.params.id;

  try {
    const service = await Services.findById(serviceId);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    service.isApproved = true; // Assuming you have an 'isApproved' field in your service schema
    await service.save();

    res.status(200).json({
      success: true,
      message: "Service approved successfully",
      service,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};

const updateService = async (req, res) => {
  try {
    //if there is files, upload new and delete the old one
    if (req.files && req.files.ServiceImage) {
      //upload new to /public/Services
      //1.Destrusture files
      const { serviceImage } = req.files;

      //make a new image name
      //1. Genarate unique name for each file
      const imageName = `${Date.now()}-${serviceImage.name}`;
      //2. define sspecific path
      const imageUploadPath = path.join(
        __dirname,
        `../public/services/${imageName}`
      );

      //move to folder
      await serviceImage.mv(imageUploadPath);

      //replace serviceImage name to new name
      req.body.serviceImage = imageName;

      //# Delete the old image
      // Find  produc tInfo (e have onlby ID)
      const existingService = await serviceModel.findById(req.params.id);

      //Search that iomage in directory
      if (req.body.serviceImage) {
        //if new image is uploaaded, then only remove old image
        const oldImagePath = path.join(
          __dirname,
          `../public/services/${existingService.serviceImage}`
        );
        //delete from file system
        fs.unlinkSync(oldImagePath);
      }
    }
    //update in database
    const updatedService = await serviceModel.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    //send a response
    res.status(201).json({
      success: true,
      message: "Service Updated!",
      updatedService: updatedService,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server error",
      error: error,
    });
  }
};

// pagination
const servicePagination = async (req, res) => {
  const resultPerPage = 4;
  const pageNo = parseInt(req.query._page) || 1;
  const category = req.query.category || ""; // Get category from query parameters

  try {
    // Construct the query object
    let query = {};
    if (category) {
      query.serviceCategory = category;
    }

    // Get the total number of services matching the query
    const totalServices = await serviceModel.countDocuments(query);

    // Fetch Services matching the query with pagination
    const services = await serviceModel
      .find(query)
      .skip((pageNo - 1) * resultPerPage)
      .limit(resultPerPage);

    if (services.length === 0) {
      return res.status(200).json({
        success: false,
        message: "No Service Found!",
        hasMore: false,
        totalServices,
        resultPerPage,
      });
    }

    res.status(200).json({
      success: true,
      message: "Services Fetched",
      services,
      hasMore: services.length === resultPerPage,
      totalServices,
      resultPerPage,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server Error!",
      totalServices,
      resultPerPage,
    });
  }
};
const getAllServicesByUserId = async (req, res) => {
  const userId = req.params.id;

  try {
    const service = await serviceModel.find({ createdBy: userId }).exec();
    if (!service) {
      console.log(service);
    }
    res.status(201).json({
      success: true,
      message: "Service Fetched!",
      service: service,
    });
  } catch (e) {
    console.log(e);
    res.json({
      success: false,
      message: "Server Error!",
    });
  }
};

// Add a service to the cart
const addToCart = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const { serviceId } = req.body;
    if (!serviceId) {
      return res
        .status(400)
        .json({ success: false, message: "Service ID is required" });
    }

    // Check if the Service is already in the cart
    if (!user.cartItem.some((item) => item.equals(serviceId))) {
      user.cartItem.push(serviceId);
      await user.save();
      return res
        .status(200)
        .json({ success: true, message: "Service added to cart" });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Service already in cart" });
    }
  } catch (error) {
    console.error("Error in addToCart:", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Remove a Service from the cart
const removeCartItem = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const { serviceId } = req.params;

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (!Array.isArray(user.cartItem)) {
      user.cartItem = [];
    }

    // Log current cart items
    console.log("Current cart items:", user.cartItem);

    // Remove the service from the cart
    const initialCartLength = user.cartItem.length;
    user.cartItem = user.cartItem.filter(
      (item) => item.toString() !== serviceId
    );

    // Check if any items were removed
    if (user.cartItem.length === initialCartLength) {
      return res
        .status(404)
        .json({ success: false, message: "Service not found in cart" });
    }

    // Log updated cart items
    console.log("Updated cart items:", user.cartItem);

    await user.save();

    res
      .status(200)
      .json({ success: true, message: "Service removed from cart" });
  } catch (error) {
    console.error("Error in removeCartItem:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
// Get all services in the cart
const getCartItems = async (req, res) => {
  try {
    const userId = req.user.id;

    // Fetch the user and populate the 'cart' field with service details
    const user = await User.findById(userId).populate({
      path: "cartItem", // Use 'cartItems' as defined in your schema
      select: "serviceTitle servicePrice serviceImage", // Adjust fields as necessary
    });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    console.log("Cart Items:", user.cartItem); // Log the cart items
    return res.status(200).json({ success: true, cartItem: user.cartItem });
  } catch (error) {
    console.error("Error in getCartItems:", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};
// add to favourite
// const addFavoriteService = async (req, res) => {
//   try {
//     console.log("User from token:", req.user);
//     const user = await User.findById(req.user.id);

//     if (!user) {
//       return res
//         .status(404)
//         .json({ success: false, message: "User not found" });
//     }

//     // Ensure favorites is an array
//     if (!Array.isArray(user.favorites)) {
//       user.favorites = [];
//     }

//     const { serviceId } = req.body;
//     if (!serviceId) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Service ID is required" });
//     }

//     if (!user.favorites.includes(serviceId)) {
//       user.favorites.push(serviceId);
//       await user.save();
//       res
//         .status(200)
//         .json({ success: true, message: "Service added to favorites" });
//     } else {
//       res
//         .status(400)
//         .json({ success: false, message: "Service already in favorites" });
//     }
//   } catch (error) {
//     console.error("Error in addFavoriteService:", error);
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// };

// const removeFavoriteService = async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id);
//     const { serviceId } = req.params; // Use req.params to match the route parameter

//     if (!user) {
//       return res
//         .status(404)
//         .json({ success: false, message: "User not found" });
//     }

//     user.favorites = user.favorites.filter(
//       (favorite) => favorite.toString() !== serviceId
//     );
//     await user.save();

//     res
//       .status(200)
//       .json({ success: true, message: "Service removed from favorites" });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// };

// const getFavoriteServices = async (req, res) => {
//   try {
//     const userId = req.user.id; // From authGuard

//     // Fetch the user and populate the 'favorites' field with Service details
//     const user = await User.findById(userId).populate("favorites");

//     if (!user) {
//       return res
//         .status(404)
//         .json({ success: false, message: "User not found" });
//     }

//     return res.status(200).json({ success: true, favorites: user.favorites });
//   } catch (error) {
//     console.error("Error in getFavoriteServices:", error);
//     return res.status(500).json({ success: false, message: "Server Error" });
//   }
// };
// Add a service to the favorites
const addFavoriteService = async (req, res) => {
  const { serviceId } = req.body;
  const userId = req.user.id;

  if (!serviceId) {
    return res.status(400).json({
      success: false,
      message: "Service ID is required",
    });
  }

  try {
    const service = await serviceModel.findById(serviceId);
    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    const favorite = await FavoriteModel.create({ serviceId, userId });

    res.status(200).json({
      success: true,
      message: "Service added to favorites",
      data: favorite,
    });
  } catch (error) {
    console.error("Error adding service to favorites:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
// Remove a service from the favorites
// Remove a service from the favorites
const removeFavoriteService = async (req, res) => {
  try {
    const userId = req.user.id;
    const { favoriteId } = req.params; // Adjusted to use favoriteId

    console.log("Removing favorite with ID:", favoriteId);

    const favorite = await FavoriteModel.findByIdAndDelete(favoriteId);

    if (!favorite) {
      return res.status(404).json({
        success: false,
        message: "Favorite not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Service removed from favorites",
    });
  } catch (error) {
    console.error("Error removing favorite service:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Get favorite services
const getFavoriteServices = async (req, res) => {
  try {
    const userId = req.user.id;
    const favorites = await FavoriteModel.find({ userId }).populate(
      "serviceId"
    );

    console.log("Fetched Favorites with Populated Services:", favorites); // Log the populated results

    res.status(200).json({
      success: true,
      favorites,
    });
  } catch (error) {
    console.error("Error fetching favorite services:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
// search the Services
const searchServices = async (req, res) => {
  const { search, page, limit, sort } = req.query;
  const pageNumber = parseInt(page) || 1;
  const pageSize = parseInt(limit) || 10; // Default page size
  const sortBy = sort || "createdAt"; // Default sort field (use your preferred default)

  try {
    let query = {};

    // Construct the search query
    if (search) {
      query.serviceTitle = { $regex: search, $options: "i" }; // Case-insensitive search
    }

    // Sorting
    const sortOptions = {};
    if (sortBy) {
      const [field, order] = sortBy.split(","); // e.g., "createdAt,desc"
      sortOptions[field] = order || "asc"; // Default to ascending order if not specified
    }

    // Fetch services with pagination and sorting
    const services = await serviceModel
      .find(query)
      .sort(sortOptions)
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize);

    // Count total documents matching the query
    const totalServices = await serviceModel.countDocuments(query);

    res.status(200).json({
      success: true,
      message: "Services searched successfully",
      services,
      totalPages: Math.ceil(totalServices / pageSize),
    });
  } catch (error) {
    console.error("Error searching services:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};

const createReview = async (req, res) => {
  console.log("req.user:", req.user);
  console.log("req.body:", req.body);

  const { serviceId, rating, comment } = req.body;

  if (!serviceId || !rating || !comment) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  try {
    const review = new Review({
      serviceId: serviceId,
      userId: req.user.id,
      rating: rating,
      comment: comment,
    });

    await review.save();
    console.log("Review saved:", review);

    const service = await serviceModel.findById(serviceId);
    console.log("Service found:", service);
    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }
    // Update the average rating and number of reviews
    service.numberOfReviews += 1;
    service.averageRating =
      (service.averageRating * (service.numberOfReviews - 1) + rating) /
      service.numberOfReviews;

    await service.save();
    console.log("Service updated:", service);

    res.status(201).json({
      success: true,
      message: "Review created successfully",
      data: review,
    });
  } catch (error) {
    console.log("Error in createReview:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};

// Get reviews for a service
const getServiceReviews = async (req, res) => {
  const serviceId = req.params.id;

  try {
    const reviews = await Review.find({ serviceId: serviceId }).populate(
      "userId",
      "firstName"
    );

    res.status(200).json({
      success: true,
      message: "Reviews fetched successfully",
      reviews,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};

// Update a review
const updateReview = async (req, res) => {
  const { reviewId, rating, comment } = req.body;

  try {
    const review = await Review.findById(reviewId);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    if (!review.isOwner(req.user)) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    review.rating = rating;
    review.comment = comment;

    await review.save();

    res.status(200).json({ message: "Review updated successfully", review });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createService,
  getServicesByUser,
  getAllServices,
  deleteService,
  getService,
  approveService,
  updateService,
  servicePagination,
  getAllServicesByUserId,
  addToCart,
  getCartItems,
  removeCartItem,
  addFavoriteService,
  removeFavoriteService,
  getFavoriteServices,
  searchServices,
  createReview,
  getServiceReviews,
  updateReview,
};
