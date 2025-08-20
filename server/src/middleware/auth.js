const { verifyJWTToken } = require('../utils/token.js')

function authenticationRequired(req, res, next){
    const token = req.body.token
    // verify the request token and set the user with the decoded data from token 
    verifyJWTToken(token)
        .then((decodedToken) => {
            req.user = decodedToken.data
            next()
        })
        .catch((err) => {
            console.error("Authentication Failed -", err.message)
            res.status(400).json({message: "Unable to authenticate user", error: err.message})
        })
}


module.exports = { authenticationRequired }