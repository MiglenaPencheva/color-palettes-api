const DATABASE_NAME = 'color-palettes';

const config = {
    PORT: 5500,
    DB_URI: `mongodb://localhost:27017/${DATABASE_NAME}`,
    SALT_ROUNDS: 10,
    SECRET: 'STAVAMNOGOSOLENO',
    COOKIE_NAME: 'TOKEN',
};

module.exports = config;