require('dotenv').config();

const express = require('express');
const app = express();

const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const { PORT } = require('./config/config');

console.log(process.env.NODE_ENV);

const colorPalettesController = require('./controllers/colorPalettesController');
const pickerController = require('./controllers/pickerController');
const authController = require('./controllers/authController');
const auth = require('./middleware/auth');

app.use(cors(corsOptions));                //{ exposedHeaders: 'Authorization' }
app.use('/uploads', express.static('uploads'));
// app.use(express.json());
app.use(express.json({limit: '50mb'}));
app.use(auth());

app.use('/color-palettes', colorPalettesController);
app.use('/color-picker', pickerController);
app.use('/auth', authController);

app.get('/', (req, res) => {
    res.send('REST Service operational.');      //  Send requests to /api
});

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));