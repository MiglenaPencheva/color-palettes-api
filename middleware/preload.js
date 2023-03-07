const { getOne } = require("../services/colorPalettesService");

module.exports = () => async (req, res, next) => {
    const id = req.params.id;

    try {
        const item = await getOne(id).lean();

        item._ownerId = item.creator;
        item.imageFile = path.join(__dirname, '/public/', item.filename);
        // item.imageFile.toString('base64');

        res.locals.item = item;        
        next();

    } catch (error) {
        res.status(404).json({ message: 'Record not found' });
    }
};