var express = require('express');
var router = express.Router();

const { authJwt } = require("../middleware")
const newsFeedController = require("../controllers/NewsFeedController")
const utilsController = require("../controllers/UtilsController")

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
});

router.get('/getAll', function(req, res, next) {
  newsFeedController.findAll().then(users => {
    res.json(users)
  }).catch(err => {
    return res.status(400).json( {err} )
  })
});

router.get('/getAllFaculties', function(req, res, next) {
  utilsController.getAllFaculties().then(faculties => {
    res.json(faculties)
  }).catch(err => {
    return res.status(400).json( {err} )
  })
});

router.get('/getInterestsByUser/:userId', function(req, res, next) {
  utilsController.getInterestsByUser(req).then(interests => {
    res.json(interests)
  }).catch(err => {
    return res.status(400).json( {err} )
  })
});

router.post('/getPostsAndEventsCount', authJwt.verifyToken, function(req, res, next) {
  utilsController.getPostsAndEventsCount().then(count => {
    res.json(count)
  }).catch(err => {
    return res.status(400).json( {err} )
  })
});

router.get('/getAllRoles', function(req, res, next) {
  utilsController.getAllRoles().then(roles => {
    res.json(roles)
  }).catch(err => {
    return res.status(400).json( {err} )
  })
});

module.exports = router;
