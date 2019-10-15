const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//Define paths for Express config

//const publicDirectoryPath = path.join(path.dirname(__dirname),'public')

const publicDirectoryPath = path.join(__dirname,'../public')

const viewsPath = path.join(__dirname,'../templates/views')

const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebars location and engine.

app.set('views',viewsPath)

app.set('view engine','hbs')

hbs.registerPartials(partialsPath)

//Setup static directory to serve.

app.use(express.static(publicDirectoryPath))

//routes

app.get('',(req,res) => {

    res.render('index',{
        header : 'Weather',
        name : 'rajstlpd'
    })
})

app.get('/about',(req,res) => {

    res.render('about',{
        header : 'About Me',
        name : 'rajstlpd'
    })
})

app.get('/help',(req,res) => {

    res.render('help',{
        message : 'Help Message using handlebars.',
        header : 'Help',
        name : 'rajstlpd'

    })
})


app.get('/weather',(req,res) => {

    if(!req.query.address){
        
        return res.send({
            error : 'Please provide address'
        })
    }

    geocode(req.query.address,(error,{latitude , longitude , location } = {}) => {
        
        if(error){
            return res.send({
                error
            })

        }
        
        forecast(latitude,longitude, (error, forecast) => {
    
            if(error){
                return res.send({
                    error
                })
            }
    
            res.send({
                forecast,
                location,
                address : req.query.address
            })

        })
    })
    
    
})

app.get('/help/*',(req,res) => {

    res.render('404',{
        header : 'Error Page',
        name : 'rajstlpd',
        message : 'Help article not found'
    })
})

app.get('*',(req,res) => {

    res.render('404',{
        header : 'Error Page',
        name : 'rajstlpd',
        message : 'Page not found'
    })
})

app.listen(3000,() => {

    console.log('Server is listening on port 3000')
})