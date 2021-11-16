const express = require('express');
const router = express.Router();

const UserController = require('../controllers/UserController');

router.post('/login', (req, res, next) => {
    UserController.login(req, (status, payload) => {
        res.status(status).json(payload);
    })
});

router.post('/register', (req, res, next) => {
    UserController.register(req, (status, payload) => {
        res.status(status).json(payload);
    });
});

module.exports = router;