const ColorPalette = require('../models/ColorPalette');

async function getAll(query, page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const count = await ColorPalette.countDocuments();
    const result = await ColorPalette
        .find({ title: { $regex: query || '', $options: 'i' } })
        .sort({ 'created_at': -1 })
        .skip(skip)
        .limit(limit)
        .lean();
    const totalPages = Math.ceil(count / limit);
    return { result, totalPages };
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
    getOne,
    create,
    update,
    like,
    remove,
};