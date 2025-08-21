const { verifyJWTToken } = require('../utils/token.js')
const { BlacklistedToken } = require('../auth/tokenBlacklist.js')


function authenticationRequired(req, res, next){
    let token = req.headers.authorization || req.body.token
    token = token.startsWith('Bearer') ? token.slice(6).trimStart() : token ;
    // verify the request token and set the user with the decoded data from token 
    verifyJWTToken(token)
        .then((decodedToken) => {
            BlacklistedToken.findOne({tokenId: decodedToken._id}).then((token) => {
                if(!token){
                    req.user = decodedToken.data
                    return next()
                }
                console.warn("An authenticated request was attempted with a blacklisted token!\n", `BlackedToken reference: ${ token._id }`)
                res.status(403).json({message: "This token is invalid"})
            })
        })
        .catch((err) => {
            console.error("Authentication Failed -", err.message)
            res.status(400).json({message: "Unable to authenticate user", error: err.message})
        })
}

module.exports = { authenticationRequired }