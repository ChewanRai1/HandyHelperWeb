const Booking = require('../models/bookingModels');
const Services = require('../models/serviceModel');
const User = require('../models/userModel'); // Ensure this import

// Create a booking
const createBooking = async (req, res) => {
    const { serviceId, quantity } = req.body;
    const userId = req.user.id;  // Assuming user ID is available in req.user

    if (!serviceId || !quantity) {
        return res.status(400).json({
            success: false,
            message: "Service ID and quantity are required"
        });
    }

    try {
        const service = await Services.findById(serviceId);
        if (!service) {
            return res.status(404).json({
                success: false,
                message: "Service not found"
            });
        }

        const newBooking = new Booking({
            serviceId,
            userId,
            quantity
        });

        const booking = await newBooking.save();
        res.status(201).json({
            success: true,
            message: "Booking created",
            booking
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error
        });
    }
};

// Fetch all bookings
const getAllBookings = async (req, res) => {
    try {
        const userId = req.user.id;
        const bookings = await Booking.find({ userId })
            .populate({
                path: 'serviceId',
                select: 'serviceTitle servicePrice serviceImage'
            })
            .populate({
                path: 'userId',
                select: 'fullName'
            });
        res.status(200).json({
            success: true,
            message: "Bookings fetched successfully",
            bookings
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error
        });
    }
};

// Fetch a single booking
const getBookingByBookingUserId = async (req, res) => {
    const bookingId = req.params.id;

    try {
        const booking = await Booking.findById(bookingId)
            .populate('serviceId', 'serviceTitle servicePrice')
            .populate('userId', 'fullName');
        if (!booking) {
            return res.status(404).json({
                success: false,
                message: "Booking not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Booking fetched",
            booking
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error
        });
    }
};

// Cancel a booking
const cancelBooking = async (req, res) => {
    const bookingId = req.params.id;
    const userId = req.user.id;  // Assuming user ID is available in req.user

    try {
        const booking = await Booking.findById(bookingId);

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: "Booking not found"
            });
        }

        if (booking.userId.toString() !== userId && !req.user.isAdmin) {
            return res.status(403).json({
                success: false,
                message: "Permission denied"
            });
        }

        booking.status = 'cancelled';
        await booking.save();

        res.status(200).json({
            success: true,
            message: "Booking cancelled",
            booking
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error
        });
    }
};

module.exports = {
    createBooking,
    getAllBookings,
    getBookingByBookingUserId,
    cancelBooking
};
