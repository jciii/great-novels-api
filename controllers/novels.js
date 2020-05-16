const models = require('../models')

const getAllNovelsWithAuthorsAndGenres = async (request, response) => {
  try {
    const allNovelsWithAuthorsAndGenres = await models.Novels.findAll({
      attributes: ['id', 'title', 'authorId', 'createdAt', 'updatedAt'],
      include: [{
        attributes: ['id', 'nameFirst', 'nameLast', 'createdAt', 'updatedAt'],
        model: models.Authors
      },
      {
        attributes: ['id', 'name', 'createdAt', 'updatedAt'],
        model: models.Genres,
        through: {
          attributes: ['genreId', 'novelId', 'createdAt', 'updatedAt']
        }
      }]
    })

    return response.send(allNovelsWithAuthorsAndGenres)
  } catch (error) {
    return response.status(500).send('Unable to retrieve Novel, please try again')
  }
}

const getNovelByIdWithAuthorAndGenres = async (request, response) => {
  try {
    const { indentifier } = request.params
    const novelByIdWithAuthorAndGenres = await models.Novels.findOne({
      attributes: ['id', 'title', 'authorId', 'createdAt', 'updatedAt'],
      where: {
        [models.Op.or]: [
          {
            id: indentifier
          },
          {
            title: { [models.Op.like]: `%${indentifier}%` }
          },
        ],
      },
      include: [{
        attributes: ['id', 'nameFirst', 'nameLast', 'createdAt', 'updatedAt'],
        model: models.Authors
      },
      {
        model: models.Genres,
        attributes: ['id', 'name', 'createdAt', 'updatedAt'],
        through: {
          attributes: ['genreId', 'novelId', 'createdAt', 'updatedAt']
        }
      }]
    })

    return response.send(novelByIdWithAuthorAndGenres)
  } catch (error) {
    return response.status(500).send('Unable to retrieve Novel, please try again')
  }
}

module.exports = { getAllNovelsWithAuthorsAndGenres, getNovelByIdWithAuthorAndGenres }
