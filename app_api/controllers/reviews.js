const mongoose = require('mongoose');
const Parchi = mongoose.model('Location');


const reviewsCreate = (req, res) => {
    const locationId = req.params.locationid;

    console.log("Creating review with loc_id="+ locationId);
    console.log(req.params);
    if(locationId){
        Parchi.
            findById(locationId)
            .select('reviews')
            .exec( (err, location)=> {
                if(err){
                    res
                    .status(400)
                    .json(err);

                }else{
                    doAddReview(req, res, location);
                }
            })
    }else{
        res
        .status(404)
        .json({"message":"Location not found"})

    }
    
 };


const reviewsReadOne = (req, res) => {
    Parchi
    .findById(req.params.locationid)
    .select('name reviews')
    .exec( (err, response) => {
        if(!response){
            return res
                .status(404)
                .json({"message": "Location not found"});
        }else if(error){
            return res
                .status(404)
                .json(err);
        }
        //Check, does the returned loc have reviews?
        if(response.reviews && location.reviews.length > 0){
            const review = response.reviews.id(req.params.reviewid);
            
            //Review not found
            if(!response){
                return res
                    .status(404)
                    .json({"message": "Review not found"});

            }else{
                //json to send back
                tmp = {location: {
                    name:location.name,
                    id: req.params.locationid},
                    review
                };
                return res
                    .status(200)
                    .json(tmp)
            }
        }else{
            //No reviews are found
            res
                .status(404)
                .json({"message":"No reviews found"})
        }
        //Finding the document
        if(location.reviews && location.reviews.length >0){
            const thisReview = location.reviews.id(req.params.reviewid);
            
            //Checking the review
            if(!thisReview){
                res
                    .status(404)
                    .json({"message":"Review not found"});
            }else{
                thisReview.author = req.body.author;
                thisReview.rating = req.body.rating;
                thisReview.reviewText = req.body.reviewText;

                //saving the doc
                Parchi.save( (err, location)=> {
                    if(err){
                        res
                            .status(404)
                            .json(err);
                    }else{
                        updateAverageRating(location._id);
                        res
                            .status(200)
                            .json(thisReview);
                    }
                } );
            }

        }else{
            res
                .status(404)
                .json({"message":"No review to update"});
        }
    })
    };
        
const reviewsUpdateOne = (req, res) => {
    if(!req.params.locationid || !req.params.reviewid){
        return res
                    .status(404)
                    .json({"message": "locationID and reviewId missing "});
    }
    Parchi.
        findById( req.params.locationid)
        .select('reviews')
        .exec( (err, location)=> {
            if(!location){
                return res
                        .status(404)
                        .json({"message": "Location not found"});
            }else if (err){
                return res
                            .status(400)
                            .json(err)      
            }
            
        
        })
    };

const reviewsDeleteOne = (req, res) => {
    const {locationid, reviewid} = req.params;

    if(!locationid && !reviewid){
        return res.status(404)
            .json({"message": "LocationId and ReviewID are both required!"});
    }
    Parchi.findById(locationid)
        .select('reviews')
        .exec( (err, loc)=>{
            if(!loc){
                return res
                        .status(404)
                        .json({"message": "Location not found"});
            }else if (err){
                return res
                            .status(400)
                            .json(err)      
            }

            if(loc.reviews && loc.reviews.length > 0){
                if(!loc.reviews.id(reviewid)){
                    return res
                    .status(404)
                    .json({"message": "review not found"});

                }else{
                    location.reviews.id(reviewid).remove();
                    locatio.save( err => {
                        if (err){
                            return res
                                .status(404)
                                .json(err);
                        }else{
                            updateAverageRating(location._id);
                            res
                                .status(204)
                                .json(null);
                        }
                    })
                }
            }else{
                res.status(404)
                .json({"message": "No review to Delete"});
            }

        });
 };

//Adding a review to MongoDB 
const doAddReview = (req, res, location) => {
    console.log("Do add review from API");
    console.log(location);
    if(!location){
        res
            .status(404)
            .json({"message": "Location not found"});
    }else{
        const {author, rating, reviewText}= req.body;

        console.log(location);
        //Trying to push into a subdocument
        location.reviews.push({
            author,
            rating,
            reviewText
        });

        location.save((err, location) => {
            if(err){
                res
                    .status(404)
                    .json(err);
            }else{
                updateAverageRating(location._id);
                
                //Last review poped
                const thisReview = location.reviews.slice(-1).pop();
                res
                    .status(201)
                    .json(thisReview);
            }
        });
    }

};

//Average rating, function helper used in updateAverageRating
const doSetAverageRating = (location)=> {
    if(location.reviews && location.reviews.length > 0){
        const count = location.reviews.length;
        const total= location.reviews.reduce((acc, {rating})=>{
            return acc + rating;
        },0);

        location.rating = parseInt(total/count, 10);
        location.save( err => {
            if(err){
                console.log(err)
            }else{
                console.log("Average rating updated to: "+ location.rating);
            }
        })
    }
};

const updateAverageRating = (locationID) => {
    Parchi
        .findById(locationID)
        .select('rating reviews')
        .exec( (err, location )=> {
            if(!err){
                doSetAverageRating(location);
            }
        })
    
};

module.exports= {
    reviewsCreate,
    reviewsReadOne,
    reviewsUpdateOne,
    reviewsDeleteOne
};