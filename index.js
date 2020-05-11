const express = require('express')
const { getAllAuthors, getAuthorByIdWithNovelAndGenres } = require('./controllers/authors')
const { getAllGenres, getGenresWithNovelsandAuthorsByGenreId } = require('./controllers/genres')
const { getAllNovelsWithAuthorsAndGenres, getNovelByIdWithAuthorAndGenres } = require('./controllers/novels')

const app = express()

app.get('/authors', getAllAuthors)

app.get('/authors/:id', getAuthorByIdWithNovelAndGenres)

app.get('/genres', getAllGenres)

app.get('/genres/:id', getGenresWithNovelsandAuthorsByGenreId)

app.get('/novels', getAllNovelsWithAuthorsAndGenres)

app.get('/novels/:id', getNovelByIdWithAuthorAndGenres)

app.listen(1337, () => {
  // eslint-disable-next-line no-console
  console.log('listening on port 1337')
})
