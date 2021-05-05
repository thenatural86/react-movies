import React, { useState, useEffect, useCallback } from 'react'

import MoviesList from './components/MoviesList'
import './App.css'

function App() {
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchMoviesHandler = useCallback(() => {
    setIsLoading(true)
    setError(null)
    fetch('https://swapi.dev/api/films')
      .then((response) => response.json())
      .then((data) => {
        setMovies(data.results)
        setIsLoading(false)
      })
  }, [])

  useEffect(() => {
    fetchMoviesHandler()
  }, [fetchMoviesHandler])

  // const fetchMoviesHandler = async () => {
  //   setIsLoading(true)
  //   setError(null)
  //   try {
  //     const response = await fetch('https://swapi.dev/api/films')

  //     if (!response.ok) {
  //       throw new Error('Opps, Something went wrong!')
  //     }
  //     const data = await response.json()

  //     setMovies(data.results)
  //     setIsLoading(false)
  //   } catch (error) {
  //     setError(error.message)
  //     setIsLoading(false)
  //   }
  // }
  let content = <p>No movies</p>

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />
  }

  if (isLoading) {
    content = <h3>Loading...</h3>
  }

  if (error) {
    content = <p>{error}</p>
  }

  return (
    <>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </>
  )
}

export default App
