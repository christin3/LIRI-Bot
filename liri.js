// Include NPM packages
var keys = require('./keys.js');
var request = require('request');
var twitter = require("twitter");
var spotify = require('spotify');
var operator = process.argv[2];

switch (operator) {
    case 'twitter':



        console.log();
        break;

    case 'spotify':
        var track = process.argv[3];

        spotify.search({ type: 'track', query: track }, function(err, data) {
            if ( err ) {
                console.log('Error occurred: ' + err);
                return;
            }

    console.log(data.tracks.items[1]);

        });
        break;

    case
    'omdb':

// Grab the movieName which will always be the third node argument.
        var movieName = process.argv[3];

// Then run a request to the OMDB API with the movie specified
        var queryUrl = 'http://www.omdbapi.com/?t=' + movieName + '&y=&plot=short&r=json';

        request(queryUrl, function (error, response, body) {

            // If the request is successful (i.e. if the response status code is 200)
            if (!error && response.statusCode == 200) {

                // Parse the body of the site and recover just the imdbRating
                // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
                console.log("Release Year: " + JSON.parse(body)["Year"])
            }
        });
        break;
}

