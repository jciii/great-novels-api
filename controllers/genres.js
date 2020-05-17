const models = require('../models')

const getAllGenres = async (request, response) => {
  try {
    const genres = await models.Genres.findAll({
      attributes: { exclude: ['deletedAt'] },
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
      attributes: { exclude: ['deletedAt'] },
      where: { id },
      include: [{
        attributes: { exclude: ['deletedAt'] },
        model: models.Novels,
        through: {
          attributes: []
        },
        include: [{
          attributes: { exclude: ['deletedAt'] },
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
