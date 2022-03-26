const mongoose = require('mongoose');

const colorPaletteScheme = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        minLength: [0, 'Title is required'],
        maxLength: [100, 'Title should be less than 100 characters']
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