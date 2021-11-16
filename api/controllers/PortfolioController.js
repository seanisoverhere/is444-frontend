const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const axios = require('axios');
const tBankURL = process.env.TBANK_URL
const tBankHeaders = require('../services/TBankHeaderService');

class PortfolioController {
    
}

module.exports = PortfolioController;