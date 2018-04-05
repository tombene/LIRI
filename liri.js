require("dotenv").config();
var request = require("request");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var keys = require("./keys");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var args = process.argv;
var liriCommand = args[2];

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
	let params = "count=1";
	client.get("statuses/home_timeline",
		function (error, response, data) {
		
			if(error){
				console.log(error);
			}
			
			if(data.statusCode === 200){
				var json = JSON.parse(data.body);
				//verify that user has tweets
				let displayStr = '';
				if(json.length === 0){
						displayStr = "No Tweets Today. :o(";
						displayThenAppendLog(displayStr);
				}else{
					for(var i = 0; i < json.length; i++){
						if(i===0){
							displayStr = "Tweet Date: " + json[i].created_at + "\nTweet: " + json[i].text;
						}else{
							displayStr += "\nTweet Date: " + json[i].created_at + "\nTweet: " + json[i].text;
						}
					}
					displayThenAppendLog(displayStr);
				}
			}
			
		});
}

//Spotify API
function spotifyApiCall() {
	var spotifyParams = "";
	if (liriString === '') {
		spotifyParams = "The Sign Ace Of Base";
	} else {
		spotifyParams = liriString;
	}
	
	spotify.search({type: 'track',query: spotifyParams,limit: 1},
		function (error, data) {
			if(error){
				return console.log(error);
			}
			var artists = '';
			//Get all the artists if more than one
			for(let i=0;i<data.tracks.items[0].artists.length;i++){
				if(i===0){
					artists = data.tracks.items[0].artists[i].name;
				}else{
					artists += ", " + data.tracks.items[0].artists[i].name; 
				}
			}
			// console.log(data.tracks.items[0]);
			let displayStr = "Artist: " + artists + "\nSong: " + data.tracks.items[0].name + "\nPreview Link: " + data.tracks.items[0].preview_url + "\nAlbum: " + data.tracks.items[0].album.name;
			displayThenAppendLog(displayStr);
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
				let displayStr = "Title: " + omdbJson.Title + "\nYear: " + omdbJson.Year + "\nIMDB Rating: " + omdbJson.imdbRating + "\nRotton Tomatoes Rating: " + omdbJson.Ratings[1].Value + "\nCountry Produced: " + omdbJson.Country + "\nLanguage: " + omdbJson.Language + "\nPlot: " + omdbJson.Plot + "\nActors: " + omdbJson.Actors;
				displayThenAppendLog(displayStr);
			}
		});
}

function doWhatItSays() {
	let fs = require("fs");

	fs.readFile("random.txt", "utf8", function (error, data) {
		if (error) {
			return console.log(error);
		}
		console.log(data.trim());
		let dataArr = data.split(",");
		liriCommand = dataArr[0];
		liriString = dataArr[1];
		switchDirectory();
	});
}

function displayThenAppendLog(data){
	let fs = require("fs");
	let prefix = "\n//****New Log " + Date() + "****//\n";
	fs.appendFile("log.txt", prefix + data, function(error){
		if(error){
			return console.log(error);
		}
		console.log(data);
	});
}