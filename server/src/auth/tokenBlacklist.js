const mongoose = require('mongoose')

const BlacklistedTokenSchema = mongoose.Schema({
    tokenId: {
        type: String,
        required: true
    },
    for: {
        type: String,
        required: true
    },
    iat: {
        type: Number,
        required: true
    },
    exp: {
        type: Number,
        required: true
    }
})

const BlacklistedToken = mongoose.model('BlacklistedTokens', BlacklistedTokenSchema)

module.exports = { BlacklistedToken, BlacklistedTokenSchema }