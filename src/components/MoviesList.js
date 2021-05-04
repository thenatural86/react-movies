import React from 'react'

import Movie from './Movie'
import classes from './MoviesList.module.css'

const MovieList = ({ movies }) => {
  return (
    <ul className={classes['movies-list']}>
      {movies.map((movie, id) => (
        <Movie
          key={id}
          title={movie.title}
          releaseDate={movie.release}
          openingText={movie.openingText}
        />
      ))}
    </ul>
  )
}

export default MovieList
