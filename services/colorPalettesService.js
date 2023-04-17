const ColorPalette = require('../models/ColorPalette');

async function getAll() {
    return await ColorPalette
        .find()
        .sort({ 'created_at': -1 })
        .lean();
}

async function getAllByPages(page) {
    const pageSize = 6;
    const skip = (page - 1) * pageSize;
    return await ColorPalette
        .find()
        .sort({ 'created_at': -1 })
        .skip(skip)
        .limit(pageSize)
        .lean();
}

async function create(item) {
    const result = new ColorPalette(item);
    await result.save();
    return result;
}

function getOne(itemId) {
    return ColorPalette.findById(itemId);
}

async function update(itemId, item) {
    const existing = await ColorPalette.findById(itemId);

    existing.title = item.title;
    existing.category = item.category;
    existing.colors = item.colors;

    await existing.save();
    return existing;
}

async function like(itemId, userId) {
    const existing = await ColorPalette.findById(itemId);

    if (!existing.likedBy.includes(userId)) {
        existing.likedBy.push(userId);
        await existing.save();
        return existing;
    } else {
        return { message: 'You have already liked this' };
    }
}

async function remove(itemId) {
    await ColorPalette.findByIdAndDelete(itemId);
}

module.exports = {
    getAll,
    getAllByPages,
    getOne,
    create,
    update,
    like,
    remove,
};