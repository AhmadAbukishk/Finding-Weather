const express = require("express")
const bodyParser = require("body-parser")
const https = require("https")
const  {JSDOM} = require( "jsdom" ); 
const { removeData } = require("jquery");
const { document } = (new JSDOM(`./views/weather.ejs`)).window;
const fs = require('fs');
const { json } = require("body-parser");
//const jquery = require( "jquery" )(dom.window);

const app = express()

// To be able to use static Files
app.use(express.static("./public"))
//to use body parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
// To use ejs
app.set("view engine", "ejs")

// init properties
let temp
let weather
let humidty 
let icon
let windSpeed
let post = false;





// Main page
app.get("/", (req, res)=> {
    res.render("weather", {weather: null, windSpeed: null, humidty: null, icon: null, temp: null})
})

// submiting user input
app.post("/", (req, res)=>{
    let city = req.body.city
    let country = req.body.country
    console.log(city);
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}, ${country}&appid=72c07c9ab97744f43a9c04e2e1a80e4f&units=metric`

    https.get(url, (apiRes)=>{

        // fetching data
        apiRes.on('data', (data)=>{
            // Accessing and displaying data 
            const wthData = JSON.parse(data)


            temp = parseInt(wthData.main.temp)
            weather = wthData.weather[0].main
            icon = wthData.weather[0].icon
            windSpeed = wthData.wind.speed + "Km"
            humidty = wthData.main.humidity + "%"
            

            
           res.render("weather", {weather: weather, windSpeed: windSpeed, humidty: humidty, icon:`http://openweathermap.org/img/wn/${icon}@2x.png`, temp: `<h1 class = "TempNum" style = "">${temp}<span style = "font-size: 30px">&#8451</span></h1 >`})

            
        })
    })
})

app.listen(3000, ()=>{
    console.log('server running: 3000')
})


