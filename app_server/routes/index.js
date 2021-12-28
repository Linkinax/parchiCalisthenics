var express = require('express');
var router = express.Router();
const ctrlMain= require('../controllers/main');



const homePageController = (req, res) =>{
  res.render('index' , {title: "Express" });
}

/* GET home page. */
router.get('/', ctrlMain.index);

module.exports = router;
