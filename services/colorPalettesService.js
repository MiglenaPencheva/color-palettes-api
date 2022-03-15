const ColorPalette = require('../models/ColorPalette');

async function getAll(query) {
    return await ColorPalette
        .find({ title: { $regex: query || '', $options: 'i' } })
        // .sort({ likedBy: -1 })
        // .sort({ 'created_at': 1 })
        .lean();
}

// async function getMine(query, userId) {
//     return await Task
//         .find({
//             creator: userId,
//             content: { $regex: query || '', $options: 'i' }
//         })
//         .sort({ 'created_at': 1 })
//         .lean();
// }

async function getOne(colorPaletteId) {
    let colorPalette = await ColorPalette.findById(colorPaletteId).lean();
    return colorPalette;
}

async function create(colorPaletteData) {
    let colorPalette = new ColorPalette(colorPaletteData);
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
    // getMine,
    getOne,
    create,
    like,
    edit,
    remove,
};