const ParkingSpot = require('../models/parkingModel');

// Function to get available parking spots
const getAvailableSpots = async () => {
    try {
        const availableSpots = await ParkingSpot.find({ isAvailable: true });
        return availableSpots;
    } catch (error) {
        throw new Error('Error fetching available parking spots');
    }
};

// Function to allocate a parking spot
const allocateParkingSpot = async (userId, spotId) => {
    try {
        const spot = await ParkingSpot.findById(spotId);
        if (!spot || !spot.isAvailable) {
            throw new Error('Spot not available');
        }
        spot.isAvailable = false;
        spot.userId = userId;
        await spot.save();
        return spot;
    } catch (error) {
        throw new Error('Error allocating parking spot');
    }
};

// Function to release a parking spot
const releaseParkingSpot = async (spotId) => {
    try {
        const spot = await ParkingSpot.findById(spotId);
        if (!spot) {
            throw new Error('Spot not found');
        }
        spot.isAvailable = true;
        spot.userId = null;
        await spot.save();
        return spot;
    } catch (error) {
        throw new Error('Error releasing parking spot');
    }
};

// Function to check parking spot availability
const checkSpotAvailability = async (spotId) => {
    try {
        const spot = await ParkingSpot.findById(spotId);
        return spot ? spot.isAvailable : false;
    } catch (error) {
        throw new Error('Error checking spot availability');
    }
};

module.exports = {
    getAvailableSpots,
    allocateParkingSpot,
    releaseParkingSpot,
    checkSpotAvailability,
};