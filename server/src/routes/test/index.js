const express = require('express')
const t_AssetRouter = require('./t_assetRouter')
const t_AuthRouter = require('./t_AuthRouter.js')

const router = express.Router()

router.use("/assets", t_AssetRouter)

router.use("/auth", t_AuthRouter)

module.exports = router