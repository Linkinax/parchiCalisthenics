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

const getLocationInfo = (req, res, callback) => {
    const path = `api/locations/${req.params.locationid}`;
    const requestOptions = {
        url: `${apiOptions.server}/${path}`, 
        method: "GET",
        json: {}
    };
    request(requestOptions, (err, {statusCode}, body)=> {
        const data = body;

        if(statusCode === 200) {
            console.log(body);
            data.coords = {
                lng: data.coords.coordinates[0],
                lat: data.coords.coordinates[1]
            }
            callback(req,res,data);
        }else{
            showErrors(req, res, statusCode);

        }
    })
}
//Get LocationInfo
const locationInfo= (req, res) =>{
    getLocationInfo(req, res, 
        (req,res,responseData)=> {renderInfoLocationPage(req,res, responseData)});
}

//showing Errors
const showErrors = (req, res, status)=> {
    let title= '';
    let content = '';

    if(status === 404){
        title = '404, pagina non trovata';
        content= 'Sembra che non sia stato possibile trovare la pagina... ';
    }else{
        title =  `OPS, ${status},  Sembra ci sia stato un errore`;
        content= 'Sembra che ci sia stato un errore imprevisto';    
    }

    res.status(status);
    res.render('generic-text', {title, content});

}; 

//Get AddReview
const addReview= (req, res) =>{
    getLocationInfo(req, res, 
        (req,res,responseData)=> {renderReviewForm(req,res, responseData)});
}


const doAddReview= (req, res)=>{

    
    const locationid= req.params.locationid;
    const path = `api/locations/${req.params.locationid}/reviews`;

    console.log("Controller doAddReview location id: "+ locationid);
    console.log(req.body);
    //Data from the Review Form
    const postData ={
        author: req.body.name,
        rating: parseInt(req.body.rating, 10),
        reviewText: req.body.review
    }

    console.log(postData);

    const requestOptions = {
        url: `${apiOptions.server}/${path}`, 
        method: "POST",
        json: postData
    };

    request(
        requestOptions,
        (err, {statusCode}, body)=> {
            if(statusCode === 201){
                res.redirect(`/location/${locationid}`);
            }else{
                showErrors(req, res, statusCode);
            }
        }
    );
   
};

const renderReviewForm = (req, res, {name}) => {

    res.render('location-review-form', {
        title: `Aggiungi una review del parco ${name}`,
        pageHeader: { title: `Review  ${name}`
        }
    })

}





module.exports = {
    homeList,
    locationInfo,
    addReview, 
    doAddReview
};