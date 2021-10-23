var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
});

router.get('/getAll', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  res.json({message: "ceva returned"});
});

module.exports = router;
