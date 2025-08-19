const jwt = require('jsonwebtoken')
const authConfig = require('../config.js').auth


function createJWTToken(details = undefined){
    if(typeof details !== 'object') details = {};

    if(!details.maxAge || typeof details.maxAge !== 'number'){
        details.maxAge = authConfig.jwt.tokenExpiryTime
    }
    // Remove all non-essential data and functions from session data list 
    const sessionSafeData = Object.entries(details.sessionData).reduce((sessionSafeData, kv) => {
        if(kv[0] !== 'password' && typeof kv[1] !== 'function') sessionSafeData.push(kv);
        return sessionSafeData
    }, [])
    // Consolidate entries into session data obj
    details.sessionData = Object.fromEntries(sessionSafeData)
    // generate and sign token with secret and set expiry
    const token = jwt.sign({
        data: details.sessionData,
    }, process.env.JWT_SIGNITURE_SECRET, {
        expiresIn: details.maxAge
    })
    
    return token
}

function verifyJWTToken(token){
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SIGNITURE_SECRET, (err, decodedToken) =>{
            if(!err && decodedToken) return resolve(decode);
            else {
                return reject(err)
            }
        })
    })
}


module.exports = { createJWTToken, verifyJWTToken }