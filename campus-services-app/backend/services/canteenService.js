const Canteen = require('../models/canteenModel');
const PaymentGateway = require('../utils/paymentGateway');

// Function to manage order requests
const createOrder = async (orderData) => {
    try {
        const order = new Canteen.Order(orderData);
        await order.save();
        return order;
    } catch (error) {
        throw new Error('Error creating order: ' + error.message);
    }
};

// Function to manage menu for the day
const updateMenu = async (menuData) => {
    try {
        await Canteen.Menu.findOneAndUpdate({}, menuData, { new: true, upsert: true });
        return menuData;
    } catch (error) {
        throw new Error('Error updating menu: ' + error.message);
    }
};

// Function to get peak times
const getPeakTimes = async () => {
    try {
        const orders = await Canteen.Order.find();
        // Logic to calculate peak times based on orders
        const peakTimes = {}; // Placeholder for peak time calculation logic
        return peakTimes;
    } catch (error) {
        throw new Error('Error fetching peak times: ' + error.message);
    }
};

// Function to process payment
const processPayment = async (paymentData) => {
    try {
        const paymentResponse = await PaymentGateway.processPayment(paymentData);
        return paymentResponse;
    } catch (error) {
        throw new Error('Error processing payment: ' + error.message);
    }
};

// Function to cancel payment
const cancelPayment = async (orderId) => {
    try {
        const order = await Canteen.Order.findById(orderId);
        if (!order) throw new Error('Order not found');
        const cancellationResponse = await PaymentGateway.cancelPayment(order.paymentId);
        return cancellationResponse;
    } catch (error) {
        throw new Error('Error cancelling payment: ' + error.message);
    }
};

// Function to get menu and ratings
const getMenuAndRatings = async () => {
    try {
        const menu = await Canteen.Menu.find();
        const ratings = await Canteen.Rating.find();
        return { menu, ratings };
    } catch (error) {
        throw new Error('Error fetching menu and ratings: ' + error.message);
    }
};

module.exports = {
    createOrder,
    updateMenu,
    getPeakTimes,
    processPayment,
    cancelPayment,
    getMenuAndRatings,
};