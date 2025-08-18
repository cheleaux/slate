const { User } = require('../model.js')

async function getUsersController(req, res){
    const userId = req.params.id
    try {
        if(!userId || userId === 0){
            // TODO: consider verifying the request origin originates from host domain or authorized clients
            return res.status(200).json(await User.find())
        } else {
            const requestedUser = await User.findById(userId)
            return res.status(200).json(requestedUser)
        }
    } catch(err) {
        console.error('Failed: Unable to fetch requested user(s).\n', err)
        res.status(500).json({message: 'Failed to fetch requested user(s)', error: err.message})
    }
}


module.exports = getUsersController