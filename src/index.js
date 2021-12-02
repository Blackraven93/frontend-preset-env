import "./test/css/test.scss";


let myPositon = {
    latitude: 0,
    longitude: 0
}

/* eslint-disable no-console */
/* eslint-disable no-console */

const geoInfo = navigator.geolocation.watchPosition(position => {
    let latitude = position.coords.latitude
    let longitude = position.coords.longitude;

    myPositon.latitude = latitude
    myPositon.longitude = longitude

    navigator.geolocation.clearWatch(geoInfo)
})



const URL = `https://api.openweathermap.org/data/2.5/onecall?lat=${myPositon.latitude}&lon=${myPositon.longitude}&exclude=hourly&appid=${process.env.WEATHER_API_KEY}&lang=kr`

const xhr = new XMLHttpRequest();
xhr.open('GET', URL, true);
xhr.send()

xhr.onreadystatechange = (e) => {
    console.log(`ready to state : ${xhr.readyState}`)
    console.log(xhr.response)
}

