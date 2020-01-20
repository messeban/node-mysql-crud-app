const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const app = express();

const {getHomePage, getContact} = require('./routes/index.js');
const { getImmeublePage,immeublesSortBy, addImmeublePage, addImmeuble, deleteImmeuble, editImmeuble, editImmeublePage, getProfilePage, getProfile} = require('./routes/immeuble');
const { getSyndicPage, syndicsSortBy, addSyndicPage, addSyndic, deleteSyndic, editSyndic, editSyndicPage} = require('./routes/syndic');
const {postCommune} = require('./routes/location.js');

const port = 80;

// create connection to database
// the mysql.createConnection function takes in a configuration object which contains host, user, password and the database name.
const db = mysql.createConnection ({
    host: 'localhost',
    user: 'mes',
    password: 'test123!',
    database: 'immo',
    insecureAuth : true
});

// connect to database
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});
global.db = db;

// configure middleware
app.set('port', process.env.port || port); // set express to use this port
app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.set('view engine', 'ejs'); // configure template engine
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client
app.use(express.static(path.join(__dirname, 'public'))); // configure express to use public folder
app.use(fileUpload()); // configure fileupload

// routes for the app

app.get('/', getHomePage);
app.get('/contact', getContact);

app.get('/immeubles', getImmeublePage);

app.get('/immeubles/sortBy:cat', immeublesSortBy);

app.get('/addImmeuble', addImmeublePage);
app.get('/editImmeuble/:id', editImmeublePage);
app.get('/deleteImmeuble/:id', deleteImmeuble);
app.post('/addImmeuble', addImmeuble);
app.post('/editImmeuble/:id', editImmeuble);

app.post('/communes/:cp', postCommune);


app.get('/profile/:id', getProfilePage);
app.post('/profile/:id', getProfile);

app.get('/syndics', getSyndicPage);
app.get('/syndics/sortBy:cat', syndicsSortBy);


app.get('/addSyndic/', addSyndicPage);
app.get('/editSyndic/:id', editSyndicPage);
app.get('/deleteSyndic/:id', deleteSyndic);
app.post('/addSyndic/', addSyndic);
app.post('/editSyndic/:id', editSyndic);

// set the app to listen on the port
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});