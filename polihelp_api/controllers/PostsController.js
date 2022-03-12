const db = require("../models")
const Post = db.posts

exports.createPost = (req) => {
    let createPost = Post.build({
        authorId: req.userId,
        content: req.body.content
    })

    return createPost.save().then(() => {
        return {
            success: true,
            message: "Postarea a fost adaugata cu succes."
        }
    }).catch((err) => {
        console.log(err)
        return {
            success: false,
            message: "A aparut o eroare in timpul postarii."
        }
    })
}