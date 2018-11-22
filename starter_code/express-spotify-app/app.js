var SpotifyWebApi = require('spotify-web-api-node');

// Remember to paste your credentials here
var clientId = 'db531a6bbd0347dab1395fca3cb97688',
    clientSecret = '627f4c88ddae42f6962fe7633cdc58a2';

var spotifyApi = new SpotifyWebApi({
  clientId : clientId,
  clientSecret : clientSecret
});

// Retrieve an access token.
spotifyApi.clientCredentialsGrant()
  .then(function(data) {
    spotifyApi.setAccessToken(data.body['access_token']);
  }, function(err) {
    console.log('Something went wrong when retrieving an access token', err);
});