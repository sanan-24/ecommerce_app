const express = require('express');
const router = express.Router();
const asyncHandler = require('../utils/asyncHandler');
const {signup, signin} = require('../controllers/authController');

router.post('/signup', asyncHandler(signup));
router.post('/signin', asyncHandler(signin));

module.exports = router;