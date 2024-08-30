import axios from "axios";

//creating an instance of axios
const Api = axios.create({
  baseURL: "http://localhost:9000",
  withCredentials: true,
});

// Helper function to get auth headers
const getAuthConfig = () => {
  const token = localStorage.getItem("token");
  console.log("Token sent:", token); // Log here
  return {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
};

//creating test api
export const testApi = () => Api.get("/test");

export const testApinew = () => Api.get("/test_new");

//creating register API
export const registerUSerApi = (data) => Api.post("/api/user/register", data);

//creating login api
export const loginUSerApi = (data) => Api.post("/api/user/login", data);

export const getProfile = () =>
  Api.get(`/api/user/getprofile`, getAuthConfig());

export const updateProfile = (data) =>
  Api.put("/api/user/updateProfile", data, getAuthConfig());

export const changePassword = (data) =>
  Api.post("/api/user/changePassword", data, getAuthConfig());

// export const createServiceApi = (data) =>
//   Api.post(
//     "/api/service/create",
//     data,
//     getAuthConfig({
//       headers: { "Content-Type": "multipart/form-data" }, // The browser automatically sets this when using FormData
//     })
//   );
export const createServiceApi = (data) =>
  Api.post("/api/service/create", data, getAuthConfig());
// export const createServiceApi = (data) =>
//   Api.post("/api/service/create", data, {
//     headers: {
//       "Content-Type": "multipart/form-data",
//       authorization: `Bearer ${localStorage.getItem("token")}`,
//     },
//   });
export const getServicesByUser = () =>
  Api.get("/api/service/user_services", getAuthConfig());

//fetch all services
export const getAllServices = () =>
  Api.get("/api/service/get_all_services", getAuthConfig());

//delete
export const deleteService = (id) =>
  Api.delete(`/api/service/delete_service/${id}`, getAuthConfig());

export const getSingleService = (id) =>
  Api.get(`/api/service/get_single_service/${id}`, getAuthConfig());

export const updateService = (id, data) =>
  Api.put(`/api/service/update_service/${id}`, data, getAuthConfig());
//forgot password
export const forgotPassword = (data) =>
  Api.post("/api/user/forgot_password", data);

//verify
export const verifyOtp = (data) => Api.post("/api/user/verify_otp", data);

// Fetch service reviews
export const getServiceReviewsApi = (serviceId) =>
  Api.get(`/api/service/reviews/${serviceId}`);

// Create a review
export const createReviewApi = (data) =>
  Api.post("/api/service/create_review", data, getAuthConfig());

//update a review
export const updateReviewApi = (data) =>
  Api.post("/api/service/update_review", data);

// Add these API calls
export const addToCartApi = (serviceId) =>
  Api.post("/api/services/add_cart", { serviceId });
export const removeCartItemApi = (serviceId) =>
  Api.delete(`/api/services/remove_cart/${serviceId}`);
export const getCartItemsApi = (id) => Api.get(`/api/services/get_cart/${id}`);

// API to get favorite services for the authenticated user
export const getFavoritesApi = () => {
  return Api.get("/api/service/favorites", getAuthConfig());
};

// Add to favorite API (optional for adding services to favorites)
export const addFavoriteServiceApi = (serviceId) => {
  return Api.post("/api/service/add_favorite", { serviceId }, getAuthConfig());
};

// Remove from favorite API (optional for removing services from favorites)
export const removeFavoriteApi = (serviceId) => {
  return Api.delete(
    `/api/service/favorites/${serviceId}`,
    getAuthConfig()
  );
};
