let express = require('express')
let router = express.Router()

const { authJwt } = require("../middleware")
const postsController = require("../controllers/PostsController")

router.post('/createPost', authJwt.verifyToken, function(req, res, next) {
    postsController.createPost(req).then((response) => {
        res.json(response)
    })
})

module.exports = router