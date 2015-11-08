import * as types from '../constants/ActionTypes'

export default function playlist(state = 'house', action) {
  switch(action.type) {
  case types.CHANGE_PLAYLIST:
    return action.playlist

  default:
    return state
  }
}
