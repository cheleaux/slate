const { User, UserSchema } = require('../users/model.js')
const crypto = require('crypto')

class UserValidation {
    static async exists({email = undefined, username = undefined, userRef = undefined}){
        try {
            // Create the query filter with userRef or email/username pair and execute to find matching users
            if(userRef){
                var filter = {$or: [{username: userRef}, {email: userRef}]}
            } else {
                var filter = {$or: [{username: username}, {email: email}]}
            }
            const matchingUsers = await User.find(filter)
            // Throw an error to alert if a another user is found with identical credentials else return results
            if(matchingUsers.length > 1){
                throw new Error("Duplicate account! More than one suer returned with these credentials")
            }
            return matchingUsers
        } catch(err) {
            console.error("Validation Error: Could not verify user existence\n", err)
            throw err
        }
    }

    static async exists_byId(userId){
        try {
            // Execute user lookup query via user 'id' and return result
            const existingUser = await User.findById(userId)
            return existingUser
        } catch(err) {
            // Throws a CastError if the given 'id' is invalid (e.g. wrong length => must be 24
            // character hex string, 12 byte Uint8Array, or an integer)
            console.error("Validation Error: Could not verify user existence\n", err)
            throw err
        }
    }

    static hasProperties(properties){
        // Check each given property against the User schema for any invalids
        const userProperties = Object.keys(UserSchema.paths)
        const invalidProp = properties.find((prop) => !userProperties.includes(prop))
        // Return negative boolean if one is found and positive if not
        return invalidProp ? false : true
    }

    static iscorrectPassword(passwordToCheck, user){
        // Hash the given password and return comparison outcome betwee it and the expected password
        const expectedPassword = user.password
        const hashedPassword = crypto.hash('sha256', passwordToCheck)
        return hashedPassword === expectedPassword
    }
}

module.exports = { UserValidation }