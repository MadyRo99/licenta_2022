const db = require("../models")
const config = require("../config/auth/config")
const _ = require("lodash")
const User = db.users
const Faculty = db.faculties

let jwt = require("jsonwebtoken")
let bcrypt = require("bcryptjs")

exports.signup = (req) => {
    return User.findAll({
        where: {email: req.body.email},
        attributes: ['id']
    }).then((user) => {
        if (!_.isEmpty(user)) {
            return {
                success: false,
                data: null,
                message: "Adresa de email este deja in folosinta!"
            }
        }

        let userDetails = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            year: req.body.year,
            status: 1,
            roleId: req.body.roleId,
        }

        let createUser = User.build({
            ...userDetails,
            password: bcrypt.hashSync(req.body.password, 8)
        })

        return createUser.save().then((result) => {
            let token = jwt.sign({
                id: result.id,
                ...userDetails,
                faculty: result.faculty
            }, config.secret, {
                expiresIn: 86400
            })

            return {
                success: true,
                userDetails: {
                    id: result.id,
                    ...userDetails
                },
                token: token,
                message: "Utilizatorul a fost creat cu succes!"
            }
        }).catch(() => {
            return {
                success: false,
                data: null,
                message: "A aparut o eroare la inregistrarea utilizatorului."
            }
        })
    })
}

exports.signin = (req, res) => {
    return User.findOne({
        include: Faculty,
        where: {
            email: req.body.email
        }
    }).then(user => {
        if (!user) {
            return {
                success: false,
                data: null,
                message: "Utilizatorul nu a putut fi gasit."
            }
        }

        let passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        )

        if (!passwordIsValid) {
            return {
                success: false,
                data: null,
                message: "Numele de utilizator sau parola introdusa este gresita."
            }
        }

        let userDetails = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            year: user.year,
            status: user.status,
            roleId: user.roleId,
            faculty: user.faculty
        }

        let token = jwt.sign({
            ...userDetails
        }, config.secret, {
            expiresIn: 86400
        })

        return {
            success: true,
            userDetails: userDetails,
            token: token,
            message: "Autentificarea a fost realizata cu succes."
        }
    }).catch(err => {
        return {
            success: false,
            data: null,
            message: err.message
        }
    })
}

exports.update = (req, res) => {
    return User.findOne({
        where: {
            id: req.body.id
        }
    }).then(user => {
        if (!user) {
            return {
                success: false,
                data: null,
                message: "Utilizatorul nu a putut fi gasit."
            }
        }

        let userDetails = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            year: req.body.year,
            roleId: req.body.roleId,
            facultyId: req.body.facultyId
        }

        return User.update(userDetails, {
            where: {
                id: req.body.id
            },
            returning: true,
            plain: true
        }).then((updatedObject) => {
            if (!_.isNil(updatedObject)) {
                return Faculty.findByPk(userDetails.facultyId, {raw: true}).then((faculty) => {
                    if (_.isNil(faculty)) {
                        return {
                            success: false,
                            message: "A aparut o problema pe parcursul actualizarii profilului."
                        }
                    } else {
                        delete userDetails.facultyId

                        userDetails = {
                            ...userDetails,
                            id: user.id,
                            status: user.status,
                            faculty: faculty
                        }

                        let token = jwt.sign({
                            ...userDetails
                        }, config.secret, {
                            expiresIn: 86400
                        })

                        return {
                            success: true,
                            userDetails: userDetails,
                            token: token,
                            message: "Actualizarea profilului a fost realizata cu succes."
                        }
                    }
                }).catch(err => {
                    return {
                        success: false,
                        message: "A aparut o problema pe parcursul actualizarii profilului."
                    }
                })
            } else {
                return {
                    success: false,
                    message: "A aparut o problema pe parcursul actualizarii profilului."
                }
            }
        })
    }).catch(err => {
        return {
            success: false,
            data: null,
            message: err.message
        }
    })
}