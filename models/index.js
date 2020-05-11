const Sequelize = require('sequelize')
const novelsModel = require('./novels')
const authorsModel = require('./authors')
const genresModel = require('./genres')
const novelsGenresModel = require('./novelsGenres')

const connection = new Sequelize('greatNovels', 'novels', 'N0v3Lz', {
  host: 'localhost', dialect: 'mysql'
})

const Authors = authorsModel(connection, Sequelize)
const Novels = novelsModel(connection, Sequelize, Authors)
const Genres = genresModel(connection, Sequelize, Novels)
const NovelsGenres = novelsGenresModel(connection, Sequelize, Genres, Novels)

Authors.hasMany(Novels)
Novels.belongsTo(Authors, { through: NovelsGenres })

Novels.belongsToMany(Genres, { through: NovelsGenres })
Genres.belongsToMany(Novels, { through: NovelsGenres })

module.exports = {
  Authors,
  Novels,
  Genres,
  NovelsGenres
}
