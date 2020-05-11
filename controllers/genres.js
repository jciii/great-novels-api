const models = require('../models')

const getAllGenres = async (request, response) => {
  try {
    const genres = await models.Genres.findAll({
      attributes: ['id', 'name', 'createdAt', 'updatedAt']
    })

    return response.send(genres)
  } catch (error) {
    return response.status(500).send('Unable to retrieve Genres, please try again')
  }
}

const getGenresWithNovelsandAuthorsByGenreId = async (request, response) => {
  try {
    const { id } = request.params
    const genresWithNovelAndAuthor = await models.Genres.findOne({
      attributes: ['id', 'name', 'createdAt', 'updatedAt'],
      where: { id },
      include: [{
        attributes: ['id', 'title', 'authorId', 'createdAt', 'updatedAt'],
        model: models.Novels,
        through: {
          attributes: []
        },
        include: [{
          attributes: ['id', 'nameFirst', 'nameLast', 'createdAt', 'updatedAt'],
          model: models.Authors
        }]
      }]
    })

    return response.send(genresWithNovelAndAuthor)
  } catch (error) {
    return response.status(500).send('Unable to retrieve Genres with params, please try again')
  }
}

module.exports = { getAllGenres, getGenresWithNovelsandAuthorsByGenreId }
