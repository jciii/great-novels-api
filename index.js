const express = require('express')
const { getAllAuthors, getAuthorByIdentifierWithNovelAndGenres } = require('./controllers/authors')
const { getAllGenres, getGenresWithNovelsandAuthorsByGenreId } = require('./controllers/genres')
const { getAllNovelsWithAuthorsAndGenres, getNovelByIdentifierWithAuthorAndGenres } = require('./controllers/novels')

const app = express()

app.get('/authors', getAllAuthors)

app.get('/authors/:indentifier', getAuthorByIdentifierWithNovelAndGenres)

app.get('/genres', getAllGenres)

app.get('/genres/:id', getGenresWithNovelsandAuthorsByGenreId)

app.get('/novels', getAllNovelsWithAuthorsAndGenres)

app.get('/novels/:indentifier', getNovelByIdentifierWithAuthorAndGenres)

app.listen(1337, () => {
  // eslint-disable-next-line no-console
  console.log('listening on port 1337')
})
