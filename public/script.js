const { JSDOM } = require( "jsdom" );
const { window } = new JSDOM( "" );
const $ = require( "jquery" )( window );


function displayData(temp, weather, humidty, img, windSpeed){
    console.log("Worked");
    $(".weather").text(`Weather: ${weather}`);
    $(".wind-speed").text(`Wind speed: ${windSpeed}`);
    $(".humidty").text(`Humidity: ${humidty}`);

    jqlo
}

module.exports = {displayData}




