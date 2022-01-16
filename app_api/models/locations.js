const mongoose = require('mongoose');


const reviewSchema= new mongoose.Schema({
    author: {type: String, required: true},
    rating: {
        type:Number,
        'default':0,
        required: true, 
        min:0,
        max:5},
    reviewText: {type: String, required: true},
    createdOn:{
        type:Date,
        'default':Date.now
    }
});

const locationSchema= new mongoose.Schema({
    name:{type:String, required:true},
    address:String,
    rating: {
        type:Number,
        'default':0, 
        min:0,
        max:5},
    facilities: [String],
    coord: {
        type:String,
        coordinates: [Number]
    },
    reviews: [reviewSchema]
});


locationSchema.index({coords: '2dsphere'});

mongoose.model('Location', locationSchema, 'Locations');