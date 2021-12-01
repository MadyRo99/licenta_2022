const jwt = require("jsonwebtoken")
const config = require("../config/auth/config")
const db = require("../models")
const User = db.user

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"]

    if (!token) {
        return res.status(403).send({
            message: "Token-ul de autentificare nu a putut fi gasit!"
        })
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Accesul nu este permis!"
            })
        }

        req.userId = decoded.id
        next()
    })
}

isProfesor = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "profesor") {
                    next()
                    return
                }
            }

            res.status(403).send({
                message: "Acțiunea respectivă necesită rolul de profesor!"
            })
        })
    })
}

const authJwt = {
    verifyToken: verifyToken,
    isProfesor: isProfesor
}

module.exports = authJwt