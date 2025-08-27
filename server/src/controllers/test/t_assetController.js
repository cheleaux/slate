const DigitalAssetService = require('../../services/digitalAssetService.js')

async function t_createImageController(req, res){
    try {
        const imageDetails = req.body.image
        const user = req.body.userId

        const savedImage = await DigitalAssetService.createImage(user, imageDetails)
        res.status(200).json({success: true, image: savedImage})
    } catch(err) {
        console.error(`Creation of new image asset failed due to '${err.name}'`, err)
        res.status(500).json({message: "Creation of new image asset failed",
            success: false,
            error: err.message,
            errorType: err.name
        })
    }
}

async function t_deleteImageController(req, res){
    try {
        const imageId = req.body.imageId
        const user = req.body.userId
    
        const delete_DB_ack = await DigitalAssetService.deleteImage(user, imageId)
        res.status(200).json({success: true, ack: delete_DB_ack})
    } catch(err) {
        console.error(`Image asset deletion failed due to '${err.name}'`, err)
        res.status(500).json({ message: "Image asset deletion failed",
            success: false,
            error: err.message,
            errorType: err.name
        })

    }
}

module.exports = { t_createImageController, t_deleteImageController }