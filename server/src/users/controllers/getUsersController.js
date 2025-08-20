const { User } = require('../model.js')

async function getUsersController(req, res){
    const userId = req.params.id
    try {
        if(!userId || userId === 0){
            // TODO: consider verifying the request origin originates from host domain or authorized clients
            return res.status(200).json(await User.find())  //TODO: add filter to exclude 'password' from query result
        } else {
            var user = await User.findById(userId)  //TODO: add filter to exclude 'password' from query result
            if(!user){
                return res.status(404).json({message: "Unable to find the user"})
            }
            return res.status(200).json({user})
        }
    } catch(err) {
        console.error('Failed: Unable to fetch requested user(s).\n', err)
        res.status(500).json({message: 'Failed to fetch requested user(s)', error: err.message})
    }
}


module.exports = getUsersController