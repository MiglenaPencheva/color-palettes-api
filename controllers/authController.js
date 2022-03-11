const router = require('express').Router();
const { register, login } = require('../services/authService');
const { isGuest } = require('../middleware/guards');

router.post('/login', isGuest(), async (req, res) => {
    const { username, password } = req.body;

    try {
        if (username.trim() == '') throw { message: 'Username required' };
        if (password.trim() == '') throw { message: 'Password required' };
        
        let token = await login(username, password);
        res.json(token);

    } catch (error) {
        res.status(error.status || 400).json({ message: error.message });
    }
});

router.post('/register', isGuest(), async (req, res) => {
    let { username, password, } = req.body;
    
    try {
        if (username.trim() == '') throw { message: 'Username required' };
        if (password.trim() == '') throw { message: 'Password required' };
        
        await register(username, password);

        let token = await login(username, password);
        res.json(token);

    } catch (error) {
        res.status(error.status || 400).json({ message: error.message });
    }
});

router.get('/logout', (req, res) => {
    res.status(204).end();
});

module.exports = router;