const dbConfig = require("../config/db.config.js")

const Sequelize = require("sequelize")
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  logging: console.log,
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
})

const db = {};

db.sequelize = sequelize
db.Sequelize = Sequelize

db.users = require("./User.js") (sequelize, Sequelize)
db.roles = require("./Role.js") (sequelize, Sequelize)
db.faculties = require("./Faculty.js") (sequelize, Sequelize)
db.posts = require("./Post.js") (sequelize, Sequelize)
db.friendships = require("./Friendship.js") (sequelize, Sequelize)
db.userInterests = require("./UserInterest.js") (sequelize, Sequelize)
db.postTags = require("./PostTag.js") (sequelize, Sequelize)
db.postLikes = require("./PostLike.js") (sequelize, Sequelize)

db.users.role = db.users.belongsTo(db.roles)
db.users.faculty = db.users.belongsTo(db.faculties)
db.posts.user = db.posts.belongsTo(db.users)
db.userInterests.user = db.userInterests.belongsTo(db.users)
db.friendships.users = db.friendships.belongsTo(db.users)
db.postTags.post = db.postTags.belongsTo(db.posts)
db.postLikes.post = db.postLikes.belongsTo(db.posts)
db.postLikes.user = db.postLikes.belongsTo(db.users)

db.roles.users = db.roles.hasMany(db.users)
db.faculties.users = db.faculties.hasMany(db.users)
db.users.posts = db.users.hasMany(db.posts)
db.users.userInterests = db.users.hasMany(db.userInterests)
db.users.friendships = db.users.hasMany(db.friendships)
db.posts.postTags = db.posts.hasMany(db.postTags)
db.posts.postLikes = db.posts.hasMany(db.postLikes)
db.users.postLikes = db.users.hasMany(db.postLikes)

db.ROLES = ["student", "profesor"];

module.exports = db;