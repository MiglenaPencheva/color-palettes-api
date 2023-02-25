const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const connectDB = require('./config/mongoose');
const { DB_URI } = require('./config/config');

const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const { PORT } = require('./config/config');

const auth = require('./middleware/auth');
const colorPalettesController = require('./controllers/colorPalettesController');
const pickerController = require('./controllers/pickerController');
const authController = require('./controllers/authController');

console.log(process.env.NODE_ENV);
console.log(DB_URI);

connectDB();

// async function start() {
//     try {
//         await mongoose.connect(DB_URI);
//         console.log('DB ready');
//     } catch (error) {
//         console.log('DB connection failed');
//         console.log(error);
//         process.exit(1);
//     }
// }
// start();

const app = express();

app.use(cors(corsOptions));                //{ exposedHeaders: 'Authorization' }
app.use(auth());
app.use('/uploads', express.static('uploads'));
// app.use(express.json());
app.use(express.json({limit: '50mb'}));

app.use('/color-palettes', colorPalettesController);
app.use('/color-picker', pickerController);
app.use('/auth', authController);

app.get('/', (req, res) => {
    res.send('REST Service operational.');      //  Send requests to /api
});

mongoose.connection.once('open', () => {
    console.log.bind(console, 'Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
});
mongoose.connection.on('error', console.error.bind(console, 'DB connection error:'));
