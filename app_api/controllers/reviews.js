const mongoose = require('mongoose');
const Parchi = mongoose.model('Location');

//PlaceHolder functions to build the app w/o errors

const reviewsCreate = (req, res) => {
    const locationId = req.params.locationId;
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
const reviewsReadOne = (req, res) => {res
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
                //After finding a review we'll build a json to send back
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
    })
    };
        
const reviewsUpdateOne = (req, res) => {res
    .status(200)
    .json({"status":"success"}) };

    const reviewsDeleteOne = (req, res) => {
    res
        .status(200)
        .json({"status":"success"})
 };

//Adding a review to MongoDB 
const doAddReview = (req, res, location) => {
    if(!location){
        res
            .status(404)
            .json({"message": "Location not found"});
    }else{
        const {author, rating, reviewText}= req.body;
        //Trying to push into a subdocument
        location.push({
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
        })
    }

}

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
}

const updateAverageRating = (locationID) => {
    Parchi
        .findById(locationID)
        .select('rating reviews')
        .exec( (err, location )=> {
            if(!err){
                doSetAverageRating(location);
            }
        })
    
}

module.exports= {
    reviewsCreate,
    reviewsReadOne,
    reviewsUpdateOne,
    reviewsDeleteOne,
}   