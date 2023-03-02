import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
})
const api_key = '?api_key=196d45759a6c5fd76144f918e98aceab'

export const MovieAPI = {
  Popular(page = 1) {
    return instance
      .get('movie/popular' + '?api_key=196d45759a6c5fd76144f918e98aceab' + '&page=' + page)
      .then((response) => response.data)
  },
  onID(idMovie) {
    return instance.get('movie/' + idMovie + api_key).then((response) => response.data)
  },
  Genres() {
    return instance.get('genre/movie/list' + api_key).then((response) => response.data)
  },
  Search(query, page = 1) {
    return instance
      .get('search/movie' + api_key + '&query=' + query + '&page=' + page)
      .then((response) => response.data)
  },
  GuestAuth() {
    return instance.get('authentication/guest_session/new' + api_key).then((response) => response.data)
  },
  Rated(movieID, ratedCount, guest_session_id) {
    return instance
      .post('movie/' + movieID + '/rating' + api_key + '&guest_session_id=' + guest_session_id, {
        value: ratedCount,
      })
      .then((response) => response.data)
  },
  ListRated(guest_session_id) {
    return instance
      .get('guest_session/' + guest_session_id + '/rated/movies' + api_key)
      .then((response) => response.data)
  },
}
