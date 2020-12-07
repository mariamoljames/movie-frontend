import React from 'react'
import {Card} from 'semantic-ui-react'

const Movie = ({movie}) => {
    return (
    <Card> 
      <img src={`http://image.tmdb.org/t/p/w1280${movie.poster_path}`} alt={movie.original_title} height={300}/> 
      <Card.Content> 
      <Card.Header>{movie.original_title}</Card.Header>
      </Card.Content>
    </Card>
    )
  }
  
  export default Movie