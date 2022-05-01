const router = require('express').Router();
const { register, login, logout } = require('../services/authService');
const { isGuest } = require('../middleware/guards');

router.post('/login', isGuest(), async (req, res) => {
    const { username, password } = req.body;

    try {
        if (username.trim() == '') throw { message: 'Username required' };
        if (password.trim() == '') throw { message: 'Password required' };

        const result = await login(username.trim(), password.trim());
        res.json(result);

    } catch (error) {
        res.status(error.status || 400).json({ message: error.message });
    }
});

router.post('/register', isGuest(), async (req, res) => {
    let { username, password } = req.body;
    
    try {
        if (username.trim() == '') throw { message: 'Username required' };
        if (password.trim() == '') throw { message: 'Password required' };
        
        const result = await register(username.trim(), password.trim());

        res.status(201).json(result);

    } catch (error) {
        res.status(error.status || 400).json({ message: error.message });
    }
});

router.get('/logout', (req, res) => {
    logout(req.user?.token)
    res.status(204).end();
});

module.exports = router;