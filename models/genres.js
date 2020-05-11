const genres = (connection, Sequelize, novels) => {
  return connection.define('genres', {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: Sequelize.STRING },
    novelId: { type: Sequelize.INTEGER, references: { model: novels, key: 'id' } }
  }, { paranoid: true })
}

module.exports = genres
