var express = require('express');
var router = express.Router();

const ctrlLocations= require('../controllers/locations');
const ctrlOthers= require('../controllers/others');



//Location Pages
router.get('/', ctrlLocations.homeList);
router.get('/location', ctrlLocations.locationInfo);
router.get('/location/:locationid', ctrlLocations.locationInfo);
router.get('/location/:locationid/review/new', ctrlLocations.addReview);
router.post('/location/:locationid/review/new', ctrlLocations.doAddReview);

//Other pages
router.get('/about', ctrlOthers.about);

module.exports = router;


