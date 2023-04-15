const express = require('express');
const { getUser, insertUser } = require('../controller/user.controller');
const router = express.Router();

router.get('/', getUser)

router.post('/', insertUser)

module.exports = router;    