require('dotenv').config();
const express = require('express');
const configViewEngine = require('./config/viewEngine');
const connection = require('./config/database');

const homeRoutes = require('./routes/home');
const courseRoutes = require('./routes/course');
const trainingRoutes = require('./routes/training');

const app = express(); // app express
const port = process.env.PORT || 8888; //port => hard code
const hostname = process.env.HOST_NANE;

//config req.body
app.use(express.json()); // for json
app.use(express.urlencoded({ extended: true })); //for form data

// config template engine
configViewEngine(app);

// Khai báo route
app.use('/home', homeRoutes);
app.use('/course', courseRoutes);
app.use('/training', trainingRoutes);

app.listen(port, () => {
    console.log(`Server is running at http://${process.env.hostname}:${port}`);
});
