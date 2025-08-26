const { Image } = require('./models/image.js')


class DigitalAssetStore {
    static async saveImageDoc(imageDetails){
        const { ownerId, fileName, fileSize, fileKey } = imageDetails
        const image = new Image({ ownerId, fileName, fileSize, fileKey })
        return await image.save()
    }


    static async updateImageDoc(newImageDetails, id){
        const image = await Image.findOne(id)
        for(const key in newImageDetails){
            if(!Object.hasOwn(image, key)){
                throw new Error("Invalid Image property")
            }
            image[key] = newImageDetails[key]
        }
        return await image.save()
    }

    static async deleteImageDoc(id, userId){
        const image = await Image.findOne(id)
        if(image.userId !== userId){
            throw new Error("requesting user id must match the owner id")
        }
        return await Image.deleteOne({_id: id})
    }
}

module.exports = DigitalAssetStore