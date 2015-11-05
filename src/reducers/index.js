import {combineReducers} from 'redux'
import entities from '../reducers/entities'
import height from '../reducers/height'
import player from '../reducers/player'
import playlists from '../reducers/playlists'
import playlist from '../reducers/playlist'

const rootReducer = combineReducers({
  entities,
  height,
  player,
  playlists,
  playlist
})

export default rootReducer
