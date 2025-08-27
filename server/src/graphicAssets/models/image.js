const mongoose = require('mongoose')

const ImageSchema = mongoose.Schema({
    ownerId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    fileName: {
        type: String,
        required: true
    },
    fileSize: {
        type: Number,
        required: true
    },
    fileKey: {
        type: String,
        require: true
    },
})

const Image = mongoose.model('Image', ImageSchema)

module.exports = { Image, ImageSchema }