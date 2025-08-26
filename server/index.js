const express = require('express')
const cors = require('cors')
const { AuthRouter, UserOperationsRouter, TestAuthRouter } = require('./src/routes')
require('dotenv').config()
require('./mongodb.js')


const PORT = 8000
const app = express()

app.use(express.json())
app.use(cors())


app.use('/users', UserOperationsRouter)

app.use('/auth', AuthRouter)

app.use('/test', TestAuthRouter)


app.listen(PORT, () => console.log(`App is listening on port ${PORT}`))
