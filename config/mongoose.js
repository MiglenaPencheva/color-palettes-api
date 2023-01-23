const mongoose = require('mongoose');

const { DB_URI } = require('./config');

// const dbOptions = {
//     useNewUrlParser: true, 
//     useUnifiedTopology: true,
//     // useCreateIndex: true,
//     // useFindAndModify: false,
// };
// mongoose.set('strictQuery', false);

// mongoose.connect(DB_URI, dbOptions);

// const db = mongoose.connection;

// db.on('error', console.error.bind(console, 'DB connection error:'));
// db.once('open', console.log.bind(console, 'DB is connected'))

const db = async () => {
    try {
        mongoose.connect(DB_URI);
    } catch (error) {
        console.log(error);
    }
}

mongoose.connection.on('error', console.error.bind(console, 'DB connection error:'));
mongoose.connection.once('open', console.log.bind(console, 'DB is connected'))

module.exports = db;