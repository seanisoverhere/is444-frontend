const express = require('express');
const router = express.Router();

const ProductController = require('../controllers/ProductController');

router.get('/', (req, res, next) => {
    ProductController.getInterestRate((status, payload) => {
        res.status(status).json(payload);
    })
});

module.exports = router;