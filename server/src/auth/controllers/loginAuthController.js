const { UserValidation } = require('../../utils/validation.js')
const { createJWTToken } = require('../tokens_jwt.js')
const authConfig = require('../../config.js').auth

async function loginController(req, res){
    try {
        const { userReference, password } = req.body.userCredentials
        // Ensure that the request contains all essential credentials and that they are defined 
        if(!userReference) return res.status(400).json({message: "Username or email address must be provided to login"});
        
        if(!password) return res.status(400).json({message: "Password is required for login"});
        // Check that the user account exists in the system
        const exists = await UserValidation.exists({ userRef: userReference })
        if(exists <= 0){
            return res.status(404).json({message: "Unable to find the user"})
        }
        const user = exists[0]
        // Validate given password and return the generated jwt token with successful response
        if(UserValidation.iscorrectPassword(password, user)){            
            return res.status(200).json({
                message: `User successfully logged in`,
                token: createJWTToken({
                    sessionData: user,
                    maxAge: authConfig.jwt.tokenExpiryTime
                }),
                success: true,
            })
        } else {
            return res.status(401).json({message: "Login request denied. Incorrect credentials."})
        }
    } catch(err){
        console.error("Failed: A problem occurred while attempting login.", err)
        res.status(500).json({message: "Failed to authenticate user. A problem occurred while attempting login.", error: err.message})
    }
}

module.exports = loginController