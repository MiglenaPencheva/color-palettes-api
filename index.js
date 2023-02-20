require('dotenv').config();

const express = require('express');
const app = express();

const connectDB = require('./config/mongoose');
const mongoose = require('mongoose');
// const { PORT } = require('./config/config');
const PORT = process.env.PORT || 5500;

console.log(process.env.NODE_ENV);

const cors = require('cors');
const corsOptions = require('./config/corsOptions');
// const homeController = require('./controllers/homeController');

const colorPalettesController = require('./controllers/colorPalettesController');
const pickerController = require('./controllers/pickerController');
const authController = require('./controllers/authController');
const auth = require('./middleware/auth');


connectDB();

app.use(cors(corsOptions));                //{ exposedHeaders: 'Authorization' }
app.use('/uploads', express.static('uploads'));
// app.use(express.json());
app.use(express.json({limit: '50mb'}));
app.use(auth());

// app.use('/home', homeController);
app.use('/color-palettes', colorPalettesController);
app.use('/color-picker', pickerController);
app.use('/auth', authController);

app.get('/', (req, res) => {
    res.send('REST Service operational.');      //  Send requests to /api
});

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
});

mongoose.connection.on('error', console.error.bind(console, 'DB connection error:'));