import * as types from '../constants/ActionTypes';

export default function player(state = {
    currentSongIndex: null,
    currentTime: 0,
    selectedPlaylists: [],
    status: 'init'
}, action) {
    switch(action.type) {
    case types.CHANGE_CURRENT_TIME:
        return Object.assign({}, state, {
            currentTime: action.time
        });

    case types.CHANGE_PLAYING_SONG:
        return Object.assign({}, state, {
            currentSongIndex: action.songIndex
        });

    case types.CHANGE_SELECTED_PLAYLISTS:
        return Object.assign({}, state, {
            selectedPlaylists: action.playlists
        });

    case types.CHANGE_PLAYER_STATUS:
        return Object.assign({}, state, {
            status: action.status
        })

    default:
        return state;
    }
}
