const novels = (connection, Sequelize, authors) => {
  return connection.define('novels', {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    title: { type: Sequelize.STRING },
    authorId: { type: Sequelize.INTEGER, references: { model: authors, key: 'id' } },
  }, { paranoid: true })
}

module.exports = novels
