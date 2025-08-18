const mongoose = require('mongoose')
require('dotenv').config()

connect().catch((err) => console.error(err))

async function connect(){
    await mongoose.connect(process.env.MONGO_DB_CONNECT_URL)
}

// TODO: Fix extracted mongoose config to establish a connection, to allow db operations