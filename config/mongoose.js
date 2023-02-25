const mongoose = require('mongoose');

const { DB_URI } = require('./config');
console.log(DB_URI);

// const dbOptions = {
//     useNewUrlParser: true, 
//     useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
// };

// mongoose.set('strictQuery', false);

// mongoose.connect(DB_URI);

const connectDB = async () => {
    try {
        await mongoose.connect(DB_URI);
        console.log('DB ready');
    } catch (err) {
        console.log('DB connection failed');
        console.log(err);
    }
}

// connectDB();

// const db = mongoose.connection;

// db.on('error', console.error.bind(console, 'DB connection error:'));
// db.once('open', console.log.bind(console, 'DB is connected'))

module.exports = connectDB;
