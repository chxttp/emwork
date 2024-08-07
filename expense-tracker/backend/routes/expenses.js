const express = require('express');
const Expense = require('../models/Expense');
const router = express.Router();

// Create a new expense
router.post('/', async (req, res) => {
    try {
        const expense = new Expense(req.body);
        await expense.save();
        res.status(201).send(expense);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get expenses by month
router.get('/:month', async (req, res) => {
    try {
        const month = new Date(req.params.month);
        const expenses = await Expense.find({
            date: {
                $gte: new Date(month.getFullYear(), month.getMonth(), 1),
                $lt: new Date(month.getFullYear(), month.getMonth() + 1, 1)
            }
        });
        res.send(expenses);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update an expense
router.patch('/:id', async (req, res) => {
    try {
        const expense = await Expense.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!expense) {
            return res.status(404).send();
        }
        res.send(expense);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete an expense
router.delete('/:id', async (req, res) => {
    try {
        const expense = await Expense.findByIdAndDelete(req.params.id);
        if (!expense) {
            return res.status(404).send();
        }
        res.send(expense);
    } catch (error) {
        res.status(500).send(error);
    }
});

// In routes/expenses.js
// Get expenses by month
