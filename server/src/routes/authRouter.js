const express = require('express')
const { loginAuthController, logoutAuthController } = require('../controllers/auth')
const { authenticationRequired } = require('../middleware/auth.js')

const router = express.Router()

router.post('/login', loginAuthController)

router.post('/logout', authenticationRequired, logoutAuthController)

module.exports = router












