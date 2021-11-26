const router = require('express').Router();
const { getAll } = require('../services/colorPalettesService');

router.get('/', async (req, res) => {
    const data = await getAll(req.query.search);
    res.json(data);
});

module.exports = router;