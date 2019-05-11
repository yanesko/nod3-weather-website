const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()

app.set('view engine', 'hbs')
hbs.registerPartials(path.join(__dirname, '../views/partials'))
app.use(express.static(path.join(__dirname, '../public')))

app.get('/', (req, res) => {
    res.render('index.hbs', {title: 'Weather', name: 'Yana'})
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: "Provide address"
        })
    }

    geocode(req.query.address, (error, {lat, long, location} = {}) => {
        if(error) {
            return res.send({error})
        } 

        forecast(lat, long, (error, weather) => {
            if (error) {
                return res.send({error})
            } 

            res.send({
                location: location,
                weather: `${weather.summary}. It is currently ${weather.temp} degrees out. There is a ${weather.chanceOfRain}% chance of rain.`
            }) 
        })
    })
})

app.get('/about', (req, res) => {
    res.render('about.hbs', {title: 'About me', name: 'Yana'})
})

app.get('/help', (req, res) => {
    res.render('help.hbs', {title: 'Help', name: 'Yana'})
})

app.get('/help/*', (req, res) => {
    res.render('404page.hbs', {
        title: '404',
        name: 'Yana',
        errorMessage: 'Help article not found'})
})

app.get('/*', (req, res) => {
    res.render('404page.hbs', {
        title: '404',
        name: 'Yana',
        errorMessage: 'Page not found'})
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})