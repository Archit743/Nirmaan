const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const canteenRoutes = require('./routes/canteenRoutes');
const printingRoutes = require('./routes/printingRoutes');
const parkingRoutes = require('./routes/parkingRoutes');
const config = require('./config');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Database connection
mongoose.connect(config.databaseUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/canteen', canteenRoutes);
app.use('/api/printing', printingRoutes);
app.use('/api/parking', parkingRoutes);

// Start server
const PORT = config.port || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});