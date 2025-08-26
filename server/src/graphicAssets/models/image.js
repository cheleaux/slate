const mongoose = require('mongoose')

const ImageSchema = mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    fileName: {
        type: String,
        required: true
    },
    fileSize: {
        type: number,
        required: true
    },
    fileKey: {
        type: String,
        require: true
    },
})

const Image = mongoose.model('Image', ImageSchema)

module.exports = { Image, ImageSchema }