const express = require('express')
const {registerNewUserController, getUsersController, removeUserController, updateUserDetailsController} = require('./controllers')

const router = express.Router()


router.get('/', getUsersController)
router.get('/:id', getUsersController)

router.post('/', registerNewUserController)

router.put('/:id', updateUserDetailsController)
router.delete('/:id', removeUserController)

module.exports = router