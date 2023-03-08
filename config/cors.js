module.exports = () => (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://megacolormix.onrender.com');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, HEAD, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Authorization, Authorization, x-authorization');
    next();
};


// const allowedOrigins = [
//     'https://megacolormix.onrender.com',
//     'https://megacolormix.com',
// ];

// const corsOptions = {
//     origin: (origin, callback) => {
//         if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
//             callback(null, true)
//         } else {
//             callback(new Error('Not allowed by CORS'))
//         }
//     },
//     credentials: true,
//     exposedHeaders: 'Authorization',
//     optionsSuccessStatus: 200
// }

// module.exports = corsOptions;