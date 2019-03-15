const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express();

const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);


app.use(express.static(publicDirPath));

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Stefanatos Alex'
    });
});
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        name: 'Stefanatos Alex'
    });
});
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Stefanatos Alex',
        msg: 'This is message to help you with the weather app'
    })
})

app.get('/weather', (req, res) =>{
    if (!req.query.address) {
        return res.send({
            error: 'No addreess provided'
        })
    } 
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, { temperature, humindity, rain_chance, wind_speed, summary } = {}) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                temperature,
                humindity,
                rain_chance,
                wind_speed,
                summary,
                location
            })
        })

    })
});

app.get('/help/*', (req, res) =>{
    res.render('404', {
        title: 'Help Page 404',
        name: 'Stefanatos Alex',
        errorMsg: 'Article not found'
    });
});

app.get('*', (req, res) =>{
    res.render('404', {
        title: 'Error Page',
        name: 'Stefanatos Alex',
        errorMsg: 'Page not found'
    });
});

app.listen(3000, () =>{
    console.log("Server is up on port 3000.");
    
});