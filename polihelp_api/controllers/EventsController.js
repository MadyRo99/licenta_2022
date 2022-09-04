const db = require("../models")
const Event = db.events
const EventParticipants = db.eventParticipants
const { Sequelize } = require("sequelize")
const { QueryTypes } = require('sequelize')

exports.createEvent = (req, imageDetails) => {
    let eventImageName = null
    if (imageDetails.Key) {
        eventImageName = "https://imagini-eveniment.s3.eu-central-1.amazonaws.com/" + imageDetails.key
    }

    let createEvent = Event.build({
        name: req.body.name,
        authorId: req.body.authorId,
        location: req.body.location,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        image: eventImageName,
        content: req.body.content
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
        attributes: {
            include: [
                [
                    Sequelize.fn("COUNT", Sequelize.col("event_participants.eventId")), "eventParticipants"
                ]
            ]
        },
        include: [{
            model: EventParticipants, attributes: []
        }],
        group: ['event.id'],
        raw: true
    }).then((events) => {
        return EventParticipants.findAll({
            attributes: ['eventId', 'userId'],
            where: {
                userId: req.body.userId
            },
            raw: true
        }).then(userEvents => {
            return {
                success: true,
                eventDetails: events,
                userEvents: userEvents,
                message: "Evenimentele utilizatorului au fost retrase cu succes"
            }
        }).catch(() => {
            return {
                success: false,
                eventDetails: null,
                userEvents: null,
                message: "A aparut o problema la returnarea evenimentelor utilizatorului."
            }
        })
    }).catch(() => {
        return {
            success: false,
            postDetails: null,
            message: "A aparut o problema la returnarea evenimentelor create de utilizator."
        }
    })
}

exports.getNewsFeedEvents = async (req) => {
    let sql = "SELECT \"events\".\"id\" AS \"id\", \"events\".\"content\", \"events\".\"image\" AS \"image\", \"events\".\"createdAt\", \"events\".\"location\", \"events\".\"name\", \"events\".\"startDate\", \"events\".\"endDate\", \"users\".\"id\" AS \"authorId\", \"users\".\"firstName\", \"users\".\"lastName\", \"users\".\"facultyId\", \"users\".\"roleId\", \"users\".\"year\", \"users\".\"profileImage\", \"faculties\".\"name\" AS \"facultyName\", \"roles\".\"name\" AS \"roleName\" FROM \"events\" JOIN \"users\" ON \"events\".\"authorId\" = \"users\".\"id\" JOIN \"faculties\" ON \"users\".\"facultyId\" = \"faculties\".\"id\" JOIN \"roles\" ON \"users\".\"roleId\" = \"roles\".\"id\" ORDER BY \"events\".\"createdAt\" DESC offset " + req.body.offset + " limit 2;"
    let events = await db.sequelize.query(sql, {type: QueryTypes.SELECT})

    return Promise.all(events.map(theEvent =>
        EventParticipants.findAll({
            where: {
                eventId: theEvent.id
            },
            raw: true
        }).then(userEvents => {
            let index = events.map(function(e) { return e.id; }).indexOf(theEvent.id);
            events[index].userEvents = userEvents
            events[index].eventParticipants = userEvents.length.toString()
            return theEvent
        }).catch(err => {
            console.log("Eroare la selectarea participarilor: " + err)
        })))
}

exports.joinEvent = (req) => {
    return EventParticipants.findAll({
        where: {
            userId: req.body.userId,
            eventId: req.params.eventId
        }
    }).then(participants => {
        if (participants.length) {
            EventParticipants.destroy({
                where: {
                    userId: req.body.userId,
                    eventId: req.params.eventId
                }
            })

            return {
                success: true,
                joined: false,
                message: "Stergerea participarii la eveniment a fost realizata cu succes."
            }
        } else {
            let createEventParticipant = EventParticipants.build({
                userId: req.body.userId,
                eventId: req.params.eventId
            })

            return createEventParticipant.save().then(() => {
                return {
                    success: true,
                    joined: true,
                    message: "Participarea a fost inregistrata cu succes"
                }
            }).catch((err) => {
                return {
                    success: false,
                    message: "A aparut o eroare in timpul inregistrarii participarii."
                }
            })
        }
    })
}

exports.getNrOfEvents = (req) => {
    return EventParticipants.count({
        where: {
            userId: req.params.userId
        }
    }).then(count => {
        return {
            success: true,
            data: count,
            message: "Numarul de evenimente a fost retras cu succes"
        }
    }).catch(() => {
        return {
            success: false,
            message: "Numarul de evenimente nu a putut fi retras cu succes!"
        }
    })
}

exports.getJoinedEvents = async (req) => {
    let sql = "SELECT \"events\".\"id\", \"events\".\"authorId\", \"events\".\"name\", \"events\".\"location\", \"events\".\"startDate\", \"events\".\"endDate\" FROM \"events\" JOIN \"event_participants\" ON \"event_participants\".\"eventId\" = \"events\".\"id\" WHERE \"event_participants\".\"userId\" = " + req.params.userId + ";"
    let events = await db.sequelize.query(sql, {type: QueryTypes.SELECT})

    return {
        success: true,
        data: events,
        message: "Evenimentele au fost retrase cu succes."
    }
}

exports.removeJoinedEvent = (req) => {
    return EventParticipants.destroy({
        where: {
            userId: req.body.userId,
            eventId: req.body.eventId
        }
    }).then(() => {
        return {
            success: true,
            message: "Participarea la eveniment a fost stearsa cu succes."
        }
    }).catch(() => {
        return {
            success: false,
            message: "Participarea la eveniment nu a putut fi stearsa."
        }
    })
}

exports.deleteEvent = (req) => {
    return EventParticipants.destroy({
        where: {
            eventId: req.params.eventId
        }
    }).then(() => {
        return Event.destroy({
            where: {
                id: req.params.eventId
            }
        }).then(() => {
            return {
                success: true,
                joined: false,
                message: "Participarea la eveniment a fost stearsa cu succes."
            }
        })
    })
}