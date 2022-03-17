const db = require("../models")

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

// Retrieve all the roles from the database.
exports.getAllRoles = async (req, res) => {
    return await db.roles.findAll({raw: true})
}