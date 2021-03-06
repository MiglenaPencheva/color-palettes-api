const mongoose = require('mongoose');

const creationScheme = new mongoose.Schema({
    src: {
        type: String
    },
    creator: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }
},
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    });

module.exports = mongoose.model('Creation', creationScheme);