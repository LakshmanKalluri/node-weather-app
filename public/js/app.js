
onload = () => {

    document.querySelector('button').addEventListener('click',() => {
        
        var searchString = document.querySelector('input').value

        getWeather(searchString)
    })
    
}

getWeather = (searchString) => {

    locationElement = document.getElementById("location")

    forecastElement = document.getElementById("forecast")

    errElement = document.getElementById("errMsg")

    locationElement.innerHTML = 'Loading ...'
    forecastElement.innerHTML = ''
    errElement.innerHTML = ''

    return fetch('http://localhost:3000/weather?address='+encodeURIComponent(searchString)+'')
    .then((response) => {
        return response.json()
    }).then((data) => {
        if(data.error){
            errElement.innerHTML = data.error
            locationElement.innerHTML = ''
        }
        else{
            locationElement.innerHTML = data.location
            forecastElement.innerHTML = data.forecast
        }
    }).catch((error) => {
        console.log("error : "+ error.message)
    })
}

