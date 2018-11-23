const express = require('express')
const router = express.Router()
var SpotifyWebApi = require('spotify-web-api-node')

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


router.get('/', (request, response)=>{
    //response.render('home')
    const {search} = request.query
    console.log(request.query.search)
    console.log(search)

    if(search){
        spotifyApi.searchArtists(search)

            .then(data =>{
                var artist = data.body.artists.items
                names = ""
                arrN=[]
            
                for(var i=0; i < artist.length; i++){
                    if(artist[i].images.length!=0){
                        arrN.push({name:artist[i].name, img:artist[i].images[0].url, id:artist[i].id})
                    }
                    //console.log(artist[i].name)
                    //response.send(artist[i].name)
                    names += '<br>' + artist[i].name

                }
                //response.send(names)
                //console.log(artist)
                //console.log(data)
                //response.send(arrN)
                response.render('artists', { arrN })
                //response.render('artists', {artist})
                
            })
            .catch(e=>{
                console.log(e)
            })
    }else{
        response.render('home')
    }

})

router.get('/albums/:id', (request, response)=>{

    spotifyApi.getArtistAlbums(request.params.id)
    .then(data =>{
        var albums = data.body.items
        //names = ""
        arrM=[]
    
        for(var i=0; i < albums.length; i++){
            if(albums[i].images.length!=0){
                arrM.push({name:albums[i].name, img:albums[i].images[0].url, id:albums[i].id})
            }
            //names += '<br>' + albums[i].name

        }
        //response.render('albums', { arrM })
        response.send(arrM)
    })
    .catch(e=>{
        console.log(e)
    })

})

router.get('/artists', (request, response)=>{
    response.render('artists', { artist })
})


module.exports = router