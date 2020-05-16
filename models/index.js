const Sequelize = require('sequelize')
const allConfigs = require('../config/sequelize')
const novelsModel = require('./novels')
const authorsModel = require('./authors')
const genresModel = require('./genres')
const novelsGenresModel = require('./novelsGenres')

const enviroment = process.env.NODE_ENV || 'development'
const config = allConfigs[enviroment]

const connection = new Sequelize(config.database, config.username, config.password, {
  host: config.host, dialect: config.dialect
})

const Authors = authorsModel(connection, Sequelize)
const Novels = novelsModel(connection, Sequelize, Authors)
const Genres = genresModel(connection, Sequelize, Novels)
const NovelsGenres = novelsGenresModel(connection, Sequelize, Genres, Novels)

Authors.hasMany(Novels)
Novels.belongsTo(Authors)

Novels.belongsToMany(Genres, { through: NovelsGenres })
Genres.belongsToMany(Novels, { through: NovelsGenres })

module.exports = {
  Authors,
  Novels,
  Genres,
  NovelsGenres,
  Op: Sequelize.Op
}
