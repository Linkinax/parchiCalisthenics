const mongoose = require('mongoose');
var request = require("request");

const apiOptions= {
    server: "http://localhost:5560"
};

if(process.env.NODE_ENV ==='production'){
    apiOptions.server= "https://ancient-lake-67862.herokuapp.com/"
};

const renderHomePage = (req, res, respBody)=>{
    res.render('location-list', {
        title: "Trova il parco più vicino a te!",
        pageHeader: {
            title: 'Parchi Calisthenics',
            strapline: 'Trova il parco più vicino a te'
        },
        locations: respBody
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
            lng:  45.52495940664423,
            lat: 10.242259493029255,
            maxDist: 20
            }
        };

        request( requestData, (err, resp, body) => {
            renderHomePage(req, res, body);
        });
};

//Get LocationInfo
const locationInfo= (req, res) =>{
    res.render('location-info', {title: "Location info",
    locationData:{ 
        name:"Parco della Questura", 
        rating: 4, 
        address:"Via della questura 123, Brescia",
        facilities: [ "Sbarra trazioni","Parallele", "Panca addominali" ]
    },
    comments: [{author:"Marco Mengoni", content:"Bel parco, molto isolato!", rating:3, time:"30 Dicembre 2021"},  {author:"Marco carta", content:"Ci sono bei negozi nei paraggi?", rating:4, time:"30 Dicembre 2021"}] 
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