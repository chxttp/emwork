const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const expenseRoutes = require('./routes/expenses');

const app = express();
const PORT = 5001;

const MONGODB_URI = 'mongodb+srv://thanakritpitiviroj:thanakrit21@expense-tracker.fzcss.mongodb.net/expense-tracker?retryWrites=true&w=majority';

mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

app.use(cors());
app.use(bodyParser.json());

app.use('/api/expenses', expenseRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Handle port conflicts
app.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use.`);
        process.exit(1);
    } else {
        throw err;
    }
});
