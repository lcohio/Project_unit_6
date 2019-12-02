// Require dependencies

const express = require('express');
const { projects } = require('./data.json');

// Init express 

const app = express();


// Set UI template engine

app.set('view engine', 'pug');


// Define path to static assets

app.use('/static', express.static('public'));

// Index route

app.get('/', (req, res) => {
    res.render('index', { projects });
});

// About route

app.get('/about', (req, res) => {
    res.render('about');
});

// Configure "project/" route and map corresponding JSON data

app.get("/project/:id", (req, res) => {
    const reqIndex = req.params.id;
    const templateData = projects[reqIndex];
    res.render('project', { templateData });
});

// If nonexistent route is requested, throw a 404

app.use((req, res, next) => {
    const err = new Error('Not Found');
    console.error('The route you requested doesn\'t exist!');
    err.status = 404;
    next(err);
});

// Render error.pug if nonexistent route is requested

app.use((err, req, res, next) => {
    res.locals.error = err;
    res.status(err.status);
    res.render('error');
});

// Start express server on port 3000

app.listen(3000, () => {
    console.log('The app is running on localhost:3000');
});