let React = require('react-native')
let {
  StyleSheet,
  View,
  Dimensions,
  PropTypes,
  ToolbarAndroid
} = React
import {connect} from 'react-redux/native'

let deviceWidth = Dimensions.get('window').width

import InteractionManager from 'InteractionManager'
import {fetchSongsIfNeeded} from '../actions/playlists'
import {parseUrl} from '../utils/RouteUtils'

import PlayerContainer from '../containers/PlayerContainer'
import SearchContainer from '../containers/SearchContainer'
import Songs from './Songs'

let toolbarActions = [
  {title: 'Search', icon: require('../../assets/search100.png'), show: 'always'}
]

class Main extends React.Component {
  constructor (props) {
    super(props)

    this.onActionSelected = this.onActionSelected.bind(this)
  }

  renderContent () {
    const { playlist } = this.props
    return (
      <Songs
        {...this.props}
        scrollFunc={fetchSongsIfNeeded.bind(null, playlist)} />
    )
  }

  renderPlayer () {
    const {dispatch, navigator} = this.props

    return (
      <PlayerContainer
        dispatch={dispatch}
        navigator={navigator} />
    )
  }

  onActionSelected (position) {
    const { navigator } = this.props
    InteractionManager.runAfterInteractions(() => {
      if (position === 0) {
        navigator.push({
          component: SearchContainer,
          name: 'Search'
        })
      }
    })
  }

  render () {
    return (
      <View style={styles.container}>
        <ToolbarAndroid
          style={styles.toolbar}
          actions={toolbarActions}
          onActionSelected={this.onActionSelected}
          titleColor='#fff'
          title={'Sound Redux Native'}
        />
        {this.renderContent()}
        {this.renderPlayer()}
      </View>
    )
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  toolbar: {
    backgroundColor: '#3a3f41',
    height: 50,
    color: '#fff'
  }
})

Main.propTypes = {
  dispatch: PropTypes.func.isRequired,
  player: PropTypes.object.isRequired,
  playingSongId: PropTypes.number,
  playlist: PropTypes.string,
  playlists: PropTypes.object.isRequired,
}

export default Main
