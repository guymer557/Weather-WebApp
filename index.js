
var baseUrl = "https://www.timeanddate.com";
var cityNameSelector = "a";

var cheerio = require('cheerio');
var request = require('request');
var express = require('express');
var session = require('express-session');
var app = express();
const port = process.env.PORT || 8080;
app.use(session( {
    cookie: {maxAge:30 * 60 * 1000},
    secret: 'keyboard',
    resave: true,
    saveUninitialized: true}));

app.use(express.static('/dist/weatherWebApp'));

app.get('/', function(req, res){
    res.sendfile(__dirname + '/dist/weatherWebApp/index.html');
});

app.get('/location', function (req, res) {
    var cityName = req.param("location");
    request(baseUrl + "/weather/?query=" + cityName, function (error, response, body) {
        var $ = cheerio.load(body);
        var arrayOfCities = $('table[class="zebra fw tb-wt va-m"] tbody>tr a');
        // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        req.session.cities = createArrayOfLinks(arrayOfCities);
        res.send(createArrayOfNames(arrayOfCities));
    });
});

app.get('/city', function (req, res) {
    var cityIndex = req.param("index");
    var $ = cheerio.load(req.session.cities[cityIndex]);
    var cityUrl = $('a').attr('href');
    var cityWeatherInfo;
    request(baseUrl + cityUrl, function (error, response, body) {
        var cityUrlElement = $('a').attr('name', 'cityName');
        $ = cheerio.load(body);
        cityWeatherInfo = extractWeatherInfo($('section[class="bk-wt"]').append(cityUrlElement));
        // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        res.send(cityWeatherInfo);
    });


});

app.listen(port);

// Auxiliary functions to handle with the city elements //
createArrayOfNames = function(array){
    var resArray = [];
    var $;
    for(var i = 0; i < array.length; i++){
        $ = cheerio.load(array[i]);
        resArray.push($(cityNameSelector).text());
    }

    return resArray;
};

createArrayOfLinks = function(array){
    var resArray = [];
    var $;
    for(var i = 0; i < array.length; i++){
        $ = cheerio.load(array[i]);
        resArray.push($(cityNameSelector).toString());
    }

    return resArray;
};

extractWeatherInfo = function(infoElement){
    var weatherInfo = {};
    var $ = cheerio.load(infoElement.toString());

    weatherInfo['header'] = $('a[name="cityName"]').text();
    weatherInfo['location'] = $('div[id="qfacts"] span[id="wt-loc"]').text();
    weatherInfo['temperature'] = $('div[class="h2"]').text();
    weatherInfo['humidity'] = $('div[id="qfacts"]>p:nth-child(7)').text().toLowerCase().replace("humidity:", "").trim();
    var windInfo = $('div[id="qlook"]>p:last-child').text().toLowerCase();
    weatherInfo['windspeed'] = windInfo.slice(windInfo.indexOf("wind:")).replace("wind:", "").trim();
    weatherInfo['icon'] = $('img[id="cur-weather"]').attr('src');

    return weatherInfo;
};
