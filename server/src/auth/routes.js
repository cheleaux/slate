const express = require('express')
const { loginAuthController } = require('./controllers')

const router = express.Router()

router.post('/login', loginAuthController)

module.exports = router












