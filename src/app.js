const path = require('path')
const express = require('express')
const hbs = require('hbs');
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(__dirname)
console.log(path.join(__dirname, '../public'))

const app = express()
const port = process.env.PORT || 3000

// Define path for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPaths = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('views', viewPaths)
hbs.registerPartials(partialPath)
app.set('view engine', 'hbs')
  
// Setup static directory to serve
app.use(express.static(publicDirectoryPath))
 
app.get('', function(req, res) {
    res.render('index', {
        title: 'Weather App',
        name: 'Souvik Ghosh',
        footertitle: 'This is created by Souvik (Footer Title)'
    })  
})

app.get('/about', function(req, res) {
    res.render('about', {
        title: 'About Me',
        name: 'Souvik Ghosh',
        footertitle: 'This is created by Souvik (Footer Title)'
    })
})

app.get('/help', function(req, res) {
    res.render('help', {
        title: 'Help Page',
        name: 'Souvik Ghosh',
        footertitle: 'This is created by Souvik (Footer Title)'
    })
})

app.get('/weather', function(req, res) {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.search, (error, data) => {
        if (error) {
            return res.send({
                Error_Description: error
            })
        }
        forecast(data.latitude, data.longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    Error_Description: error
                })
            }
            res.send({
                address: req.query.search,
                Location: data.location,
                Forecast: forecastData
            })
        })
    })


    // res.send({
    //     location: req.query.search
    // })
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
       return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', function(req, res) {
 //   res.send('Help article not found')
 res.render('404', {
    title: 'ERROR 404',
    name: 'Souvik Ghosh',
    footertitle: 'Help page not found.'
    })
})

app.get('*', function(req, res) {
//    res.send('My 404 page')
    res.render('404', {
        title: 'ERROR 404',
        name: 'Souvik Ghosh',
        footertitle: 'Page not found.'
    })
})

app.listen(port, function() {
    console.log('Server is up on port ' + port');
})


