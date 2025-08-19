const AuthRouter = require('./routes.js')
const { createJWTToken } = require('./tokens_jwt.js')


module.exports = {
    AuthRouter,
    createJWTToken
}