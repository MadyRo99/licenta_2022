const db = require("../models")
const config = require("../config/auth/config")
const _ = require("lodash")
const User = db.users
const Faculty = db.faculties
const UserInterest = db.userInterests
const Friendships = db.friendships
const { Sequelize } = require("sequelize")
const { QueryTypes } = require('sequelize')
const { Op } = require('@sequelize/core');

let jwt = require("jsonwebtoken")
let bcrypt = require("bcryptjs")

exports.getUser = (req) => {
    return User.findOne({
        include: Faculty,
        where: {
            id: req.params.userId
        }
    }).then(user => {
        if (!user) {
            return {
                success: false,
                data: null,
                message: "Utilizatorul nu a putut fi gasit"
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
            faculty: user.faculty,
            profileImage: user.profileImage ? user.profileImage : "https://imagini-profil.s3.eu-central-1.amazonaws.com/defaultUserImage.png"
        }

        return Friendships.findOne({
            where: {
                [Op.or]: [
                    {
                        firstUserId: {
                            [Op.eq]: parseInt(req.params.userId)
                        },
                        secondUserId: {
                            [Op.eq]: parseInt(req.body.authUser)
                        }
                    },
                    {
                        firstUserId: {
                            [Op.eq]: parseInt(req.body.authUser)
                        },
                        secondUserId: {
                            [Op.eq]: parseInt(req.params.userId)
                        }
                    }
                ]
            },
            raw: true
        }).then(friendship => {
            let friendshipData
            if (friendship) {
                friendshipData = {
                    exists: true,
                    approved: !!friendship.approveDate
                }
            } else {
                friendshipData = {
                    exists: false,
                    approved: false
                }
            }

            userDetails = {...userDetails, friendshipData: friendshipData}

            return {
                success: true,
                userDetails: userDetails,
                message: "Utilizatorul a fost returnat cu succes!"
            }
        }).catch(error => {
            return {
                success: false,
                message: "Utilizatorul nu a putut fi retras din baza de date!"
            }
        })
    }).catch(err => {
        return {
            success: false,
            message: "Utilizatorul nu a putut fi retras din baza de date!"
        }
    })
}

exports.removeFriend = (req) => {
    return Friendships.destroy({
        where: {
            [Op.or]: [
                {
                    firstUserId: {
                        [Op.eq]: parseInt(req.body.removeFriendUserId)
                    },
                    secondUserId: {
                        [Op.eq]: parseInt(req.body.authUserId)
                    }
                },
                {
                    firstUserId: {
                        [Op.eq]: parseInt(req.body.authUserId)
                    },
                    secondUserId: {
                        [Op.eq]: parseInt(req.body.removeFriendUserId)
                    }
                }
            ]
        }
    }).then(() => {
        return {
            success: true,
            message: "Prietenia a fost anulata cu succes"
        }
    }).catch(() => {
        return {
            success: false,
            message: "Prietenia nu a putut fi stearsa"
        }
    })
}

exports.getNrOfFriends = (req) => {
    return Friendships.count({
        where: {
            [Op.or]: [
                {
                    firstUserId: {
                        [Op.eq]: parseInt(req.params.userId)
                    },
                    approveDate: {
                        [Op.not]: null
                    },
                },
                {
                    secondUserId: {
                        [Op.eq]: parseInt(req.params.userId)
                    },
                    approveDate: {
                        [Op.not]: null
                    },
                }
            ]
        }
    }).then(count => {
        return {
            success: true,
            data: count,
            message: "Numarul de prieteni a fost retras cu succes"
        }
    }).catch(() => {
        return {
            success: false,
            message: "Numarul de prieteni nu a putut fi retras cu succes!"
        }
    })
}

exports.getFriends = (req) => {
    return Friendships.findAll({
        where: {
            [Op.or]: [
                {
                    firstUserId: {
                        [Op.eq]: parseInt(req.params.userId)
                    },
                    approveDate: {
                        [Op.not]: null
                    },
                },
                {
                    secondUserId: {
                        [Op.eq]: parseInt(req.params.userId)
                    },
                    approveDate: {
                        [Op.not]: null
                    },
                }
            ]
        },
        attributes: ["firstUserId", "secondUserId"],
        raw: true
    }).then(friendships => {
        let usersIds = []
        if (!_.isEmpty(friendships)) {
            _.forEach(friendships, (friend) => {
                if (friend.firstUserId != req.params.userId) {
                    usersIds.push(friend.firstUserId)
                } else if (friend.secondUserId != req.params.userId) {
                    usersIds.push(friend.secondUserId)
                }
            })

            return User.findAll({
                where: {
                    id: usersIds
                },
                attributes: ['id', 'firstName', 'lastName', 'profileImage'],
                raw: true
            }).then((users) => {
                if (!_.isEmpty(users)) {
                    return {
                        success: true,
                        data: users,
                        message: "Prietenii au fost gasiti cu succes"
                    }
                }

                return {
                    success: false,
                    message: "A aparut o problema la gasirea prietenilor"
                }
            })
        }

        return {
            success: true,
            data: [],
            message: "Nu exista prieteni pentru utilizator selectat"
        }
    }).catch(() => {
        return {
            success: false,
            message: "Lista de prieteni nu a putut fi retrasa cu succes!"
        }
    })
}

exports.getFriendRequests = async (req) => {
    let sql = "SELECT \"friendships\".\"id\" AS \"friendshipId\", \"users\".\"id\", \"users\".\"firstName\", \"users\".\"lastName\", \"users\".\"profileImage\" FROM \"users\" JOIN \"friendships\" ON \"friendships\".\"firstUserId\" = \"users\".\"id\" WHERE \"friendships\".\"approveDate\" IS NULL AND \"friendships\".\"secondUserId\" = " + req.params.userId + ";"
    let friendRequests = await db.sequelize.query(sql, {type: QueryTypes.SELECT})

    return {
        success: true,
        data: friendRequests,
        message: "Lista cu cereri de prietenie a fost returnata cu succes"
    }
}

exports.addFriend = (req) => {
    if (req.body.isDelete === true) {
        return Friendships.destroy({
            where: {
                [Op.or]: [
                    {
                        firstUserId: {
                            [Op.eq]: parseInt(req.body.addFriendUserId)
                        },
                        secondUserId: {
                            [Op.eq]: parseInt(req.body.authUserId)
                        }
                    },
                    {
                        firstUserId: {
                            [Op.eq]: parseInt(req.body.authUserId)
                        },
                        secondUserId: {
                            [Op.eq]: parseInt(req.body.addFriendUserId)
                        }
                    }
                ]
            }
        }).then(() => {
            return {
                success: true,
                message: "Prietenia a fost anulata cu succes"
            }
        })
    } else {
        let addFriend = Friendships.build({
            firstUserId: parseInt(req.body.authUserId),
            secondUserId: parseInt(req.body.addFriendUserId),
            requestDate: new Date().toISOString(),
            approveDate: null,
            deniedDate: null
        })

        return addFriend.save().then((result) => {
            if (!_.isNil(result)) {
                return {
                    success: true,
                    message: "Utilizatorul a fost adaugat la prieteni cu succes!"
                }
            } else {
                return {
                    success: false,
                    message: "A aparut o eroare la trimiterea cererii de prietenie."
                }
            }
        }).catch(() => {
            return {
                success: false,
                message: "A aparut o eroare la trimiterea cererii de prietenie."
            }
        })
    }
}

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
            facultyId: req.body.facultyId
        }

        let createUser = User.build({
            ...userDetails,
            password: bcrypt.hashSync(req.body.password, 8)
        })

        return createUser.save().then((result) => {
            if (!_.isNil(result)) {
                return Faculty.findByPk(req.body.facultyId, {raw: true}).then((faculty) => {
                    if (_.isNil(faculty)) {
                        return {
                            success: false,
                            message: "A aparut o problema pe parcursul inregistrarii utilizatorului."
                        }
                    } else {
                        userDetails = {
                            ...userDetails,
                            id: result.id,
                            faculty: faculty,
                            profileImage: "https://imagini-profil.s3.eu-central-1.amazonaws.com/defaultUserImage.png"
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
                            message: "Utilizatorul a fost creat cu succes!"
                        }
                    }
                }).catch(() => {
                    return {
                        success: false,
                        message: "A aparut o problema pe parcursul inregistrarii utilizatorului."
                    }
                })
            } else {
                return {
                    success: false,
                    message: "A aparut o problema pe parcursul inregistrarii utilizatorului."
                }
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

exports.signin = (req) => {
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
            faculty: user.faculty,
            profileImage: user.profileImage ? user.profileImage : "https://imagini-profil.s3.eu-central-1.amazonaws.com/defaultUserImage.png"
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

exports.uploadProfileImage = (req, imageDetails) => {
    return User.findOne({
        where: {
            id: req.body.userId
        }
    }).then(user => {
        if (!user) {
            return {
                success: false,
                data: null,
                message: "Utilizatorul nu a putut fi gasit."
            }
        }

        let profileImageName = "https://imagini-profil.s3.eu-central-1.amazonaws.com/" + imageDetails.key

        return User.update({profileImage: profileImageName}, {
            where: {
                id: req.body.userId
            },
            returning: true,
            plain: true
        }).then(() => {
            return {
                success: true,
                profileImage: profileImageName,
                message: "Imaginea utilizatorului a fost schimbata cu succes."
            }
        }).catch(() => {
            return {
                success: false,
                message: "Imaginea utilizatorului nu a putut fi actualizata."
            }
        })
    })
}

exports.update = (req) => {
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
                            faculty: faculty,
                            profileImage: user.profileImage ? user.profileImage : "https://imagini-profil.s3.eu-central-1.amazonaws.com/defaultUserImage.png"
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
                }).catch(() => {
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

exports.updateInterests = (req) => {
    return UserInterest.destroy({
        where: {
            userId: req.body.userId
        }
    }).then(() => {
        let newInterests = req.body.interests.map((interest, index) => ({ interest: interest, userId: req.body.userId }))
        return UserInterest.bulkCreate(newInterests).then((rs) => {
            return {
                success: true,
                message: "Actualizarea intereselor a fost realizata cu succes."
            }
        }).catch(err => {
            return {
                success: false,
                data: null,
                message: err.message
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

exports.acceptFriendRequest = (req) => {
    return Friendships.update({approveDate: Sequelize.fn('NOW')}, {
        where: {
            id: req.body.friendshipId
        }
    }).then(() => {
        return {
            success: true,
            message: "Cererea de prietenie a fost acceptata cu succes."
        }
    }).catch(() => {
        return {
            success: false,
            message: "A aparut o eroare in timpul acceptarii cererii de prietenie"
        }
    })
}

exports.rejectFriendRequest = (req) => {
    return Friendships.destroy({
        where: {
            id: req.body.friendshipId
        }
    }).then(() => {
        return {
            success: true,
            message: "Cererea de prietenie a fost refuzata cu succes."
        }
    }).catch(() => {
        return {
            success: false,
            message: "A aparut o eroare in timpul refuzarii cererii de prietenie"
        }
    })
}