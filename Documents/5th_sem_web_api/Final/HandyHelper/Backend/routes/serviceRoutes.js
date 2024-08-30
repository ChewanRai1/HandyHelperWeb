const router = require("express").Router();
const serviceControllers = require("../controllers/serviceControllers");
const guard = require("../middleware/authGuard");

router.post("/create", guard.authGuard, serviceControllers.createService);
router.get(
  "/user_services",
  guard.authGuard,
  serviceControllers.getServicesByUser
);

router.get(
  "/get_all_services",
  // guard.adminGuard,

  serviceControllers.getAllServices
);

//delte Service
router.delete(
  "/delete_service/:id",
  // guard.adminGuard,
  serviceControllers.deleteService
);
// Fetch single Service
router.get("/get_single_service/:id", serviceControllers.getService);

// approve the Service
router.put(
  "/approve_service/:id",
  // guard.adminGuard,
  serviceControllers.approveService
);
//update Product
router.put(
  "/update_service/:id",
  // guard.adminGuard,
  serviceControllers.updateService
);

// pagination
router.get("/pagination", serviceControllers.servicePagination);

router.get(
  "/get_all_service_by_userid/:id",
  serviceControllers.getAllServicesByUserId
);

// Cart operations
router.post(
  "/add_cart",
  // guard.authGuard,
  serviceControllers.addToCart
);

router.delete(
  "/remove_cart/:serviceId",
  // guard.authGuard,
  serviceControllers.removeCartItem
);
router.get(
  "/get_cart/:id",
  // guard.authGuard,
  serviceControllers.getCartItems
);

// Add to favorites route
router.post(
  "/add_favorite",
  guard.authGuard,
  serviceControllers.addFavoriteService
);

// Remove from favorites route
router.delete(
  "/favorites/:favoriteId",
  guard.authGuard,
  serviceControllers.removeFavoriteService
);

// Get favorite services route
router.get(
  "/favorites",
  guard.authGuard,
  serviceControllers.getFavoriteServices
);

//search
router.get("/search", serviceControllers.searchServices);

// Review operations
router.post("/create_review", guard.authGuard, serviceControllers.createReview);

router.get(
  "/reviews/:id",
  guard.authGuard,
  serviceControllers.getServiceReviews
);

router.post("/update_review", guard.authGuard, serviceControllers.updateReview);

module.exports = router;
