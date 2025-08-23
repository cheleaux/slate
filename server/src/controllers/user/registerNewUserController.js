const { User } = require('../../users/model.js')
const { UserValidation } = require('../../utils/validation.js')
const crypto = require('crypto')
const { createJWTToken } = require('../../utils/token.js')


async function registerNewUserController(req, res){
    try {
        const newUserDetails = req.body.userDetails
        const { username, email, password, dob } = newUserDetails
        // Check if a user exists with the same username or email, and notift if so.
        const exists = await UserValidation.exists({email, username})
        if(exists.length > 0){
            return res.status(409).json({message: "User already exists"})
        }
        // Generate password hash with 'sha256' protocol and persist new user
        const passwordHash = crypto.hash('sha256', password)
        const newUser = new User({username, email, dob, password: passwordHash})
        await newUser.save()
            .catch((err) => {throw err})
        // Send new user details to client (temp implementation, likely to change to necessary detail for login and such)
        res.status(200).json({
            message: "New user successfully registered",
            token: createJWTToken({
                sessionData: newUser,
            }),
            success: true
        })
    } catch(err) {
        console.error('Failed: Unable to regiester new user.\n', err)
        res.status(500).json({message: 'Failed to register new user', error: err.message})
    }
}
    
module.exports = registerNewUserController