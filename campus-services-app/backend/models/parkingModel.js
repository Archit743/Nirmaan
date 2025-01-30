const mongoose = require('mongoose');

const parkingSpotSchema = new mongoose.Schema({
    spotNumber: {
        type: Number,
        required: true,
        unique: true
    },
    section: {
        type: String,
        required: true
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
    allocatedTo: {
        type: String,
        default: null // This can hold the ID of the user who has allocated the spot
    },
    allocatedTime: {
        type: Date,
        default: null
    }
});

const ParkingSpot = mongoose.model('ParkingSpot', parkingSpotSchema);

module.exports = ParkingSpot;