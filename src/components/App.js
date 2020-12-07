import React, {useState, useEffect} from 'react'
import { Route, Switch} from 'react-router-dom'
import MovieSearch from './MovieSearch.js'
import MovieList from './MovieList.js'
import MovieDetail from './MovieDetail.js'

const App = () => {
  const [movies, setMovies] = useState([])
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=bb337d524d7489a9fe8f2a1cfbb512e5&language=en-US&query=${searchTerm}`)
    .then(r=>r.json())
    .then(movies=>setMovies(movies.results))
  }, [searchTerm])

    return (
      <>
      <MovieSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
      <main>
       <Switch>
       <Route exact path="/movies" render={routeProps => <MovieList {...routeProps} movies={movies}/>}/>
       <Route exact path="/movies/:id" component={MovieDetail}/>
        </Switch>
      </main>
      </>
     )
  }

export default App