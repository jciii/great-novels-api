const models = require('../models')

const getAllNovelsWithAuthorsAndGenres = async (request, response) => {
  try {
    const allNovelsWithAuthorsAndGenres = await models.Novels.findAll({
      attributes: { exclude: ['deletedAt'] },
      include: [{
        attributes: { exclude: ['deletedAt'] },
        model: models.Authors
      },
      {
        attributes: ['id', 'name', 'createdAt', 'updatedAt'],
        model: models.Genres,
        through: {
          attributes: { exclude: ['deletedAt'] }
        }
      }]
    })

    return response.send(allNovelsWithAuthorsAndGenres)
  } catch (error) {
    return response.status(500).send('Unable to retrieve Novel, please try again')
  }
}

const getNovelByIdentifierWithAuthorAndGenres = async (request, response) => {
  try {
    const { indentifier } = request.params
    const novelByIdWithAuthorAndGenres = await models.Novels.findOne({
      attributes: { exclude: ['deletedAt'] },
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
        attributes: { exclude: ['deletedAt'] },
        model: models.Authors
      },
      {
        model: models.Genres,
        attributes: ['id', 'name', 'createdAt', 'updatedAt'],
        through: {
          attributes: { exclude: ['deletedAt'] },
        }
      }]
    })

    return response.send(novelByIdWithAuthorAndGenres)
  } catch (error) {
    return response.status(500).send('Unable to retrieve Novel, please try again')
  }
}

module.exports = { getAllNovelsWithAuthorsAndGenres, getNovelByIdentifierWithAuthorAndGenres }
