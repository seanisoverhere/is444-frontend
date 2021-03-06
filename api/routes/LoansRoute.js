const express = require('express');
const router = express.Router();

const LoansController = require('../controllers/LoansController');

router.post('/new', (req, res, next) => {
    const {
        userID,
        accountID,
        transactionID,
        amount,
        term,
    } = req.body;

    LoansController.approveLoan(userID, accountID, transactionID, amount, term, (status, payload) => {
        res.status(status).json(payload);
    });
});


router.post('/myLoans', (req, res, next) => {
    const {
        userID,
    } = req.body;

    LoansController.getMyLoans(userID, (status, payload) => {
        res.status(status).json(payload);
    });
});


router.get('/repayment/:loanID', (req, res, next) => {
    const {
        loanID,
    } = req.params;

    LoansController.getLoanRepayment(loanID, (status, payload) => {
        res.status(status).json(payload);
    });
})

module.exports = router;