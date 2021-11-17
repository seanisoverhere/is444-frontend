const express = require('express');
const router = express.Router();

const PortfolioController = require('../controllers/PortfolioController');

router.post('/accounts', (req, res, next) => {
    const {
        userID
    } = req.body;
    
    PortfolioController.getCustomerAccounts(userID, (status, payload) => {
        res.status(status).json(payload);
    });
});

router.post('/qualifyTransactions', (req, res, next) => {
    const {
        userID
    } = req.body;
    
    PortfolioController.getQualifyTransactions(userID, (status, payload) => {
        res.status(status).json(payload);
    });
});

router.post('/transactions', (req, res, next) => {
    const {
        userID
    } = req.body;
    PortfolioController.getTransactionHistory(userID, (status, payload) => {
        res.status(status).json(payload);
    });
});

module.exports = router;