// const mongoose = require('mongoose');

// const { DB_URI } = require('./config');

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

// const db = async () => {
//     try {
//         mongoose.connect(DB_URI);
//     } catch (error) {
//         console.log(error);
//     }
// }

// module.exports = db;

const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI);
    } catch (err) {
        console.log(err);
    }
}

module.exports = connectDB;