const path = require('path')
const express = require('express')
const hbs = require('hbs')
//Import the geocode request
const geocode = require('./utils/geocode')
//Import the forecast request
const forecast = require('./utils/forecast')

//Init express
const app = express()
//Set the port (env.PORT for heroku or 3000 for localhost)
const port = process.env.PORT || 3000

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebars engine views location
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
//Function that sets the server Root! when we access localhost:3000 (/help.html etc) 
//Everything in this directory is accessible through the web server!
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Nikolas Filias'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Nikolas Filias'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Nikolas Filias',
    })
})

//!!!!!!!! WEATHER ENDPOINT !!!!!!!!!!!!! 

//localhost:3000/weather
app.get('/weather', (req, res) => {

    //Set the adddress the user provided as a query
    const address = req.query.address;

    //If the user did not provide an address print an error
    if (!address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    //If the user provides an address make the geocode request to get the lat/long of this address
    geocode(address, (error, {longitude, latitude, location} = {} ) => {

        //If we catch an error with geocode request stop the proccess and do not make the forecast request
        if (error) {
            return res.send({
                error 
            })
        }
        // <--------------------- Forecasting ---------------------->
        forecast(latitude, longitude, (error, forecastData) => {

        //If we catch an error with forecast request log the error
            if (error) {
                return res.send({
                    error
                })
            }

            //If both requests succeeded send the object with the correct data
            res.send({
                forecastData,
                location,
                address
            })
        })    
    })
})

//Match any page that has not got yet, but belongs to /help folder
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help article was not found',
        name: 'Nikolas Filias'
    })
})

//404 page. * means everything that has not got
app.get('*', (req, res) => {
    res.render('404', {
        title: 'Page not found',
        name: 'Nikolas Filias'
    })
})

//Starting the server in port 3000. 
app.listen(port, () => {
    console.log('Server is up on port 3000')
})