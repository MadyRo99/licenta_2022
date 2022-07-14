const db = require("../models")
const Post = db.posts
const Event = db.events

// Retrieve all the faculties from the database.
exports.getAllFaculties = async (req, res) => {
    return await db.faculties.findAll({raw: true})
}

// Retrieve all the user interests from the database.
exports.getInterestsByUser = async (req, res) => {
    return await db.userInterests.findAll({
        attributes: ['interest'],
        where: {
            userId: req.params.userId,
        },
        raw: true
    })
}

exports.getPostsAndEventsCount = async () => {
    return Event.count({}).then(countEvents => {
        return Post.count({}).then(countPosts => {
            return {
                success: true,
                countPosts: countPosts,
                countEvents: countEvents,
                message: "Numarul de postari si evenimente a fost retras cu succes!"
            }
        })
    })
}

// Retrieve all the roles from the database.
exports.getAllRoles = async (req, res) => {
    return await db.roles.findAll({raw: true})
}