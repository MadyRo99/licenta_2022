let express = require('express')
let router = express.Router()

const { authJwt } = require("../middleware")
const authController = require("../controllers/AuthenticationController")

router.post('/getUser/:userId', authJwt.verifyToken, function(req, res, next) {
  authController.getUser(req).then((response) => {
    res.json(response)
  })
})

router.post('/signup', function(req, res, next) {
  authController.signup(req).then((response) => {
    res.json(response)
  })
})

router.post('/signin', function(req, res, next) {
  authController.signin(req).then((response) => {
    res.json(response)
  })
})

router.post('/update', authJwt.verifyToken, function(req, res, next) {
  authController.update(req).then((response) => {
    res.json(response)
  })
})

router.post('/updateInterests', authJwt.verifyToken, function(req, res, next) {
  authController.updateInterests(req).then((response) => {
    res.json(response)
  })
})

router.post('/addFriend', authJwt.verifyToken, function(req, res, next) {
  authController.addFriend(req).then((response) => {
    res.json(response)
  })
})

router.post('/removeFriend', authJwt.verifyToken, function(req, res, next) {
  authController.removeFriend(req).then((response) => {
    res.json(response)
  })
})

router.post('/getNrOfFriends/:userId', authJwt.verifyToken, function(req, res, next) {
  authController.getNrOfFriends(req).then((response) => {
    res.json(response)
  })
})

router.post('/getFriends/:userId', authJwt.verifyToken, function(req, res, next) {
  authController.getFriends(req).then((response) => {
    res.json(response)
  })
})

module.exports = router
