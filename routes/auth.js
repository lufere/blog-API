var express = require('express');
var router = express.Router();
const bcrypt = require("bcryptjs");
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const passport = require('passport');

var authController = require('../controllers/authController');

router.post('/sign-up', authController.sign_up, authController.login);

router.post('/login', authController.login)

module.exports = router;