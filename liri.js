require("dotenv").config();

var Spotify = require('node-spotify-api');
var keys = require("./keys");
var spotify = new Spotify(keys.spotify);
var request = require("request");
var moment = require("moment");
var fs = require("fs");
// 
// concert-this
// spotify-this-song
// movie-this
// do-what-it-says

var action = process.argv[2];
var title = process.argv.slice(3).join(" ");

var concertThis = function (title) {
    //Name of the venue
    // Venue location
    var query = "https://rest.bandsintown.com/artists/" + title + "/events?app_id=codingbootcamp"
    request(query, function (error, response, body) {
        var concertInfo = JSON.parse(body);
        for (i = 0; i < concertInfo.length; i++) {
            console.log(" ");
            console.log("===========================================");
            console.log(" ");
            console.log("Venue Name: ", concertInfo[i].venue.name);
            console.log("Venue Location: ", concertInfo[i].venue.city + ", " + concertInfo[i].venue.region);
            console.log("Concert Date: ", moment(concertInfo[i].datetime).format("MM/DD/YYYY"));
            console.log(" ");
            console.log("===========================================")
            console.log(" ");
        }
    });
}

var spotifyThisSong = function (title) {
    // Artist(s)
    // The song's name
    // A preview link of the song from Spotify
    // The album that the song is from

    spotify.search({ type: 'track', query: title }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        var songInfo = data.tracks.items[0]
        console.log(" ");
        console.log("===========================================");
        console.log(" ");
        console.log("Artist: ", songInfo.artists[0].name);
        console.log("Song Name: ", songInfo.name);
        console.log("Album Name: ", songInfo.album.name);
        console.log("Preview: ", songInfo.preview_url);
        console.log(" ");
        console.log("===========================================");
        console.log(" ");
    });
}

var movieThis = function (title) {
    // * Title of the movie.
    // * Year the movie came out.
    // * IMDB Rating of the movie.
    // * Rotten Tomatoes Rating of the movie.
    // * Country where the movie was produced.
    // * Language of the movie.
    // * Plot of the movie.
    // * Actors in the movie.
    var query = "http://www.omdbapi.com/?t=" + title + "&apikey=" + keys.omdb.secret;
    request(query, function (error, response, body) {
        var movieInfo = JSON.parse(body);
        console.log(" ");
        console.log("===========================================");
        console.log(" ");
        console.log("Movie Title: " + movieInfo.Title);
        console.log("Release Year: " + movieInfo.Released);
        console.log("IMDB Rating: " + movieInfo.imdbRating);
        console.log("Rotten Tomatoes Rating: " + movieInfo.Ratings[1].Value);
        console.log("Country of Production: " + movieInfo.Country);
        console.log("Language: " + movieInfo.Language);
        console.log("Plot: " + movieInfo.Plot);
        console.log("Cast: " + movieInfo.Actors);
        console.log(" ");
        console.log("===========================================");
        console.log(" ");

    })
};

var doWhatItSays = function (title) {
    console.log(" ");
    console.log("===========================================");
    console.log(" ");
    fs.readFile('./random.txt', function (err, data) {
        if (err) throw err;
        console.log(data);
        
      });
    // use fs.readfile to read contests of random.txt
    // split data into an array and save it to a variable
    // save the action and the title in teh new array to new variables
    // call liri switch funciton and pass in our action and title
    // It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.
// 
    console.log(" ");
    console.log("===========================================");
    console.log(" ");
}


var LiriSwitch = function (action, title) {
    switch (action) {
        case "concert-this":
            concertThis(title);
            break;
        case "spotify-this-song":
            spotifyThisSong(title);
            break;
        case "movie-this":
            movieThis(title);
            break;
        case "do-what-it-says":
            doWhatItSays(title);
            break;
        default:
            console.log("Please tell LIRI what you're searching for")
    }
}

LiriSwitch(action, title); 