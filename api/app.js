require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const app = express();


app.use(cors());
app.use(helmet());
app.use((req, res, next) => {
    express.json()(req, res, error => {
        if (error) {
            console.error(error);
            res.status(400).json({
                message: 'Bad Request'
            }); // Bad Request
        }
        next();
    });
});


// Services Routes
const productRoutes = require('./routes/ProductRoute');
app.use('/api/product', productRoutes);

const loansRoutes = require('./routes/LoansRoute');
app.use('/api/loans', loansRoutes);

const portfolioRoutes = require('./routes/PortfolioRoute');
app.use('/api/portfolio', portfolioRoutes);

// const paymentRoutes = require('./routes/PaymentRoute');
// app.use('/api/payments', paymentRoutes);

const userRoutes = require('./routes/UserRoute');
app.use('/api/user', userRoutes);



// Server Side Error
app.use((error, req, res, next) => {
    res
        .status(error.status || 500)
        .json({
            message: error.message
        });
});

module.exports = app;