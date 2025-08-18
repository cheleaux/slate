const UserOperationsRouter = require('./routes.js')
const User = require('./model.js')

async function findUsers(userIds){
    const users = userIds.map(async (userId) => {
        const user = await User.find(userId)
        if(user) return userl;
    })
    return users
}

module.exports = {
    UserOperationsRouter
}