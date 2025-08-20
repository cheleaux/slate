module.exports = {
    auth: {
        jwt: {
            tokenExpiryTime: '15m', // 15 minutes...
            relativeTimeNotationFormat: /^[1-9]\d*(s|m|h|d|w)$/,
        }
    }
}