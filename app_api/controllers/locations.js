const mongoose = require('mongoose');
const Parchi = mongoose.model('Location');

//PlaceHolder functions to build the app w/o errors

const locationsCreate = (req, res) => {
    res
        .status(200)
        .json({"status":"success"})
 };
const locationsReadOne = (req, res) => {
    res
        .status(200)
        .json({"status":"success"})
 };
const locationsUpdateOne = (req, res) => { 
    res
        .status(200)
        .json({"status":"success"})
};
const locationsListByDistance = (req, res) => {
    res
        .status(200)
        .json({"status":"success"})
 };
const locationsDeleteOne = (req, res) => {
    res
        .status(200)
        .json({"status":"success"})
 };
 

module.exports= {
    locationsCreate,
    locationsReadOne,
    locationsUpdateOne,
    locationsDeleteOne,
    locationsListByDistance
}