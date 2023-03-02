import React, { useEffect } from 'react'

import { MovieAPI } from '../../API/MovieAPI'

import Body from './Body'

const BodyAPI = (props) => {
  const API = async () => {
    props.setLoading(true)
    const resGuest = await MovieAPI.GuestAuth()
    const resMovie = await MovieAPI.Popular()
    const resGenres = await MovieAPI.Genres()
    props.setGuestID(resGuest.guest_session_id)
    props.setMovie(resMovie)
    props.setGenres(resGenres.genres)
    props.setLoading(false)
  }
  useEffect(() => {
    API().then()
  }, [])
  return (
    <Body
      setRatedMovie={props.setRatedMovie}
      postRated={props.postRated}
      setInput={props.setInput}
      setMovie={props.setMovie}
    />
  )
}
export default BodyAPI
