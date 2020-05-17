const models = require('../models')

const getAllAuthors = async (request, response) => {
  try {
    const authors = await models.Authors.findAll({
      attributes: { exclude: ['deletedAt'] }
    })

    return response.send(authors)
  } catch (error) {
    return response.status(500).send('Unable to retrieve Authors, please try again')
  }
}

const getAuthorByIdentifierWithNovelAndGenres = async (request, response) => {
  try {
    const { indentifier } = request.params
    const AuthorById = await models.Authors.findOne({
      attributes: { exclude: ['deletedAt'] },
      where: {
        [models.Op.or]: [
          {
            id: indentifier
          },
          {
            nameFirst: { [models.Op.like]: `${indentifier}%` }
          },
          {
            nameLast: { [models.Op.like]: `${indentifier}%` },
          }],
      },
      include: [{
        attributes: { exclude: ['deletedAt'] },
        model: models.Novels,
        include: [{
          attributes: { exclude: ['deletedAt'] },
          model: models.Genres,
          through: {
            attributes: { exclude: ['deletedAt'] }
          }
        }],
      }]
    })

    return response.send(AuthorById)
  } catch (error) {
    return response.status(500).send('Unable to retrieve Author, please try again')
  }
}

module.exports = {
  getAllAuthors, getAuthorByIdentifierWithNovelAndGenres
}
