const express = require('express');
const router = express.Router();

const ProductController = require('../controllers/ProductController');

router.post('/products', (req, res, next) => {
    // const {
    //     userID,
    //     pin,
    //     otp
    // } = req.body;

    ProductController.getInterestRate((status, payload) => {
        res.status(status).json(payload);
    })
});

module.exports = router;