var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Javascript' , number:78});
});
router.get('/signup', function(req, res,) {
  res.render("signup",{});
});



module.exports = router;                  

