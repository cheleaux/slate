const express = require('express')
const { t_createImageController, t_deleteImageController } = require('../../controllers/test/t_assetController')

const router = express.Router()

router.post('/images', t_createImageController)

router.delete("/images", t_deleteImageController)

module.exports = router