import React, { useState } from 'react'

import MoviesList from './components/MoviesList'
import './App.css'

function App() {
  const [movies, setMovies] = useState([])

  const fetchMoviesHandler = () => {
    fetch('https://swapi.dev/api/films')
      .then((response) => response.json())
      .then((data) => {
        setMovies(data.results)
      })
  }

  // useEffect(() => {
  //   fetchMoviesHandler()
  // }, [])

  console.log(movies)

  return (
    <>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={movies} />
      </section>
    </>
  )
}

export default App
