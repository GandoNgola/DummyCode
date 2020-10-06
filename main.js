const express = require("express");
const https = require("https");
const bodyParser = require("body-parser")

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function (req, res){
    res.sendFile(__dirname + "/index.html");
    // res.send('server is up and running');
    })
    
app.post("/", function (req, res){
    const city = req.body.cityName;
    const apiKey = "a463ea2cf388e099247048d307339e64";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city +"&appid=" + apiKey +"&units=metric";
    
    https.get(url, function(response){
    
        console.log(response.statusCode);

        response.on("data", function(data){
            const weather_data = JSON.parse(data);
            const temp = weather_data.main.temp;
            const weather_description = weather_data.weather[0].description;
            const icon = weather_data.weather[0].icon;
        // const image_url = ""
            res.write("<p>The weather is currently " + weather_description + "</p>");
            res.write("<h1>The temperature in " + city + " is " + temp + " degrees Celsius </h1>");
            res.send();
        })
    })   
})

app.listen(3000, function (){
    console.log("The server is running in port 3000");
})