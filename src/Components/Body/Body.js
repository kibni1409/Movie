import React, { useState } from 'react'
import { Alert, Tabs } from 'antd'

import MovieCard from '../MovieCard/MovieCard'
import Search from '../Search/Search'
import { Consumer } from '../../Context'

import Style from './Body.module.css'
import PaginationJS from './../Pagination/Pagination'

const Body = (props) => {
  let [tabs, setTabs] = useState(1)
  const onChange = (key) => {
    setTabs(key)
  }
  const items = [
    {
      key: 1,
      label: 'Search',
    },
    {
      key: 2,
      label: 'Rated',
    },
  ]
  return (
    <Consumer>
      {(state) => {
        let ElementsMovie = state.Movies.map((el) => (
          <MovieCard
            key={el.id}
            postRated={props.postRated}
            el={el}
            isLoading={state.isLoading}
            Genres={state.Genres}
            setRatedMovie={props.setRatedMovie}
            tabs={tabs}
          />
        ))
        let ElementsMovieRated = state.RatedMovies.map((el) => (
          <MovieCard
            key={el.id}
            postRated={props.postRated}
            el={el}
            isLoading={state.isLoading}
            Genres={state.Genres}
            tabs={tabs}
          />
        ))
        return (
          <div className={Style.Body}>
            <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
            <Search setMovie={props.setMovie} setInput={props.setInput} />
            {state.Movies.length !== 0 ? null : <Alert message="I'm sorry, but there are no such films" type="error" />}
            <div className={Style.listCards}>{tabs === 1 ? ElementsMovie : ElementsMovieRated}</div>
            <PaginationJS inputSearch={state.inputSearch} setMovie={props.setMovie} totalPages={state.totalPages} />
          </div>
        )
      }}
    </Consumer>
  )
}
export default Body
