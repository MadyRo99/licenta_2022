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
                message: "Adresa de email este deja in folosinta!"
            }
        }

        let createUser = User.build({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8),
            gender: req.body.gender,
            year: req.body.year,
            roleId: req.body.roleId,
            facultyId: req.body.facultyId
        })

        return createUser.save().then(() => {
            return {
                success: true,
                message: "Utilizatorul a fost creat cu succes!"
            }
        }).catch(() => {
            return {
                success: false,
                message: "A aparut o eroare la inregistrarea utilizatorului."
            }
        })
    })
}

exports.signin = (req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(user => {
        if (!user) {
            return res.status(404).send({ message: "Utilizatorul nu a putut fi gasit." })
        }

        let passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        )

        if (!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: "Parola este greșită."
            })
        }

        let token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 86400 // 24 hours
        })

        let authorities = []
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                authorities.push("ROLE_" + roles[i].name.toUpperCase())
            }

            res.status(200).send({
                id: user.id,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                city: req.body.city,
                email: user.email,
                roles: authorities,
                accessToken: token
            })
        })
    }).catch(err => {
        res.status(500).send({ message: err.message })
    })
}