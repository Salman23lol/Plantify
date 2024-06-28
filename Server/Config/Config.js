require('dotenv').config()

module.exports = {
    jwtSecret:process.env.JWT,
    Mongo_uri:process.env.MONGODB,
    port:process.env.PORT,
}