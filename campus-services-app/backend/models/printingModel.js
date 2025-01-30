const mongoose = require('mongoose');

const printingSchema = new mongoose.Schema({
    studentId: {
        type: String,
        required: true
    },
    document: {
        type: String,
        required: true
    },
    numberOfCopies: {
        type: Number,
        required: true,
        min: 1
    },
    printColor: {
        type: String,
        enum: ['black-and-white', 'color'],
        required: true
    },
    printOrientation: {
        type: String,
        enum: ['portrait', 'landscape'],
        required: true
    },
    status: {
        type: String,
        enum: ['queued', 'in-progress', 'completed', 'canceled'],
        default: 'queued'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    expectedDeliveryTime: {
        type: Date
    }
});

module.exports = mongoose.model('Printing', printingSchema);