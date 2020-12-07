import React,{useState, useEffect} from 'react'
import {Image, Icon} from 'semantic-ui-react'

const MovieDetail = ({match}) => {
  let paramsId=Number(match.params.id)
  const [movie, setMovie] = useState(null)
  const [thumbsUp, setThumbsUp] = useState(false)
  const [thumbsDown, setThumbsDown] = useState(false)
  const [movieFound, setMovieFound] = useState(null)

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${paramsId}?api_key=bb337d524d7489a9fe8f2a1cfbb512e5&language=en-US`)
    .then(r=>r.json())
    .then(movie=>setMovie(movie))
  }, [paramsId])

  useEffect(() => {
    fetch(`http://localhost:3001/movies`)
    .then(r=>r.json())
    .then(movies=>{
      let movFound = movies.filter(mov=>mov.movie_id===paramsId)
      movFound && setMovieFound(movFound[0])
  })}, [paramsId, thumbsUp, thumbsDown])

  const postThumbsUp = () => {
    fetch(`http://localhost:3001/movies`, {
      method: "POST",
      headers: {"Content-type": "application/json"},
      body: JSON.stringify({
      movie_id: paramsId,
      thumbs_up: 1,
      thumbs_down: 0
    })
})
.then(r => r.json())
.then(() =>  setThumbsUp(prevThumbsUp=>!prevThumbsUp))
  }

  const patchThumbsUp = () => { 
    thumbsUp? movieFound.thumbs_up-=1 : movieFound.thumbs_up+=1    
    fetch(`http://localhost:3001/movies/${movieFound.id}`, {
      method: "PATCH",
      headers: {"Content-type": "application/json"},
      body: JSON.stringify({
      thumbs_up: movieFound.thumbs_up
    })
})
.then(r => r.json())
.then(() => {
  setThumbsUp(prevThumbsUp => !prevThumbsUp)
  thumbsDown && patchThumbsDown()
})
  }

  const postThumbsDown = () => {
    fetch(`http://localhost:3001/movies`, {
      method: "POST",
      headers: {"Content-type": "application/json"},
      body: JSON.stringify({
      movie_id: paramsId,
      thumbs_up: 0,
      thumbs_down: 1
    })
})
.then(r => r.json())
.then(() => setThumbsDown(prevThumbsDown=>!prevThumbsDown))
  }

  const patchThumbsDown = () => {
    thumbsDown? movieFound.thumbs_down-=1 : movieFound.thumbs_down+=1
    fetch(`http://localhost:3001/movies/${movieFound.id}`, {
      method: "PATCH",
      headers: {"Content-type": "application/json"},
      body: JSON.stringify({
      thumbs_down: movieFound.thumbs_down
    })
})
.then(r => r.json())
.then(() => {
  setThumbsDown(prevThumbsDown => !prevThumbsDown)
  thumbsUp && patchThumbsUp()
})
  }
 
  if(!movie){
    return <h1>Loading</h1>
  }else{
    return (
      <div class="ui segment">
      <div class="ui two column very relaxed grid">
        <div class="column">
        <Image src={`http://image.tmdb.org/t/p/w1280${movie.backdrop_path}`} size='big'/>
        </div>
      <div class="column">
      <h1>{movie.original_title}</h1>
      <p><h3>Production: </h3>{movie.production_companies[0].name}</p>
      <p><h3>Release Year: </h3>{parseInt(movie.release_date)}</p>
      <p><h3>Description: </h3>{movie.overview}</p>
      <p><Icon name={thumbsUp? "thumbs up" : "thumbs up outline"} size="big" onClick={movieFound? patchThumbsUp : postThumbsUp}/>
      {movieFound? movieFound.thumbs_up : 0}</p>
      <p><Icon name={thumbsDown? "thumbs down" : "thumbs down outline"} size="big" onClick={movieFound? patchThumbsDown : postThumbsDown}/> 
      {movieFound? movieFound.thumbs_down : 0}</p>
    </div>
  </div>
</div>
    )
  }    
  }
  
  export default MovieDetail