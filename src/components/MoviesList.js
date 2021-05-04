import React from 'react'

import Movie from './Movie'
import classes from './MoviesList.module.css'

const MovieList = ({ movies }) => {
  return (
    <ul className={classes['movies-list']}>
      {movies.map((movie) => (
        <Movie
          key={movie.episode_id}
          title={movie.title}
          releaseDate={movie.release_date}
          openingText={movie.opening_crawl}
        />
      ))}
    </ul>
  )
}

export default MovieList
