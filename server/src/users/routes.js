const express = require('express')
const { registerNewUserController, getUsersController, removeUserController, updateUserDetailsController } = require('./controllers')
const { authenticationRequired } = require('../middleware/auth.js')

const router = express.Router()


router.get('/', getUsersController)

router.post('/', registerNewUserController)

router.get('/:id', authenticationRequired, getUsersController)

router.put('/:id', authenticationRequired, updateUserDetailsController)
router.delete('/:id', authenticationRequired, removeUserController)

module.exports = router