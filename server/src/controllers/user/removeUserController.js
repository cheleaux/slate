const { UserValidation } = require('../../utils/validation.js')

async function removeUserController(req, res){
    try {
        const id = req.user._id
        // Check whether the requested user is in the system before operation
        const exists = await UserValidation.exists_byId(id)
        if(!exists){
            return res.status(404).json({message: "Unable to find the user"})
        }
        // TODO: Verify that the user is logged in or that request originates from a registered device/IP
        // Perform the deletion and notify client that is was successful
        const userToDelete = exists
        await userToDelete.deleteOne()
        res.status(200).json({message: "User has been successfully deleted."})
    } catch(err) {
        // Conditional Error messaging for know errors
        console.error("Failed: Unable to delete user.\n", err.message)
        if(err.name === "CastError"){
            return res.status(400).json({message: "Invalid user Id"})
        } else {
            res.status(500).json({message: "Failed to delete requested user", error: err.message})
        }
    }
}

module.exports = removeUserController