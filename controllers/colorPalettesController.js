const router = require('express').Router();
const { getAll, getMine, getFavorites, create, like, update, remove } = require('../services/colorPalettesService');
const { isAuth, isOwner } = require('../middleware/guards');
const preload = require('../middleware/preload');

router.get('/', async (req, res) => {
    const data = await getAll(req.query.search);
    res.json(data);
});

router.get('/my', isAuth(), async (req, res) => {
    const data = await getMine(req.user._id);
    res.json(data);
});

router.get('/favorites', isAuth(), async (req, res) => {
    const data = await getFavorites(req.user._id);
    res.json(data);
});

router.post('/', isAuth(), async (req, res) => {
    try {
        const item = extractData(req);
        item.likedBy = [];
        item.creator = req.user._id;
        const result = await create(item);
        res.status(201).json(result);
    } catch (error) {
        res.status(error.status || 400).json({ message: error.message });
    }
});

router.get('/:id', preload(), async (req, res) => {
    try {
        const item = res.locals.item;
        res.json(item);
    } catch (error) {
        res.status(error.status || 400).json({ message: error.message });
    }
});

router.put('/:id', preload(), async (req, res) => {   //isOwner(),
    try {
        const itemId = req.params.id;
        const item = extractData(req);

        if (req.user) {
            if (req.user._id == res.locals.item.creator) {
                const result = await update(itemId, item);
                res.json(result);
            } else {
                const result = await like(itemId, req.user._id);
                res.json(result);
            }
        }
    } catch (error) {
        res.status(error.status || 400).json({ message: error.message })
    }
});

router.delete('/:id', preload(), isOwner(), async (req, res) => {
    try {
        const itemId = req.params.id;
        await remove(itemId);
        res.status(204).end();
    } catch (error) {
        res.status(error.status || 400).json({ message: error.message })
    }
});

function extractData(req) {
    try {
        const { title, category, colorGroup, imageUrl } = req.body;

        if (!title) throw { message: 'Title is required' };
        if (title.length > 100) throw { message: 'Title should be less than 100 characters' };
        if (!category || category == 'Choose category') throw { message: 'Category is required' };
        if (colorGroup.length == 0) throw { message: 'Choose at least one color' }
        if (!imageUrl) throw { message: 'Image is required' };
        if (imageUrl.slice(0, 7) != 'http://' &&
            imageUrl.slice(0, 8) != 'https://') throw { message: 'Invalid image URL' };

        return item = {
            title,
            category,
            colorGroup,
            imageUrl
        };

    } catch (error) {
        return ({ message: error.message });
    }
}

module.exports = router;