const db = require("../models")

// Retrieve all the roles from the database.
exports.getAllRoles = async (req, res) => {
    return await db.roles.findAll({raw: true})
}

// Retrieve all the faculties from the database.
exports.getAllFaculties = async (req, res) => {
    return await db.faculties.findAll({raw: true})
}