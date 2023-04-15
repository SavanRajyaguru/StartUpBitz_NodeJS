const express = require('express');
const { getLoginDetails } = require('../controller/login.controller');
const router = express.Router();

router.post('/', getLoginDetails)

module.exports = router