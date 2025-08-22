const { revokeJWTToken } = require('../../utils/token.js')
const { UserValidation } = require('../../utils/validation.js')

async function logoutController(req, res){
    try {
        const userId = req.body.userId
        let token = req.headers.authorization || req.body.token
        token = token.startsWith('Bearer') ? token.slice(6).trimStart() : token ;
        // Only logout if user exist to prevent erraneous token revocation
        const exists = await UserValidation.exists_byId(userId)
        if(exists <= 0){
            return res.status(404).json({message: "Cannot logout non-existent user"})
        }
        // Revoke the auth token so to prevent further use a send confirmation to client
        const revokedId = await revokeJWTToken(token)
        res.status(200).json({message: "User successfully logged out", success: true, db_ack: revokedId})
    } catch(err) {
        console.error(`Logout attempt failed due to '${err.name}'`)
        res.status(500).json({message: "Logout attempt failed", error: err.message, success: false})
    }
}

module.exports = logoutController