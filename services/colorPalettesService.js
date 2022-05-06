const ColorPalette = require('../models/ColorPalette');

async function getAll(query) {
    return await ColorPalette
        .find({ title: { $regex: query || '', $options: 'i' } })
        // .sort({ likedBy: -1 })
        .sort({ 'created_at': -1 })
        .lean();
}

async function getMine(userId) {
    return await ColorPalette
        .find({ creator: userId })
        .sort({ 'created_at': 1 })
        .lean();
}

async function create(item) {
    const result = new ColorPalette(item);
    await result.save();
    return result;
}

function getOne(colorPaletteId) {
    return ColorPalette.findById(colorPaletteId);
}

async function like(colorPaletteId, userId) {
    const existing = await ColorPalette.findById(colorPaletteId);
    existing.likedBy.push(userId);
    await existing.save();
}

async function update(id, item) {
    const existing = await ColorPalette.findById(id);

    existing.title = item.title;
    existing.category = item.category;
    existing.colorGroup = item.colorGroup;
    existing.imageUrl = item.imageUrl;

    await existing.save();

    return existing;
}

async function remove(colorPaletteId) {
    await ColorPalette.findByIdAndDelete(colorPaletteId);
}

module.exports = {
    getAll,
    getMine,
    getOne,
    create,
    update,
    like,
    remove,
};