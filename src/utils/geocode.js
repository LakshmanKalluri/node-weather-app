const request = require('request')

geocode = (address,callback) => {
    
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiaXdkbWxiIiwiYSI6ImNrMWk1dmFkNTBtYWszbXBjMGQwOGRweG8ifQ.B9SPwwrUI5osbDn76loMSg&limit=1'

    request({url, json : true},(error,{body}) => {


        if(error){

            callback('Unable to connect to maps service , errcode -> '+error.code,undefined)
        }
        else if(body.message){

            callback('Please provide some address',undefined)
        }
        else if(body.features.length < 1){

            callback('Unable to find the address',undefined)
        }
        else{

            const { place_name : location} = body.features[0]

            const { 1 : latitude , 0 : longitude} = body.features[0].center
                
                callback(undefined,{latitude, longitude, location}) 

        }
        

    })

}

module.exports = geocode