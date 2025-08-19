const express = require('express')
const { loginAuthController } = require('./controllers')

const router = express.Router()

router.post('/login', loginAuthController)

// router.get('/test', (req, res) => {
//     const token = res.body.token
//     return verifyJWTToken(token)
// })

module.exports = router