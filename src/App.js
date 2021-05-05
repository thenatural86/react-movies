import React, { useState } from 'react'

import MoviesList from './components/MoviesList'
import './App.css'

function App() {
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const fetchMoviesHandler = () => {
    setIsLoading(true)
    fetch('https://swapi.dev/api/films')
      .then((response) => response.json())
      .then((data) => {
        setMovies(data.results)
        setIsLoading(false)
      })
  }

  // const fetchMoviesHandler = async () => {
  //   const response = await fetch('https://swapi.dev/api/films')
  //   const data = await response.json()
  //   console.log(data.results)
  //   setMovies(data.results)
  // }

  return (
    <>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {isLoading && <h3>Loading...</h3>}
        {!isLoading && movies.length === 0 && <p>No movies</p>}
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
      </section>
    </>
  )
}

export default App
