const db = require("../models")
const { Sequelize } = require("sequelize");
const { QueryTypes } = require('sequelize');
const _ = require("lodash")
const Post = db.posts
const PostLikes = db.postLikes

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
        return {
            success: false,
            message: "A aparut o eroare in timpul postarii."
        }
    })
}

exports.getNewsFeedPosts = async (req) => {
    let sql = "SELECT \"posts\".\"id\" AS \"id\", \"posts\".\"content\", \"posts\".\"createdAt\", \"users\".\"id\" AS \"authorId\", \"users\".\"firstName\", \"users\".\"lastName\", \"users\".\"facultyId\", \"users\".\"roleId\", \"users\".\"year\" FROM \"posts\" JOIN \"users\" ON \"posts\".\"authorId\" = \"users\".\"id\" ORDER BY \"posts\".\"createdAt\" DESC offset " + req.body.offset + " limit 5;"
    let posts = await db.sequelize.query(sql, {type: QueryTypes.SELECT})

    return Promise.all(posts.map(post =>
        PostLikes.findAll({
            where: {
                postId: post.id
            },
            raw: true
        }).then(postLikes => {
            let index = posts.map(function(e) { return e.id; }).indexOf(post.id);
            posts[index].userLikes = postLikes
            return post
        }).catch(err => {
            console.log("Eroare la selectarea like-urilor: " + err)
        })))
}

exports.likePost = (req) => {
    return PostLikes.findAll({
        where: {
            userId: req.body.userId,
            postId: req.params.postId
        }
    }).then(likes => {
        if (likes.length) {
            PostLikes.destroy({
                where: {
                    userId: req.body.userId,
                    postId: req.params.postId
                }
            })

            return {
                success: true,
                liked: false,
                message: "Stergerea aprecierii postarii a fost realizata cu succes."
            }
        } else {
            let createPostLike = PostLikes.build({
                userId: req.body.userId,
                postId: req.params.postId
            })

            return createPostLike.save().then(() => {
                return {
                    success: true,
                    liked: true,
                    message: "Postarea a fost apreciata cu succes."
                }
            }).catch((err) => {
                return {
                    success: false,
                    message: "A aparut o eroare in timpul aprecierii postarii."
                }
            })
        }
    })
}

exports.deletePost = (req) => {
    return PostLikes.destroy({
        where: {
            postId: req.params.postId
        }
    }).then(() => {
        return Post.destroy({
            where: {
                id: req.params.postId
            }
        }).then(() => {
            return {
                success: true,
                liked: false,
                message: "Postarea a fost stearsa cu succes."
            }
        })
    })
}

exports.getUserPosts = (req) => {
    return Post.findAll({
        where: {
            authorId: req.params.authorId,
        },
        order: [
            ['createdAt', 'DESC']
        ],
        attributes: {
            include: [
                [
                    Sequelize.fn("COUNT", Sequelize.col("post_likes.postId")), "postLikes"
                ]
            ]
        },
        include: [{
            model: PostLikes, attributes: []
        }],
        group: ['post.id'],
        raw: true
    }).then((posts) => {
        return PostLikes.findAll({
            attributes: ['postId', 'userId'],
            where: {
                userId: req.body.userId
            },
            raw: true
        }).then(postLikes => {
            return {
                success: true,
                postDetails: posts,
                userLikes: postLikes,
                message: "Postarile utilizatorului au fost returnate cu succes!"
            }
        }).catch(err => {

        })
    })
}