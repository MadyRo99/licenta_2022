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

router.post('/deleteEvent/:eventId', authJwt.verifyToken, function(req, res, next) {
    eventsController.deleteEvent(req).then((response) => {
        res.json(response)
    })
})

module.exports = router