let express = require('express')
let router = express.Router()
const fs = require('fs')
const utils = require('../utils')
const { uploadFile } = require('../s3')

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

router.post('/uploadProfileImage', authJwt.verifyToken, async function(req, res, next) {
  let imageBase64Data = req.body.image.replace(/^data:image\/png;base64,/, "");
  let fileName = utils.generateRandomName() + "." + req.body.fileExtension
  let filePath = "uploads/" + fileName
  fs.writeFile(filePath, imageBase64Data, 'base64', async function(err) {
    const result = await uploadFile(filePath, fileName, "profile")
    if (result.Key != null) {
      authController.uploadProfileImage(req, result).then((response) => {
        res.json(response)
      })
    }
  });
})

router.post('/getFriends/:userId', authJwt.verifyToken, function(req, res, next) {
  authController.getFriends(req).then((response) => {
    res.json(response)
  })
})

router.post('/getFriendRequests/:userId', authJwt.verifyToken, function(req, res, next) {
  authController.getFriendRequests(req).then((response) => {
    res.json(response)
  })
})

router.post('/acceptFriendRequest', authJwt.verifyToken, function(req, res, next) {
  authController.acceptFriendRequest(req).then((response) => {
    res.json(response)
  })
})

router.post('/rejectFriendRequest', authJwt.verifyToken, function(req, res, next) {
  authController.rejectFriendRequest(req).then((response) => {
    res.json(response)
  })
})

module.exports = router
