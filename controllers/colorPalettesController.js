const router = require('express').Router();
const { create, getOne, like, edit, remove } = require('../services/colorPalettesService');
const { isAuth } = require('../middleware/guards');
const { parseError } = require('../utils');
const preload = require('../middleware/preload');

router.post('/', isAuth, async (req, res) => {
    console.log(req);
    let data = extractData(req);
    console.log(data);

    try {
        if (!data.title) throw { message: 'Title is required' };
        if (!data.type) throw { message: 'Type is required' };
        if (!data.imageUrl) throw { message: 'Image is required' };

        // const result = await create(data, req.user._id);
        const result = await create(data);
        res.status(201).json(result);
    } catch (error) {
        // const message = parseError(error);
        res.status(error.status || 400).json({ message });
    }
});

router.get('/:id/details', isAuth, preload, async (req, res) => {
    let data = await getOne(req.params.id, req.user._id);
    res.json(data);
});

router.get('/:id/like', async (req, res) => {
    try {
        let data = await like(req.params.id, req.user._id);
        res.json(data); 
    } catch (error) {
        res.status(error.status || 400).json({ message })
    }
});

router.post('/:id/edit', async (req, res) => {
    let data = extractData(req);
    try {
        if (!data.title) throw { message: 'Title is required' };
        if (!data.description) throw { message: 'Description is required' };
        if (!data.imageUrl) throw { message: 'Image is required' };

        const product = await getOne(req.params.id, req.user._id);
        if (product.creator == req.user._id) {
            await edit(req.params.id, data);
            res.json(data);
        }
    } catch (error) {
        res.status(error.status || 400).json({ message })
    }
});

router.get('/:id/delete', async (req, res) => {
    try {
        let data = await getOne(req.params.id, req.user._id);
        if (data.creator == req.user._id) {
            await remove(req.params.id);
            res.status(204).end();
        }
    } catch (error) {
        res.status(error.status || 400).json({ message: error.message })
    }
});

function extractData(req) {
    let { title, type, imageUrl } = req.body;

    return productData = {
        title,
        type,
        imageUrl,
    };
}

module.exports = router;