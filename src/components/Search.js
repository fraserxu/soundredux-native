let React = require('react-native')
let {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  TextInput
} = React

import InteractionManager from 'InteractionManager'
import PlayerContainer from '../containers/PlayerContainer'
import Songs from './Songs'

import {fetchSongsIfNeeded, changePlaylist} from '../actions/playlists'
import Icon from 'react-native-vector-icons/MaterialIcons'
let deviceWidth = Dimensions.get('window').width

class Search extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      text: ''
    }

    this.onSubmitEditing = this.onSubmitEditing.bind(this)
    this.onBack = this.onBack.bind(this)
  }

  renderContent () {
    let { playlist } = this.props
    return (
      <Songs
        {...this.props}
        playlist={playlist}
        scrollFunc={fetchSongsIfNeeded.bind(null, playlist)} />
    )
  }

  renderPlayer () {
    return (
      <PlayerContainer />
    )
  }

  onSubmitEditing () {
    const {dispatch} = this.props
    dispatch(changePlaylist(this.state.text))
  }

  onBack () {
    InteractionManager.runAfterInteractions(() => {
      this.props.navigator.pop()
    })
  }

  render () {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={this.onBack}>
            <Icon name="keyboard-backspace" style={styles.backIcon} size={30} color="#FFF" />
          </TouchableOpacity>
          <Icon name="search" style={styles.search} size={30} color="#FFF" />
          <TextInput
            style={styles.input}
            onChangeText={(text) => this.setState({text})}
            placeholder={'Search SoundCloud'}
            placeholderTextColor={'#E2E2E2'}
            underlineColorAndroid={'#3a3f41'}
            onSubmitEditing={this.onSubmitEditing}
            autoFocus={true}
            autoCorrect={false}
            value={this.state.text}
          />
        </View>
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
  header: {
    flexDirection: 'row',
    width: deviceWidth,
    height: 50,
    backgroundColor: '#3a3f41'
  },
  backIcon: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    width: 40
  },
  search: {
    width: 30,
    marginTop: 10
  },
  input: {
    height: 50,
    padding: 5,
    width: deviceWidth - 100,
    color: '#fff'
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#fff',
    height: 50,
    marginTop: 15,
    lineHeight: 50,
  }
})

export default Search
