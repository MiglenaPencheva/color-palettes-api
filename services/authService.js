const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SECRET } = require('../config/config');
const blacklist = [];

async function register(username, password) {
    const existing = await User.findOne({ username });
    if (existing) throw { message: 'Username already exists', status: 409 };

    const user = new User({ username, password });
    await user.save();

    return createSession(user);
}

async function login(username, password) {
    const user = await User.findOne({ username });
    if (!user) throw { message: 'Wrong username or password', status: 404 };

    const areEqual = await bcrypt.compare(password, user.password);
    if (!areEqual) throw { message: 'Wrong username or password', status: 401 };

    return createSession(user);
}

function logout(token) {
    blacklist.push(token);
}

function createSession(user) {
    return {
        username: user.username,
        _id: user._id,
        accessToken: jwt.sign({
            username: user.username,
            _id: user._id,
        }, SECRET)
    }
}

function verifySession(token) {
    if (blacklist.includes(token)) {
        throw new Error('Token is invalid');
    }
    const payload = jwt.verify(token, SECRET);

    return {
        username: payload.username,
        _id: payload._id,
        token
    };
}

module.exports = {
    register,
    login,
    logout,
    verifySession
};