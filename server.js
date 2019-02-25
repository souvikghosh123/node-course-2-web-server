const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');



app.use(function (req, res, next) {
    var now = new Date().toString();
    var log =  `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', function (err) {
        if (err) {
            console.log('Unable to append to server.log')
        }
    })
    next();
});

// app.use(function (req, res, next) {
//     res.render('maintenence.hbs');
// })

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', function () {
    return new Date().getFullYear()
   //return 'test';
});

hbs.registerHelper('screamIt', function (text) {
    return text.toUpperCase();
});

    
app.get('/', function (req, res) {
    res.render('home.hbs', {
    pageTitle: 'Home Page (Dynamic)',
    currentYear: new Date().getFullYear(),
    welcomeMsg: 'Welcome to the world of Programming!'
    });
});

app.get('/about', function (req, res) {
  res.render('about.hbs', {
  pageTitle: 'About Page (Dynamic)',
  currentYear: new Date().getFullYear()
});
});


app.get('/projects', function (req, res) {
  res.render('projects.hbs', {
      pageTitle: 'Projects Page'
  });  
});


app.get('/bad', function (req, res) {
    res.send({
        errorMsg: 'This is a bad request',                
    });
});

app.listen(port, function () {
    console.log(`Server is up on port ${port}`);
});
