const verifySession = require('../services/authService');

module.exports = () => (req, res, next) => {
    const token = req.headers['x-authorization'];

    try {
        if (token) {
            const userData = verifySession(token);
            req.user = userData;
            next();
        }
    } catch (error) {
        res.status(401).json({ message: 'Invalid access token. Please sign in' });
    }
};