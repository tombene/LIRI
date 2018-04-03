require("dotenv").config();
var request = require("request");
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
//console.log(client);
var args = process.argv;
var liriCommand = args[2];
//var liriInput = args[3];
var liriInput = args.slice();
liriInput.splice(0, 3);
var liriString = '';
for (var i = 0; i < liriInput.length; i++) {
	if (i === 0) {
		liriString += liriInput[i];
	} else {
		liriString += " " + liriInput[i];
	}
}
console.log(liriCommand);
//direct the commands
function switchDirectory() {
	switch (liriCommand) {
		case "my-tweets":
			twitterApiCall();
			break;
		case "spotify-this-song":
			spotifyApiCall();
			break;
		case "movie-this":
			omdbApiCall();
			break;
		case "do-what-it-says":
			doWhatItSays();
			break;
		default:
			console.log("Invalid selection, please double check your input.");
	}
}

//run once for initial start
switchDirectory();

//Twitter API
function twitterApiCall() {
	var twitterUrl = "https://api.twitter.com/1.1/statuses/home_timeline.json";
	request(twitterUrl,
		function (error, response, body) {

		});
}

//Spotify API
function spotifyApiCall() {
	var spotifyUrl = "";
	if (liriString === '') {
		spotifyUrl = "";
	} else {
		spotifyUrl = "";
	}

	request('GET',spotify, spotiryUrl,
		function (error, response, body) {

		});
}

//OMDB API
function omdbApiCall() {
	var omdbUrl;
	if (liriString === '') {
		omdbUrl = "http://www.omdbapi.com/?t=Mr.+Nobody&y=&plot=short&apikey=trilogy";
	} else {
		omdbUrl = "http://www.omdbapi.com/?t=" + liriString + "&y=&plot=short&apikey=trilogy";
	}
	liriString = liriString.replace(/ /g, '+');

	request(omdbUrl,
		function (error, response, body) {
			if (error) {
				return console.log(error);
			}
			var omdbJson = JSON.parse(body);
			if (response.statusCode === 200) {
				console.log("Title: " + omdbJson.Title + "\nYear: " + omdbJson.Year + "\nIMDB Rating: " + omdbJson.imdbRating + "\nRotton Tomatoes Rating: " + omdbJson.Ratings[1].Value + "\nCountry Produced: " + omdbJson.Country + "\nLanguage: " + omdbJson.Language + "\nPlot: " + omdbJson.Plot + "\nActors: " + omdbJson.Actors);
			}
		});
}


function doWhatItSays() {
	var fs = require("fs")

	fs.readFile("random.txt", "utf8", function (error, data) {
		if (error) {
			return console.log(error);
		}
		console.log(data.trim());
		var dataArr = data.split(",");
		liriCommand = dataArr[0];
		liriString = dataArr[1];
		switchDirectory();
	});
}