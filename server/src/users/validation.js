const { User, UserSchema } = require('./model.js')

class UserValidation {
    static async exists({email = undefined, username = undefined}){
        try {
            // Execute two user lookup queries via 'username' and 'email' and return combined result
            const existingUser = [].concat(await User.find({username}), await User.find({email}))
            return existingUser
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
}

module.exports = UserValidation