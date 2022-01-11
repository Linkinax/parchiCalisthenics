var express = require('express');
var router = express.Router();

const ctrlLocations= require('../controllers/locations');
const ctrlOthers= require('../controllers/others');



//Location Pages
router.get('/', ctrlLocations.homeList);
router.get('/location', ctrlLocations.locationInfo);
router.get('/location/:locationid', ctrlLocations.locationInfo);
router.get('/location/review/new', ctrlLocations.addReview);

//Other pages
router.get('/about', ctrlOthers.about);

module.exports = router;


