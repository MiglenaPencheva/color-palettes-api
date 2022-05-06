module.exports = {
    isAuth() {
        return (req, res, next) => {
            if (!req.user) {
                res.status(401).json({ message: 'Please log in' });
            } else {
                next();
            }
        };
    },
    isGuest() {
        return (req, res, next) => {
            if (req.user) {
                res.status(400).json({ message: 'You are already signed in.' });
            } else {
                next();
            }
        };
    },
    isOwner() {
        return (req, res, next) => {
            if (req.user && req.user._id != res.locals.item.creator) {
                res.status(403).json({ message: 'You can not modify this record' });
            } else {
                next();
            }
        };
    },
    isNotOwner() {
        return (req, res, next) => {
            if (req.user && req.user._id == res.locals.item.creator) {
                res.status(403).json({ message: 'You can not like this record' });
            } else {
                next();
            }
        };
    }
}