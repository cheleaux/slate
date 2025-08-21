const mongoose = require('mongoose')

const BlacklistedTokenSchema = mongoose.Schema({
    tokenId: {
        type: String,
        required: true
    },
    for: {
        type: String,
        require: true
    },
    iat: {
        type: Number,
        require: true
    },
    exp: {
        type: Number,
        require: true
    }
})

const BlacklistedToken = mongoose.model('BlacklistedTokens', BlacklistedTokenSchema)

module.exports = { BlacklistedToken, BlacklistedTokenSchema }