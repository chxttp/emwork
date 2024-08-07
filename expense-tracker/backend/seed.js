const mongoose = require('mongoose');
const Expense = require('./models/Expense');

const MONGODB_URI = 'mongodb+srv://thanakritpitiviroj:thanakrit21@expense-tracker.fzcss.mongodb.net/expense-tracker?retryWrites=true&w=majority';


mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Connected to MongoDB for seeding');
    seedExpenses();
})
.catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

const seedExpenses = async () => {
    const expenses = [];
    const types = ['income', 'expense'];
    const titles = ['Salary', 'Groceries', 'Rent', 'Utilities', 'Entertainment'];

    for (let month = 6; month <= 7; month++) {
        for (let i = 0; i < 20; i++) {
            const type = types[Math.floor(Math.random() * types.length)];
            const title = titles[Math.floor(Math.random() * titles.length)];
            const amount = parseFloat((Math.random() * 1000).toFixed(2));
            const date = new Date(2024, month, Math.floor(Math.random() * 28) + 1);

            expenses.push({
                type,
                title,
                amount,
                date,
            });
        }
    }

    await Expense.insertMany(expenses);
    console.log('Database seeded!');
    mongoose.disconnect();
};

seedExpenses();
