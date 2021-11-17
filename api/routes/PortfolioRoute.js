const express = require('express');
const router = express.Router();

const PortfolioController = require('../controllers/PortfolioController');

router.get('/accounts', (req, res, next) => {
    const {
        userID
    } = req.body;
    
    PortfolioController.getCustomerAccounts(userID, (status, payload) => {
        res.status(status).json(payload);
    });
});

router.get('/qualifyTransactions', (req, res, next) => {
    const {
        userID
    } = req.body;
    
    PortfolioController.getQualifyTransactions(userID, (status, payload) => {
        res.status(status).json(payload);
    });
});

router.get('/transactions', (req, res, next) => {
    const {
        userID
    } = req.body;
    
    PortfolioController.getTransactionHistory(userID, (status, payload) => {
        res.status(status).json(payload);
    });
});

module.exports = router;