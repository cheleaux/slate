const AuthConfig = require('../config.js').auth

function isRelativeTimeNotation(string){
    if(typeof string !== 'string') return false;
    // Validate given string as a duration shorthand using the regex format in config
    const timeNotationFormat = AuthConfig.jwt.relativeTimeNotationFormat
    return timeNotationFormat.test(string)
}

module.exports = { isRelativeTimeNotation }