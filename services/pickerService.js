const Creation = require('../models/Creation');

async function upload(image) {
    const result = new Creation(image);
    await result.save();
    return result;
}

function getOne(imageId) {
    return Creation.findById(imageId);
}

async function save(imageId, image) {
    const existing = await Creation.findById(imageId);

    existing.title = image.title;
    existing.category = image.category;
    existing.colorGroup = image.colorGroup;

    await existing.save();
    return existing;
}

async function remove(imageId) {
    await Creation.findByIdAndDelete(imageId);
}

module.exports = {
    upload,
    getOne,
    save,
    remove,
};