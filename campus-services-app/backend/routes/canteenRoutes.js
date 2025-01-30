const express = require('express');
const router = express.Router();
const canteenController = require('../controllers/canteenController');

// Route to get the menu
router.get('/menu', canteenController.getMenu);

// Route to place an order
router.post('/order', canteenController.placeOrder);

// Route to manage order requests (admin)
router.put('/order/:id', canteenController.manageOrder);

// Route to get peak times
router.get('/peak-times', canteenController.getPeakTimes);

// Route to review and rate menu items
router.post('/review', canteenController.submitReview);

// Route to get reviews for admin
router.get('/reviews', canteenController.getReviews);

module.exports = router;