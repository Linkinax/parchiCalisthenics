const mongoose = require('mongoose');

//Get home page
const homeList= (req, res) =>{
    res.render('location-list', {
        title: "Trova il parco più vicino a te!",
        pageHeader: {
            title: 'Parchi Calisthenics',
            strapline: 'Trova il parco più vicino a te'
        },
        locations: [
            {
                name: 'Parco della Questura',
                address: 'Via della questura 123, Brescia',
                rating:3,
                facilities: ['Sbarra trazioni ', 'Parrallele ', 'Panca abs '],
                distance: '100m'
            },
            {
                name: 'Campo Marte',
                address: 'Via campo marte',
                rating:4,
                facilities: ['Sbarra trazioni ', 'Parrallele ', 'Panca abs '],
                distance: "1200m"
            },
            {
                name: 'Parco xyz',
                address: 'Via della xyz 123, Brescia',
                rating:2,
                facilities: ["Ai", "B", "C"],
                distance: "9999m"
            }
        ]
    } );

}

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