module.exports = {
    PORT: process.env.PORT || 5000,
    DB_URI: process.env.DB_URI || 'mongodb://localhost:27017/campus-services',
    PAYMENT_GATEWAY_API_KEY: process.env.PAYMENT_GATEWAY_API_KEY || 'your_payment_gateway_api_key',
    JWT_SECRET: process.env.JWT_SECRET || 'your_jwt_secret',
    NODE_ENV: process.env.NODE_ENV || 'development',
};