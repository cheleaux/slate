const express = require('express')
const { loginAuthController } = require('./controllers')
const { verifyJWTToken } = require('../utils/token.js')

const router = express.Router()

router.post('/login', loginAuthController)

router.get('/test', async (req, res) => {
    try {
        const token = req.body.token
        return res.status(200).json({decodedToken: await verifyJWTToken(token)})
    } catch(err){
        console.error("Failed to decoded the token", err)
        res.status(500).json({message: "Failed to decoded the token", error: err.message})
    }
})

module.exports = router