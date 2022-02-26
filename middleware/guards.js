module.exports = {
    isAuth() {
        return (req, res, next) => {
            if (!req.user) {
                res.status(401).json({ message: 'Log in to your account.' });
            } else {
                next();
            }
        };
    },
    isGuest() {
        return (req, res, next) => {
            if (req.user) {
                res.status(400).json({ message: 'You are already logged in.' });
            } else {
                next();
            }
        };
    },
    isOwner() {
        return (req, res, next) => {
            const product = req.data;
            if (req.user && req.user._id != product.creator) {
                res.status(403).json({ message: 'You are not authorized to do this.' });
            } else {
                next();
            }
        };
    }
}