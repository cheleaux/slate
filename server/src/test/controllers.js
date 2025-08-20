const { verifyJWTToken } = require('../utils/token.js')


async function verifyAndDecodeToken_(req, res){
    try {
        const token = req.body.token
        const decodedToken = await verifyJWTToken(token)
        console.log(decodedToken)
        return res.status(200).json({decodedToken})
    } catch(err){
        console.error("Failed token verification\n", err)
        res.status(500).json({message: `Token verification failed due to '${err.name}'`,
            error: err.message,
            errorType: err.name,
        })
    }
}

module.exports = { verifyAndDecodeToken_ }