const digitalAssetStore = require('../graphicAssets/digitalAssetPersistence.js')
const uuid = require('uuid')
class DigitalAssetService {
    static #assetStore = digitalAssetStore
    // Make another asset store client for file uploading to uploadthing.
    // Will contain any similar methods (e.g. 'updateAsset', 'deleteAsset') but houses
    // other logic such as building fileKey, if necessary, and related preprocessing tasks. 

    static async createImage(userId, imageDetails){
        try {
            // Set the owner id to the current user as procedure requirement
            if(!userId){
                throw new Error("User Id is required to create image")
            }
            imageDetails.ownerId = userId
            // Create the unique fileKey with uuid attached and persist image data
            const fileKey = `${uuid.v4()}-${imageDetails.fileName}`
            imageDetails.fileKey = fileKey
            return await this.#assetStore.saveImageDoc(imageDetails)
        } catch(err) {
            if(err.name === "ValidationError"){
                console.error(`Invalid property value for property '${ err.errors[ Object.keys(err.errors)[0] ].path }'`)
            }
            console.error("Failed to create asset 'image'")
            throw err
        }
    }

    static async deleteImage(userId, imageId){
        try {
            if(!userId){
                throw new Error("User Id is required to create image")
            }
            return await this.#assetStore.deleteImageDoc(imageId, userId)
        } catch(err) {
            console.error("Failed to delete asset 'image'")
            throw err
        }
    }

    static async updateImage(userId, imageId, imageDetails){
        try {
            if(!userId){
                throw new Error("User id is required to change asset details ")
            }
            return await this.#assetStore.updateImageDoc(imageId, imageDetails)
        } catch(err) {
            console.log("Failed to delete asset 'image'")
            throw err
        }
    }
}

module.exports = DigitalAssetService