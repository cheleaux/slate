const jwt = require('jsonwebtoken')
const uuid = require('uuid')
const BlacklistedToken = require('../auth/tokenBlacklist.js')
const { isRelativeTimeNotation } = require('../utils/helpers.js')
const authConfig = require('../config.js').auth

// TODO: Figure out why the user password is present in the generated token
function createJWTToken(details = undefined){
    if(typeof details !== 'object') details = {};
    // Validate 'maxAge' value to ensure it's of an accepted format, either Duration Shorthand or Numerical (in seconds)
    const isValidMaxAge = details.maxAge &&
        (typeof details.maxAge === 'number' ||
        (typeof details.maxAge !== 'number' && isRelativeTimeNotation(details.maxAge)))

    if(!isValidMaxAge){
        details.maxAge = authConfig.jwt.tokenExpiryTime
    }
    // Remove all non-essential data and functions from session data list.
    // Specifies '._doc' property from sessionData to iterate only user attributes defined in schema
    const sessionSafeData = Object.entries(details.sessionData._doc).reduce((sessionSafeData, kv) => {
        if(kv[0] !== 'password' && typeof kv[1] !== 'function') sessionSafeData.push(kv);
        return sessionSafeData
    }, [])
    // Consolidate entries into session data obj
    details.sessionData = Object.fromEntries(sessionSafeData)
    // generate and sign token with secret and set expiry
    const token = jwt.sign({
        _id: uuid.v4(),
        data: details.sessionData,
    }, process.env.JWT_SIGNITURE_SECRET, {
        expiresIn: details.maxAge
    })

    return token
}

async function verifyJWTToken(token){
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SIGNITURE_SECRET, (err, decodedToken) => {
            if(!err && decodedToken) resolve(decodedToken);
            else {
                reject(err)
            }
        })
    })
}

async function revokeJWTToken(token){
    return new Promise((resolve, reject) => {
        try {
            const { _id, iat, exp } = verifyJWTToken(token)
            const revoked = new BlacklistedToken({ _id, iat, exp, for: "user" })
            revoked.save().then(revokedToken => resolve(revokedToken._id))
                .catch((err) => { throw err })
        } catch(err){
            // Dont add the token to blacklist if it's expire just nofity it's expired already
            return reject(err) 
        }
    })
}


module.exports = { createJWTToken, verifyJWTToken, revokeJWTToken }