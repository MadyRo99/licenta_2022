const db = require("../models")
const Event = db.events

exports.createEvent = (req) => {
    let createEvent = Event.build({
        name: req.body.name,
        authorId: req.body.authorId,
        location: req.body.location,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        content: req.body.content,
    })

    return createEvent.save().then(() => {
        return {
            success: true,
            message: "Evenimentul a fost adaugat cu succes."
        }
    }).catch((err) => {
        return {
            success: false,
            message: "A aparut o eroare in timpul adaugarii evenimentului."
        }
    })
}

exports.getUserEvents = (req) => {
    return Event.findAll({
        where: {
            authorId: req.params.authorId,
        },
        order: [
            ['createdAt', 'DESC']
        ],
        raw: true
    }).then((events) => {
        return {
            success: true,
            eventDetails: events,
            message: "Evenimentele create de utilizator au fost returnate cu succes!"
        }
    }).catch(() => {
        return {
            success: false,
            postDetails: null,
            message: "A aparut o problema la returnarea evenimentelor create de utilizator."
        }
    })
}

exports.deleteEvent = (req) => {
    return Event.destroy({
        where: {
            id: req.params.eventId
        }
    }).then(() => {
        return {
            success: true,
            message: "Evenimentul a fost stears cu succes."
        }
    })
    // return PostLikes.destroy({
    //     where: {
    //         postId: req.params.postId
    //     }
    // }).then(() => {
    //     return Post.destroy({
    //         where: {
    //             id: req.params.postId
    //         }
    //     }).then(() => {
    //         return {
    //             success: true,
    //             liked: false,
    //             message: "Postarea a fost stearsa cu succes."
    //         }
    //     })
    // })
}