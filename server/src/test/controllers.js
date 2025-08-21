const { verifyJWTToken, revokeJWTToken } = require('../utils/token.js')


async function decodeAndVerifyToken_(req, res){
    try {
        const token = req.body.token
        console.log("token verification in process\n╰─❯ Decoding token...")
        const decodedToken = await verifyJWTToken(token)
        console.log("Verification successful! Decoded Token:\n\n", decodedToken)
        return res.status(200).json({decodedToken})
    } catch(err) {
        console.error(`Token validation failed due to '${err.name}\n'`, err)
        let ERR_CODE = 500
        if(err.name === 'TokenExpiredError') ERR_CODE = 400
        res.status(ERR_CODE).json({message: `Token verification failed due to '${err.name}'`,
            error: err.message,
            errorType: err.name,
        })
    }
}

async function decodeAndRevokeToken_(req, res){
    try {
        const token = req.body.token
        // Revoke the token and add token to the blacklist to prevent further use
        console.log("token revocation in process\n╰─❯ Decoding token...")
        const revokeTokenId = await revokeJWTToken(token)
        // Confirm revocation and notify client upon success with affirmative response.
        // Include the blacklistItem Id to confirm db ack
        console.log(`Revocation successful! Revocation reference: ${revokeTokenId}`)
        return res.status(200).json({message: "Token has been revoked", success: true, revocationId: revokeTokenId})
    } catch(err) {
        // Upon failure determine the error code base on the error type and send failed response
        console.error(`Token revocation failed due to '${err.name}\n'`, err)
        var ERR_CODE = err.name === 'TokenExpiredError' ? 400 : 500;
        return res.status(ERR_CODE).json({
            message: `Token verification failed due to '${err.name}'`,
            error: err.message, 
            errorType: err.name,
            success: false,
        })
    }
}

module.exports = { decodeAndVerifyToken_, decodeAndRevokeToken_ }