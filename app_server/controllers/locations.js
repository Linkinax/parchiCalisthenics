
//Get home page
const homeList= (req, res) =>{
    res.render('location-list', {title: "Home"} );

}

//Get LocationInfo
const locationInfo= (req, res) =>{
    res.render('location-info', {title: "Location info"} );

}

//Get AddReview
const addReview= (req, res) =>{
    res.render('index', {title: "Add review"} );

}

module.exports = {
    homeList,
    locationInfo,
    addReview
};