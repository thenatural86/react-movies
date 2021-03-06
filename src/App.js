import React, { useState, useEffect, useCallback } from 'react'

import MoviesList from './components/MoviesList'
import AddMovie from './components/AddMovie'
import './App.css'

function App() {
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      // const response = await fetch('https://swapi.dev/api/films/');
      const response = await fetch(
        'https://react-movies-97451-default-rtdb.firebaseio.com/movies.json'
      )
      if (!response.ok) {
        throw new Error('Something went wrong!')
      }
      const data = await response.json()
      console.log(data)

      const loadedMovies = []

      for (const key in data) {
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate,
        })
      }

      setMovies(loadedMovies)
    } catch (error) {
      setError(error.message)
    }
    setIsLoading(false)
  }, [])

  useEffect(() => {
    fetchMoviesHandler()
  }, [fetchMoviesHandler])

  const addMovieHandler = async (movie) => {
    // console.log('yolo')
    const response = await fetch(
      'https://react-movies-97451-default-rtdb.firebaseio.com/movies.json',
      {
        method: 'POST',
        body: JSON.stringify(movie),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    const data = await response.json()
    console.log(data)
  }

  let content = <p>Found no movies.</p>

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />
  }

  if (error) {
    content = <p>{error}</p>
  }

  if (isLoading) {
    content = <p>Loading...</p>
  }

  return (
    <>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </>
  )
}

export default App

// const fetchMoviesHandler = useCallback(() => {
//   setIsLoading(true)
//   setError(null)
//   // fetch('https://swapi.dev/api/films')
//   fetch('https://react-movies-97451-default-rtdb.firebaseio.com/movies.json')
//     .then((response) => response.json())
//     .then((data) => {
//       console.log(data)
//       // setMovies(data.results)
//       // setIsLoading(false)
//     })
// }, [])
