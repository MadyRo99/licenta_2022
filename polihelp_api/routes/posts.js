let express = require('express')
let router = express.Router()

const { authJwt } = require("../middleware")
const postsController = require("../controllers/PostsController")

router.post('/createPost', authJwt.verifyToken, function(req, res, next) {
    postsController.createPost(req).then((response) => {
        res.json(response)
    })
})

router.post('/getUserPosts/:authorId', authJwt.verifyToken, function(req, res, next) {
    postsController.getUserPosts(req).then((response) => {
        res.json(response)
    })
})

router.post('/likePost/:postId', authJwt.verifyToken, function(req, res, next) {
    postsController.likePost(req).then((response) => {
        res.json(response)
    })
})

router.post('/deletePost/:postId', authJwt.verifyToken, function(req, res, next) {
    postsController.deletePost(req).then((response) => {
        res.json(response)
    })
})

module.exports = router