import React from 'react'
import { NavLink} from 'react-router-dom'
import {Menu, Icon} from 'semantic-ui-react'

const MovieSearch = ({searchTerm, setSearchTerm}) => {
    return (
      <Menu inverted widths={2}>
        <Menu.Item header><h1>Movie<Icon name='film'/>Search</h1></Menu.Item>
        <Menu.Item>
        <div class="ui action input">
          <input placeholder='Enter Movie Title' 
          value={searchTerm} 
          onChange={e => setSearchTerm(e.target.value)}/>
          <NavLink to={`/movies`}><button class="ui button">Search</button></NavLink>
          </div>
        </Menu.Item>
      </Menu>
    )
  }
  
  export default MovieSearch