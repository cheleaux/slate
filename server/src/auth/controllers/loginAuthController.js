const { UserValidation } = require('../../users')

async function loginController(req, res){
    try {
        const { userReference, password } = req.body.userCredentials
        // Ensure that the request contains all essential credentials and that they are defined 
        if(!userReference){
            return res.status(400).json({message: "Username or email address must be provided to login"})
        } 
        if(!password){
            return res.status(400).json({message: "Password is required for login"})
        }
        // Check that the user account exists in the system
        const exists = await UserValidation.exists({ userRef: userReference })
        if(exists <= 0){
            return res.status(404).json({message: "Unable to find the user"})
        }
        const user = exists[0]
        if(UserValidation.iscorrectPassword(password, user)){
            // TODO: sign and set cookie for the response.
            //  - ensure to set 'HttpOnly' and 'signed' headers
            //  - set secret for the cookies
            return res.status(200).json({message: `User has been successfully logged in. Welcome ${ user.username }!`})
        } else {
            return res.status(401).json({message: "Login request denied. Incorrect credentials."})
        }
    } catch(err){
        console.error("Failed: A problem occurred while attempting login.", err)
        res.status(500).json({message: "Failed to authenticate user. A problem occurred while attempting login.", error: err.message})
    }
}

module.exports = loginController