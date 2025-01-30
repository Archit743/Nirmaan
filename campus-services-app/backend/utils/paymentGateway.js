const stripe = require('stripe')('your_stripe_secret_key'); // Replace with your actual Stripe secret key

const createPaymentIntent = async (amount, currency = 'usd') => {
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency,
            payment_method_types: ['card'],
        });
        return paymentIntent;
    } catch (error) {
        throw new Error('Payment Intent Creation Failed: ' + error.message);
    }
};

const cancelPaymentIntent = async (paymentIntentId) => {
    try {
        const canceledPaymentIntent = await stripe.paymentIntents.cancel(paymentIntentId);
        return canceledPaymentIntent;
    } catch (error) {
        throw new Error('Payment Intent Cancellation Failed: ' + error.message);
    }
};

module.exports = {
    createPaymentIntent,
    cancelPaymentIntent,
};