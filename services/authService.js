const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SECRET } = require('../config/config');

async function register(username, password) {
    let existing = await User.findOne({ username });
    if (existing) throw { message: 'Username already exists', status: 409 };

    let user = new User({ username, password });
    return await user.save();
}

async function login(username, password) {
    let user = await User.findOne({ username });
    if (!user) throw { message: 'User not found', status: 404 };

    let areEqual = await bcrypt.compare(password, user.password);
    if (!areEqual) throw { message: 'Wrong username or password', status: 401 };

    let token = jwt.sign({ _id: user._id, username: user.username }, SECRET);
    return token;
}

module.exports = {
    register,
    login
};