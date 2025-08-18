const express = require('express')
const cors = require('cors')
const { UserOperationsRouter } = require('./src/users')
require('./mongodb.js')

const PORT = 8000
const app = express()

app.use(express.json())
app.use(cors())


app.use('/users', UserOperationsRouter)



app.listen(PORT, () => console.log(`App is listening on port ${PORT}`))