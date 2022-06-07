const router = require('express').Router();
const { upload, save, remove } = require('../services/pickerService');
const { isAuth } = require('../middleware/guards');

router.post('/', async (req, res) => {
    try {
        const image = req.body;
        const result = await upload(image);
        res.status(201).json(result);
    } catch (error) {
        res.status(error.status || 400).json({ message: error.message });
    }
});

router.put('/:id', isAuth(), async (req, res) => {   
    try {
        const itemId = req.params.id;
        const item = req.body;

        const result = await save(itemId, item);
        res.json(result);
        
    } catch (error) {
        res.status(error.status || 400).json({ message: error.message })
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const image = req.params.id;
        await remove(image);
        res.status(204).end();
    } catch (error) {
        res.status(error.status || 400).json({ message: error.message })
    }
});

module.exports = router;