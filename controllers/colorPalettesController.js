const router = require('express').Router();
// const fs = require('fs');

const { getAll, create, like, update, remove } = require('../services/colorPalettesService');
const { isAuth, isOwner } = require('../middleware/guards');
const preload = require('../middleware/preload');

const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '/uploads');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '--' + file.originalname);
        // cb(null, new Date() + file.originalname);
    }
});
const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 15 },
    // fileFilter: (req, file, cb) => {
    //     if (file.mimetype === "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
    //         cb(null, true);
    //     } else {
    //         cb(new Error('Only .png, .jpg and .jpeg format allowed!'), false);
    //         // return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    //     }
    // }
});

router.get('/', async (req, res) => {
    const data = await getAll(req.query.search);
    res.json(data);
});

// router.get('/my', isAuth(), async (req, res) => {
//     const data = await getMine(req.user._id);
//     res.json(data);
// });

// router.get('/favorites', isAuth(), async (req, res) => {
//     const data = await getFavorites(req.user._id);
//     res.json(data);
// });

router.post('/', isAuth(), upload.single('imageFile'), async (req, res, next) => {
    try {
        // if (req.file == undefined) throw { message: 'No image available' }
        // if (req.file.size >= 1024 * 1024 * 10) {
        //     throw { message: 'Image too big' } 
        // }
        // if (req.file.mimetype != '.jpeg' ||
        //     req.file.mimetype != '.jpg' ||
        //     req.file.mimetype != '.png') {
        //     throw { message: 'Invalid file type' };
        // }
        const { title, category, colors } = req.body;

        // const decodedData = Buffer.from(blob, 'base64');
        // console.log(decodedData);

        // const imageFile = fs.writeFile('image.png', blob, function (err) {
        //     console.log('File created');
        // });
        // console.log(imageFile);

        if (!title) throw { message: 'Title is required' };
        if (title.length > 100) throw { message: 'Title should be less than 100 characters' };
        if (!category || category == 'Choose category') throw { message: 'Category is required' };
        if (colors == '') throw { message: 'Choose at least one color' }

        const file = req.file.path;
        if (file == '') throw { message: 'Image is required' }
        // imageFile = 'http://localhost:5500/' + file;
        // imageFile = 'https://colorpalettes-api.onrender.com/' + file;
        imageFile = 'https://megacolormix.onrender.com/' + file;

        // const item = { title, category, colors,  };
        const item = { title, category, colors, imageFile };
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
        if (!itemId) throw { message: 'ItemId required' };

        const { title, category, colors } = req.body;

        if (!title) throw { message: 'Title is required' };
        if (title.length > 100) throw { message: 'Title should be less than 100 characters' };
        if (!category || category == 'Choose category') throw { message: 'Category is required' };
        if (colors == '') throw { message: 'Choose at least one color' }

        const item = { title, category, colors };

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

module.exports = router;