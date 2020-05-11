const models = require('../models')

const getAllAuthors = async (request, response) => {
  try {
    const authors = await models.Authors.findAll({
      attributes: ['id', 'nameFirst', 'nameLast', 'createdAt', 'updatedAt']
    })

    return response.send(authors)
  } catch (error) {
    return response.status(500).send('Unable to retrieve Authors, please try again')
  }
}

const getAuthorByIdWithNovelAndGenres = async (request, response) => {
  try {
    const { id } = request.params
    const AuthorById = await models.Authors.findOne({
      attributes: ['id', 'nameFirst', 'nameLast', 'createdAt', 'updatedAt'],
      where: { id },
      include: [{
        attributes: ['id', 'title', 'authorId', 'createdAt', 'updatedAt'],
        model: models.Novels,
        include: [{
          attributes: ['id', 'name', 'createdAt', 'updatedAt'],
          model: models.Genres,
          through: {
            attributes: ['genreId', 'novelId', 'createdAt', 'updatedAt']
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
  getAllAuthors, getAuthorByIdWithNovelAndGenres
}
