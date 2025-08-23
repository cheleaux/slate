const express = require('express')
const { registerNewUserController, getUsersController, removeUserController, updateUserDetailsController } = require('../controllers/user')
const { authenticationRequired } = require('../middleware/auth.js')

const router = express.Router()


router.post('/', registerNewUserController)

router.get('/', getUsersController)

router.get('/:id', authenticationRequired, getUsersController)

router.put('/:id', authenticationRequired, updateUserDetailsController)
router.delete('/:id', authenticationRequired, removeUserController)

module.exports = router