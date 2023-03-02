import './App.css'
import React from 'react'

import BodyAPI from './Components/Body/BodyAPI'
import { Provider } from './Context'
import { MovieAPI } from './API/MovieAPI'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      guestID: '0',
      Movies: [
        {
          id: 0,
          picture: '',
          genres: [{}],
          description: '',
          data: '',
          name: '',
          stars: 0.0,
          rank: 0.0,
        },
      ],
      RatedMovies: [],
      Genres: [{ id: 0, name: 'qwe' }],
      isLoading: false,
      countPage: 0,
      countPageRated: 0,
      totalPages: 0,
      totalPagesRated: 0,
      inputSearch: '',
    }
    this.setMovie = this.setMovie.bind(this)
    this.setGenres = this.setGenres.bind(this)
    this.setLoading = this.setLoading.bind(this)
    this.setInput = this.setInput.bind(this)
    this.setGuestID = this.setGuestID.bind(this)
    this.postRated = this.postRated.bind(this)
    this.setMovieRated = this.setMovieRated.bind(this)
  }
  setGuestID(id) {
    this.setState(() => {
      return {
        guestID: id,
      }
    })
  }
  setMovie(listMovies) {
    this.setState(() => {
      let res = listMovies.results.map((el) => {
        return {
          id: el.id,
          picture: el.poster_path,
          genres: el.genre_ids,
          description: el.overview,
          data: el.release_date,
          name: el.original_title,
          stars: 0,
          rank: el.vote_average,
        }
      })
      return {
        Movies: res,
        totalPages: listMovies.total_pages,
      }
    })
  }
  setMovieRated(listMovies) {
    this.setState(() => {
      let res = listMovies.results.map((el) => {
        return {
          id: el.id,
          picture: el.poster_path,
          genres: el.genre_ids,
          description: el.overview,
          data: el.release_date,
          name: el.original_title,
          stars: el.rating,
          rank: el.vote_average,
        }
      })
      return {
        RatedMovies: res,
        totalPagesRated: listMovies.total_pages,
      }
    })
  }
  setGenres(listGenres) {
    this.setState(() => {
      let res = listGenres.map((el) => {
        return {
          id: el.id,
          name: el.name,
        }
      })
      return {
        Genres: res,
      }
    })
  }
  setLoading(bool) {
    this.setState(() => {
      return {
        isLoading: bool,
      }
    })
  }
  setInput(message) {
    this.setState(() => {
      return {
        inputSearch: message,
      }
    })
  }

  async postRated(movieID, ratedCount) {
    let res = await MovieAPI.Rated(movieID, ratedCount, this.state.guestID)
    if (res.success) {
      let resRated = await MovieAPI.ListRated(this.state.guestID)
      this.setMovieRated(resRated)
    }
  }
  render() {
    return (
      <div className="App">
        <Provider value={this.state}>
          <BodyAPI
            postRated={this.postRated}
            setGuestID={this.setGuestID}
            setInput={this.setInput}
            Movies={this.state.Movies}
            Genres={this.state.Genres}
            setMovie={this.setMovie}
            setGenres={this.setGenres}
            isLoading={this.state.isLoading}
            setLoading={this.setLoading}
            setRatedMovie={this.setRatedMovie}
            RatedMovies={this.state.RatedMovies}
          />
        </Provider>
      </div>
    )
  }
}
