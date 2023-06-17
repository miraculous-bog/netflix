const express = require('express');
const router = express.Router();
const { registerAuth, authenticateAuth } = require('../controllers/authController');
const asyncWrapper = (controller) => (req, res, next) => controller(req, res, next).catch(next);

router.post('/register', asyncWrapper(registerAuth));
router.post('/login', asyncWrapper(authenticateAuth));

module.exports = router;
