module.exports = {
    HOST: "0.0.0.0",
    USER: "postgres",
    PASSWORD: "Welcome",
    DB: "licenta",
    dialect: "postgres",
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};