// Include NPM packages
var request = require('request');
var Twitter = require("twitter");
var spotify = require('spotify');
var operator = process.argv[2];
var fs = require('fs');

var defaultTrack = "Ace of Base- The Sign";

switch (operator) {
    case 'my-tweets':
        var Twitter = require("twitter");
        var keys = require('./keys.js');

        var client = new Twitter({
            consumer_key: keys.twitterKeys.consumer_key,
            consumer_secret: keys.twitterKeys.consumer_secret,
            access_token_key: keys.twitterKeys.access_token_key,
            access_token_secret: keys.twitterKeys.access_token_secret
        });

        client.get('statuses/user_timeline', {
            screen_name: 'incubus9x9',
            count: 20
        }, function(error, tweets, response) {
            for (i = 0; i < tweets.length; i++) {
                console.log(tweets[i].created_at);
                console.log(tweets[i].text);
            }
        });

        break;

    case 'spotify-this-song':
    function spotifyThis() {


        var track = process.argv[3];
        if (!track) {
            track = defaultTrack;
        }


        spotify.search({type: 'track', query: track}, function (err, data) {
            if (err) {
                console.log('Error occurred: ' + err);
                return;
            }

            console.log(data.tracks.items[0].artists[0].name);
            console.log(data.tracks.items[0].name);
            console.log(data.tracks.items[0].preview_url);
            console.log(data.tracks.items[0].album.name);


        });
    }
        spotifyThis();

        break;

    case
    'movie-this':

        var movieName = process.argv[3];
        var defaultMovie = 'Mr.Nobody';

        if (!movieName) {
            movieName = defaultMovie;
        }

        var queryUrl = 'http://www.omdbapi.com/?t=' + movieName + '&y=&plot=short&r=json';
        request(queryUrl, function (error, response, body) {


            // If the request is successful (i.e. if the response status code is 200)
            if (!error && response.statusCode == 200) {
                console.log("Title: " + JSON.parse(body)["Title"]);
                console.log("Release Year: " + JSON.parse(body)["Year"]);
                console.log("Rating: " + JSON.parse(body)["imdbRating"]);
                console.log("Country: " + JSON.parse(body)["Country"]);
                console.log("Language: " + JSON.parse(body)["Language"]);
                console.log("Plot: " + JSON.parse(body)["Plot"]);
                console.log("Starring: " + JSON.parse(body)["Actors"]);
                console.log("Rotten Tomatoes rating: " + JSON.parse(body)["tomatoRating"]);
                console.log("Rotten Tomatoes info: " + JSON.parse(body)["tomatoURL"]);
            }


        });
        break;

    case
    'do-what-it-says':

        fs.readFile("./random.txt", "utf8", function (error, data) {

            var dataArr = data.split(',');
            process.argv[3] = dataArr[1];
            spotifyThis();

        })
}

