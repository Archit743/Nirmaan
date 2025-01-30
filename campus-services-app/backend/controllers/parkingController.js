const Parking = require('../models/parkingModel');
const parkingService = require('../services/parkingService');

// Get available parking spots
exports.getAvailableSpots = async (req, res) => {
    try {
        const availableSpots = await parkingService.getAvailableSpots();
        res.status(200).json(availableSpots);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving available spots', error });
    }
};

// Reserve a parking spot
exports.reserveSpot = async (req, res) => {
    const { userId, spotId } = req.body;
    try {
        const reservation = await parkingService.reserveSpot(userId, spotId);
        res.status(201).json(reservation);
    } catch (error) {
        res.status(500).json({ message: 'Error reserving parking spot', error });
    }
};

// Check parking spot availability
exports.checkSpotAvailability = async (req, res) => {
    const { spotId } = req.params;
    try {
        const isAvailable = await parkingService.checkSpotAvailability(spotId);
        res.status(200).json({ available: isAvailable });
    } catch (error) {
        res.status(500).json({ message: 'Error checking spot availability', error });
    }
};