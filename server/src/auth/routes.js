const express = require('express')
const { loginAuthController } = require('./controllers')

const router = express.Router()

router.post('/login', loginAuthController)

// router.get('/test', (req, res) => {
//     let data = {sessionData: {name: 'charlie', password: 'mostsecretpassword123', getName: () => this.name}}
//     data = createJWTToken(data)
//     return res.status(200).json(data)
// })

module.exports = router