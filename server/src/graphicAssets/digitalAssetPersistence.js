const { Image } = require('./models/image.js')


class DigitalAssetStore {
    static async saveImageDoc(imageDetails){
        try {
            const { ownerId, fileName, fileSize, fileKey } = imageDetails
            const image = new Image({ ownerId, fileName, fileSize, fileKey })
            return await image.save()
        } catch(err) {
            const msg = this.#resolveAssetOperationErrorMessage(err)
            console.error(msg)
            throw err
        }
    }

    static async updateImageDoc(id, newImageDetails){
        try {
            const image = await Image.findOne({_id: id})
            if((typeof image.ownerId === 'object' || typeof image.ownerId === 'string') && image.ownerId != userId){
                throw new Error("requesting user id must match the owner id")
            }
            
            for(const key in newImageDetails){
                if(!Object.hasOwn(image, key)){
                    throw new Error("Invalid Image property")
                }
                image[key] = newImageDetails[key]
            }
            return await image.save()
        } catch(err) {
            const msg = this.#resolveAssetOperationErrorMessage(err)
            console.error(msg)
            throw err
        }
    }

    static async deleteImageDoc(id, userId){
        try {
            const image = await Image.findOne({_id: id})
            if((typeof image.ownerId === 'object' || typeof image.ownerId === 'string') && image.ownerId != userId){
                throw new Error("requesting user id must match the owner id")
            }
            return await Image.deleteOne({_id: id})
        } catch(err){
            const msg = this.#resolveAssetOperationErrorMessage(err)
            console.error(msg)
            throw err
        }
    }

    static #resolveAssetOperationErrorMessage(err){
        if(err.name === "ValidationError"){
            return "Validation failed during doc operation"
        } else {
            return "Image asset document failed to save to db"
        }
    }
}

module.exports = DigitalAssetStore