const request = require("supertest");
const app = require("../index");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt"); // Add this import
const User = require("../models/userModels");

// // Generate a test token for an authenticated user
// const token = jwt.sign({ id: "testUserId" }, process.env.JWT_SECRET);

describe("User Test API", () => {
  let token;
  let userId;

  beforeAll(async () => {
    await User.deleteMany({});

    const hashedPassword = await bcrypt.hash("password123", 10); // Hash the password before saving the user

    const user = new User({
      firstName: "Test",
      lastName: "User",
      email: "testuser@example.com",
      password: hashedPassword, // Use the hashed password
      phone: "9812345678",
    });

    const savedUser = await user.save();
    userId = savedUser._id;

    token = jwt.sign(
      { id: savedUser._id, isAdmin: savedUser.isAdmin },
      process.env.JWT_SECRET
    );
  });

  afterAll(async () => {
    await User.deleteMany({});
    mongoose.connection.close();
  });

  it("Check for the user creation", async () => {
    const response = await request(app).post("/api/user/register").send({
      firstName: "Chewan",
      lastName: "Rai",
      email: "kulung.che14@gmail.com",
      password: "password123",
      phone: "9812345678",
    });

    console.log("User Creation Response:", response.body); // Debug line
    expect(response.statusCode).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toEqual("User Created successfully");
  });

  it("Fail if user already exists", async () => {
    const response = await request(app).post("/api/user/register").send({
      firstName: "Chewan",
      lastName: "Rai",
      email: "kulung.che14@gmail.com",
      password: "password123",
      phone: "9812345678",
    });

    console.log("User Exists Response:", response.body); // Debug line
    expect(response.statusCode).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toEqual("User Already Exists!");
  });

  it("Login with valid data", async () => {
    const response = await request(app).post("/api/user/login").send({
      email: "testuser@example.com",
      password: "password123",
    });

    console.log("Login Response:", response.body); // Debug line
    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe("Logged in successfully");
    expect(response.body.userData.email).toBe("testuser@example.com");
  });

  it("Fail login with incorrect password", async () => {
    const response = await request(app).post("/api/user/login").send({
      email: "testuser@example.com",
      password: "wrongpassword",
    });

    console.log("Login Incorrect Password Response:", response.body); // Debug line
    expect(response.statusCode).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Incorrect Password!");
  });

  it("Fail login with non-existing user", async () => {
    const response = await request(app).post("/api/user/login").send({
      email: "nouser@example.com",
      password: "password1234",
    });

    console.log("Login Non-existing User Response:", response.body); // Debug line
    expect(response.statusCode).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("User not found!");
  });

  it("Fail login if email is missing", async () => {
    const response = await request(app).post("/api/user/login").send({
      password: "password123", // Missing email
    });

    console.log("Login Missing Email Response:", response.body); // Debug line
    expect(response.statusCode).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Please enter both fields!");
  });

  // Add more tests as required

  //
});
// Testing token
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NjdiNmFkMDY0ZGYyNDY3MzZjNTQxZCIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE3MTkyMDM0NzB9.cxuget_5Rg-Pz3WEaN7Z9D817DdXi9UaY5YPnoVunNI";

// Making test collection
// describe is the collection of test cases
// (It) is a function that is used to define a test case
describe("Service API Tests", () => {
  // Test case 1: Create a new service
  it("POST /api/service/create | Create a new service", async () => {
    const response = await request(app)
      .post("/api/service/create")
      .set("authorization", `Bearer ${token}`)
      .send({
        serviceName: "Test Service",
        servicePrice: 100,
        serviceCategory: "Test Category",
        serviceDescription: "Test Description",
        serviceLocation: "Test Location",
      });

    // If service creation is successful
    if (response.body.success) {
      expect(response.statusCode).toBe(201);
      expect(response.body).toBeDefined();
      expect(response.body.message).toEqual("Service created");
    } else {
      expect(response.statusCode).toBe(400);
      expect(response.body.message).toEqual("No file was uploaded.");
    }
  });

  // Test case 2: Fetch all services
  it("GET /api/service/get_all_services | Fetch all services", async () => {
    const response = await request(app)
      .get("/api/service/get_all_services")
      .set("authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(201);
    expect(response.body).toBeDefined();
    expect(response.body.message).toEqual("Service fetched successfully!");
  }, 1000);

  // Test case: Fetch service by ID
  it("GET /api/service/get_single_service/:id | Fetch service by ID", async () => {
    const createResponse = await request(app)
      .post("/api/service/create")
      .set("authorization", `Bearer ${token}`)
      .send({
        serviceName: "Test Service",
        servicePrice: 100,
        serviceCategory: "Test Category",
        serviceDescription: "Test Description",
        serviceLocation: "Test Location",
      });

    // Check if service was created successfully
    if (createResponse.body.success) {
      const serviceId = createResponse.body.data._id;

      const response = await request(app)
        .get(`/api/service/get_single_service/${serviceId}`)
        .set("authorization", `Bearer ${token}`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toBeDefined();
      expect(response.body.message).toEqual("Service fetched successfully");
    } else {
      // Handle the case where service creation failed
      expect(createResponse.statusCode).toBe(400);
      expect(createResponse.body.message).toEqual("No file was uploaded.");
    }
  });

  // Test case: Update the service
  it("PUT /api/service/update_service/:id | Update the service", async () => {
    const createResponse = await request(app)
      .post("/api/service/create")
      .set("authorization", `Bearer ${token}`)
      .send({
        serviceName: "Test Service",
        servicePrice: 100,
        serviceCategory: "Test Category",
        serviceDescription: "Test Description",
        serviceLocation: "Test Location",
      });

    if (createResponse.body.success) {
      const serviceId = createResponse.body.data._id;

      const response = await request(app)
        .put(`/api/service/update_service/${serviceId}`)
        .set("authorization", `Bearer ${token}`)
        .send({
          serviceName: "Updated Test Service",
          servicePrice: 150,
          serviceCategory: "Updated Test Category",
          serviceDescription: "Updated Test Description",
          serviceLocation: "Updated Test Location",
        });

      expect(response.statusCode).toBe(201);
      expect(response.body).toBeDefined();
      expect(response.body.message).toEqual("Service Updated!");
    } else {
      expect(createResponse.statusCode).toBe(400);
      expect(createResponse.body.message).toEqual("No file was uploaded.");
    }
  });
  // Test case: Delete the service
  it("DELETE /api/service/delete_service/:id | Delete the service", async () => {
    const createResponse = await request(app)
      .post("/api/service/create")
      .set("authorization", `Bearer ${token}`)
      .send({
        serviceName: "Test Service",
        servicePrice: 100,
        serviceCategory: "Test Category",
        serviceDescription: "Test Description",
        serviceLocation: "Test Location",
      });

    if (createResponse.body.success) {
      const serviceId = createResponse.body.data._id;

      const response = await request(app)
        .delete(`/api/service/delete_service/${serviceId}`)
        .set("authorization", `Bearer ${token}`);

      expect(response.statusCode).toBe(201);
      expect(response.body).toBeDefined();
      expect(response.body.message).toEqual("Service Deleted!");
    } else {
      expect(createResponse.statusCode).toBe(400);
      expect(createResponse.body.message).toEqual("All fields are required");
    }
  });
});
