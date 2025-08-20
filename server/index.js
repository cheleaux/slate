const express = require('express')
const cors = require('cors')
const { UserOperationsRouter } = require('./src/users')
const { AuthRouter } = require('./src/auth')
const TestRouter = require('./src/test/routes.js')
require('dotenv').config()
require('./mongodb.js')


const PORT = 8000
const app = express()

app.use(express.json())
app.use(cors())


app.use('/users', UserOperationsRouter)

app.use('/auth', AuthRouter)

app.use('/test', TestRouter)


app.listen(PORT, () => console.log(`App is listening on port ${PORT}`))
