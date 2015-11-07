import {combineReducers} from 'redux'
import entities from '../reducers/entities'
import player from '../reducers/player'
import playlists from '../reducers/playlists'
import playlist from '../reducers/playlist'

const rootReducer = combineReducers({
  entities,
  player,
  playlists,
  playlist
})

export default rootReducer
