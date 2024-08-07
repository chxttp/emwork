const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now, // Set the creation time
    },
    updatedAt: {
        type: Date,
        default: null, // Default to null initially
    },
});

// Update updatedAt field only if it's modified
expenseSchema.pre('save', function (next) {
    if (this.isModified() && this.isNew === false) {
        this.updatedAt = Date.now(); // Set the update time on modification
    }
    next();
});

module.exports = mongoose.model('Expense', expenseSchema);
