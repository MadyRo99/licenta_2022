const db = require("../models")
const Roles = db.ROLES
const User = db.user

checkDuplicateEmail = (req, res, next) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(user => {
        if (user) {
            res.status(400).send({
                message: "Email-ul este deja folosit!"
            })

            return
        }

        next()
    })
}

checkRolesExisted = (req, res, next) => {
    if (req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) {
            if (!Roles.includes(req.body.roles[i])) {
                res.status(400).send({
                    message: "Eroare! Rolul nu există = " + req.body.roles[i]
                })

                return
            }
        }
    }

    next()
}

const verifySignUp = {
    checkDuplicateEmail: checkDuplicateEmail,
    checkRolesExisted: checkRolesExisted
}

module.exports = verifySignUp