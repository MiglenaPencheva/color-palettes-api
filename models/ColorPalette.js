const mongoose = require('mongoose');

const colorPaletteScheme = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: String,
        required: ['Type is required']
    },
    imageUrl: {
        type: String,
        required: ['Image is required'],
        validate: {
            validator: (v) => /^https?:\/\//,
            message: (props) => `Invalid URL`
        }
    },
    creator: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    likedBy: [{
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }],
});

module.exports = mongoose.model('Product', colorPaletteScheme);