const ColorPalette = require('../models/ColorPalette');

async function getAll(query) {
    return await ColorPalette
        .find({ title: { $regex: query || '', $options: 'i' } })
        // .sort({ likedBy: -1 })
        .lean();
}

async function getOne(colorPaletteId, userId) {
    let colorPalette = await ColorPalette.findById(colorPaletteId).lean();
    colorPalette.isOwn = colorPalette.creator == userId;
    if (colorPalette.likedBy) {
        colorPalette.isLiked = colorPalette.likedBy.toString().includes(userId);
    }
    return colorPalette;
}

// async function create(colorPaletteData, userId) {
//     let colorPalette = new ColorPalette(colorPaletteData);
//     colorPalette.creator = userId;
//     return colorPalette.save();
// }
async function create(colorPaletteData) {
    let colorPalette = new ColorPalette(colorPaletteData);
    // colorPalette.creator = userId;
    return colorPalette.save();
}

async function like(colorPaletteId, userId) {
    let colorPalette = await ColorPalette.findById(colorPaletteId);
    
    if (colorPalette.creator == userId) return;
    if (colorPalette.likedBy.toString().includes(userId)) return;

    colorPalette.likedBy.push(userId);
    colorPalette.isLiked = true;

    return colorPalette.save();
}

async function edit(colorPaletteId, editedData) {
    return await ColorPalette.updateOne({ _id: colorPaletteId }, editedData);
}

async function remove(colorPaletteId) {
    return await ColorPalette.deleteOne({ _id: colorPaletteId });
}

module.exports = {
    getAll,
    getOne,
    create,
    like,
    edit,
    remove,
};