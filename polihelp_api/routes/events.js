let express = require('express')
let router = express.Router()

const { authJwt } = require("../middleware")
const eventsController = require("../controllers/EventsController")

router.post('/createEvent', authJwt.verifyToken, function(req, res, next) {
    eventsController.createEvent(req).then((response) => {
        res.json(response)
    })
})

router.post('/getUserEvents/:authorId', authJwt.verifyToken, function(req, res, next) {
    eventsController.getUserEvents(req).then((response) => {
        res.json(response)
    })
})

router.post('/joinEvent/:eventId', authJwt.verifyToken, function(req, res, next) {
    eventsController.joinEvent(req).then((response) => {
        res.json(response)
    })
})

router.post('/getNrOfEvents/:userId', authJwt.verifyToken, function(req, res, next) {
    eventsController.getNrOfEvents(req).then((response) => {
        res.json(response)
    })
})

router.post('/getJoinedEvents/:userId', authJwt.verifyToken, function(req, res, next) {
    eventsController.getJoinedEvents(req).then((response) => {
        res.json(response)
    })
})

router.post('/removeJoinedEvent', authJwt.verifyToken, function(req, res, next) {
    eventsController.removeJoinedEvent(req).then((response) => {
        res.json(response)
    })
})

router.post('/getNewsFeedEvents', authJwt.verifyToken, function(req, res, next) {
    eventsController.getNewsFeedEvents(req).then((response) => {
        res.json(response)
    })
})

router.post('/deleteEvent/:eventId', authJwt.verifyToken, function(req, res, next) {
    eventsController.deleteEvent(req).then((response) => {
        res.json(response)
    })
})

module.exports = router