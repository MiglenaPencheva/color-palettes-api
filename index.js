const express = require('express');
require('./config/mongoose');
const cors = require('cors');
// const homeController = require('./controllers/homeController');
const colorPalettesController = require('./controllers/colorPalettesController');
const pickerController = require('./controllers/pickerController');
const authController = require('./controllers/authController');
const auth = require('./middleware/auth');
const { PORT } = require('./config/config');

const app = express();

app.use(cors());                //{ exposedHeaders: 'Authorization' }
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

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));