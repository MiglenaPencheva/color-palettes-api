// const allowedOrigins = require('./allowedOrigins')
const allowedOrigins = [
    'https://megacolormix.onrender.com',
    'https://megacolormix.com',
];

const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true,
    exposedHeaders: 'Authorization',
    optionsSuccessStatus: 200
}

module.exports = corsOptions;