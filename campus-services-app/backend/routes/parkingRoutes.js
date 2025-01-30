const express = require('express');
const router = express.Router();
const parkingController = require('../controllers/parkingController');

// Route to get available parking spots
router.get('/spots', parkingController.getAvailableSpots);

// Route to allocate a parking spot
router.post('/allocate', parkingController.allocateParkingSpot);

// Route to check parking status
router.get('/status/:id', parkingController.checkParkingStatus);

// Route to release a parking spot
router.post('/release', parkingController.releaseParkingSpot);

module.exports = router;