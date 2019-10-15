const request = require('request')

const forecast = (latitude,longitude,callback) => {

    const url = 'https://api.darksky.net/forecast/2a749d29e2fb3dcf8364145ebf4975b7/'+latitude+','+longitude+'?units=si&exclude=minutely,hourly,alerts,flags&lang=en'

    request({url , json : true},(error,{body}) => {

        if(error){
    
            callback('Unable to connect to weather service -> errcode : '+error.code,undefined)
        }
        else if(body.error){
    
            callback('Unable to find location , error -> '+body.error,undefined)
        }
        else{

            const { summary } = body.daily.data[0]

            const {temperature , precipProbability } = body.currently

            callback(undefined,summary+' It is currently '+temperature+' degrees out . There is a '+(precipProbability*100)+'% chance of rain.')
        }
        
    })
}


module.exports = forecast