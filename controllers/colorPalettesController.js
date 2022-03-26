const router = require('express').Router();
const { getAll, getMine, create, getOne, like, edit, remove } = require('../services/colorPalettesService');
// const { isAuth } = require('../middleware/guards');
// const preload = require('../middleware/preload');

router.get('/', async (req, res) => {
    const data = await getAll(req.query.search);
    res.json(data);
});

// router.get('/', async (req, res) => {
//     const data = await getMine(req.query.search);
//     res.json(data);
// });

router.post('/', async (req, res) => {

    let { title, category, imageUrl, creator } = req.body;
    let productData = {
        title,
        category,
        imageUrl,
        creator
    };

    try {
        if (!productData.title) throw { message: 'Title is required' };
        if (productData.title.length > 100) throw { message: 'Title should be less than 100 characters' };
        if (!productData.category) throw { message: 'Category is required' };
        if (!productData.imageUrl) throw { message: 'Image is required' };
        if (productData.imageUrl.slice(0, 7) != 'http://' && 
            productData.imageUrl.slice(0, 8) != 'https://') throw { message: 'Invalid image URL' };
        
        const result = await create(productData);

        res.status(201).json(result);

    } catch (error) {
        res.status(error.status || 400).json({ message: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        let data = await getOne(req.params.id);
        res.json(data);
    } catch (error) {
        res.status(error.status || 400).json({ message: error.message });
    }
});

router.post('/:id', async (req, res) => {
    try {
        let data = extractData(req);
        const product = await getOne(req.params.id, req.user._id);
        if (product.creator == req.user._id) {
            await edit(req.params.id, data);
            res.json(data);
        }
    } catch (error) {
        res.status(error.status || 400).json({ message })
    }
});

router.put('/:id', async (req, res) => {
    try {
        let data = await like(req.params.id, req.user._id);
        res.json(data);
    } catch (error) {
        res.status(error.status || 400).json({ message })
    }
});

router.delete('/:id', async (req, res) => {
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
    let { title, type, imageUrl, creator } = req.body;

    try {
        if (!title) throw { message: 'Title is required' };
        if (!type) throw { message: 'Type is required' };
        if (!imageUrl) throw { message: 'Image is required' };

        return productData = {
            title,
            type,
            imageUrl,
            creator
        };
    } catch (error) {
        return({ message: error.message });
    }

}

module.exports = router;