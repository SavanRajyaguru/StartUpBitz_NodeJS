const express = require('express');
const { getFounder, insrtFounderDetails } = require('../controller/founder.contoller');
const router = express.Router();

router.get('/', getFounder)

router.post('/', insrtFounderDetails)

module.exports = router