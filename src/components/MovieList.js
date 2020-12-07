import React from 'react'
import { NavLink} from 'react-router-dom'
import {Card} from 'semantic-ui-react'
import Movie from './Movie.js'

const MovieList = ({movies}) => {
  let moviesToRender = movies.map(movie => <NavLink to={`/movies/${movie.id}`}><Movie key={movie.id} movie={movie}/></NavLink>)
    return (
      <Card.Group itemsPerRow={3}>{moviesToRender}</Card.Group> 
    )
  }  
  
  export default MovieList