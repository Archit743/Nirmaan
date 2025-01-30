const Canteen = require('../models/canteenModel');
const canteenService = require('../services/canteenService');

// Get the menu for the day
exports.getMenu = async (req, res) => {
    try {
        const menu = await canteenService.getMenu();
        res.status(200).json(menu);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving menu', error });
    }
};

// Place a new order
exports.placeOrder = async (req, res) => {
    const { studentId, items } = req.body;
    try {
        const order = await canteenService.placeOrder(studentId, items);
        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ message: 'Error placing order', error });
    }
};

// Manage order requests (admin)
exports.manageOrders = async (req, res) => {
    try {
        const orders = await canteenService.getOrders();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving orders', error });
    }
};

// Update the menu for the day (admin)
exports.updateMenu = async (req, res) => {
    const { menu } = req.body;
    try {
        await canteenService.updateMenu(menu);
        res.status(200).json({ message: 'Menu updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating menu', error });
    }
};

// Get peak times for the canteen
exports.getPeakTimes = async (req, res) => {
    try {
        const peakTimes = await canteenService.getPeakTimes();
        res.status(200).json(peakTimes);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving peak times', error });
    }
};

// Review and rate canteen items
exports.reviewItem = async (req, res) => {
    const { itemId, rating, review } = req.body;
    try {
        await canteenService.reviewItem(itemId, rating, review);
        res.status(201).json({ message: 'Review submitted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error submitting review', error });
    }
};