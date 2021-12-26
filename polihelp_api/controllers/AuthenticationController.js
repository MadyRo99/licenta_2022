const db = require("../models")
const config = require("../config/auth/config")
const _ = require("lodash")
const User = db.users

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
            gender: req.body.gender,
            year: req.body.year,
            status: 1,
            roleId: req.body.roleId,
            facultyId: req.body.facultyId
        }

        let createUser = User.build({
            ...userDetails,
            password: bcrypt.hashSync(req.body.password, 8)
        })

        return createUser.save().then((result) => {
            let token = jwt.sign({
                id: result.id,
                ...userDetails
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
            gender: user.gender,
            year: user.year,
            status: user.status,
            roleId: user.roleId,
            facultyId: user.facultyId
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