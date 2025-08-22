const express = require('express')
const { loginAuthController, logoutController } = require('./controllers')
const { authenticationRequired } = require('../middleware/auth.js')

const router = express.Router()

router.post('/login', loginAuthController)

router.post('/logout', authenticationRequired, logoutController)

module.exports = router












