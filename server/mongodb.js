const mongoose = require('mongoose')

connect().catch((err) => console.error(err))

async function connect(){
    await mongoose.connect(process.env.MONGO_DB_CONNECT_URL)
}