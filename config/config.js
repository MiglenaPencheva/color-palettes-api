// 1
// const DATABASE_NAME = 'color-palettes';

// const config = {
//     PORT: 5500,
//     DB_URI: `mongodb://localhost:27017/${DATABASE_NAME}`,
//     SALT_ROUNDS: 10,
//     SECRET: 'STAVAMNOGOSOLENO',
//     COOKIE_NAME: 'TOKEN',
// };

// module.exports = config;

// 2
// const DATABASE_NAME = 'ColorPalettesCluster';

const config = {
    development: {
        PORT: process.env.PORT || 5500,
        DB_URI: 'mongodb://localhost/color-palettes',
        SALT_ROUNDS: 10,
        SECRET: 'STAVAMNOGOSOLENO',
        COOKIE_NAME: 'TOKEN',
    },
    production: {
        PORT: process.env.PORT || 10000,
        DB_URI: process.env.DATABASE_URI,
        SALT_ROUNDS: 10,
        SECRET: 'STAVAMNOGOSOLENO',
        COOKIE_NAME: 'TOKEN',
    }
};

module.exports = config[process.env.NODE_ENV.trim()];