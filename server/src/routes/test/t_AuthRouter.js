const express = require('express')
const { decodeAndVerifyToken_, decodeAndRevokeToken_ } = require('../../controllers/test/t_authController.js')


const router = express.Router()

router.post('/verify-jwt-token', decodeAndVerifyToken_)

router.post('/revoke-jwt-token', decodeAndRevokeToken_)

module.exports = router

// TODO: Add authentication middleware to all test routes
//      - Can use JWT or another simple key/token base authenticaion
//      - Must have a seperate dev-only secret key for token