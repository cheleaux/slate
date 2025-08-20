const express = require('express')
const { verifyAndDecodeToken_ } = require('./controllers.js')


const router = express.Router()

router.get('/verify-jwt-token', verifyAndDecodeToken_)

module.exports = router