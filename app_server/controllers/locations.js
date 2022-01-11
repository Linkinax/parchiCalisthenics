const mongoose = require('mongoose');
var request = require("request");

const apiOptions= {
    server: "http://localhost:5560"
};

if(process.env.NODE_ENV ==='production'){
    apiOptions.server= "https://ancient-lake-67862.herokuapp.com"
};

const renderHomePage = (req, res, respBody)=>{
    let msg = null;

    if(! (respBody instanceof Array)){
        msg = "Error looking up fomr the API";
        respBody= [];
    }else{
        if(! respBody.length){
            msg = "Non è stato possibile trovare nessun parco nelle vicinanze";
        }
    }
    res.render('location-list', {
        title: "Trova il parco più vicino a te!",
        pageHeader: {
            title: 'Parchi Calisthenics',
            strapline: 'Trova il parco più vicino a te'
        },
        locations: respBody, 
        msg
    } );

}
//Get home page
const homeList= (req, res) =>{

    const path = '/api/locations';
    const requestData = {
        url: apiOptions.server.toString() + path,
        method:'GET',
        json: {},
        qs: {
            lng:  45.53180797634532,
            lat:  10.240715853814319,
            maxDist: 20
            }
        };


        request( requestData, (err, resp, body) => {
            renderHomePage(req, res, body);
        });
};



const renderInfoLocationPage = (req, res, location)=>{
    
    console.log("Rendering info location:");
    console.log(location);
    const locationData = location;
    

    console.log(locationData);

    //Static comments for the moment
    var comments= [{author:"Marco Mengoni", content:"Bel parco, molto isolato!", rating:3, time:"30 Dicembre 2021"},  {author:"Marco carta", content:"Ci sono bei negozi nei paraggi?", rating:4, time:"30 Dicembre 2021"}]
    
    res.render('location-info', {title: location.name,
        locationData,
        comments,
        pageHeader: { title: location.name, sidebar: {
            context: "Data to be displayed in the sidebar"
        },
        
    }

   
} );
}
//Get LocationInfo
const locationInfo= (req, res) =>{

    const path = `api/locations/${req.params.locationid}`;
    console.log(path);
    const requestData = {
        url: `${apiOptions.server}/${path}`, 
        method: "GET",
        json: {}
    };

    console.log("url of the request "+ requestData.url);
    request(requestData, (err,response, body) => {

        const data = body;

        console.log("LocationInfo body request: ")
        console.log(body);
        data.coords = {
            lng: data.coords.coordinates[0],
            lat: data.coords.coordinates[1]
        }

        renderInfoLocationPage(req, res, data);
    } );
}

//Get AddReview
const addReview= (req, res) =>{
    res.render('location-review-form', {title: "Add review"} );
}



module.exports = {
    homeList,
    locationInfo,
    addReview
};