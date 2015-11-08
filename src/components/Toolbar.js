let React = require('react-native')
let {
  StyleSheet,
  View,
  Text,
  Dimensions,
  ScrollView,
  TouchableOpacity
} = React

import {changePlaylist} from '../actions/playlists'
import {GENRES, GENRES_MAP} from '../constants/SongConstants'
let deviceWidth = Dimensions.get('window').width

class Toolbar extends React.Component {
  constructor (props) {
    super(props)
  }

  onPress (g) {
    const {dispatch} = this.props
    dispatch(changePlaylist(g))
  }

  render () {
    const { playlist } = this.props

    return (
      <View>
        <ScrollView
          key={'scrollView'}
          contentContainerStyle={styles.container}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          >
          { GENRES.map((g, idx) => {
            return (
              <TouchableOpacity key={idx} style={[styles.item, {
                'borderLeftWidth': idx === 0 ? 0 : 1,
                'borderBottomWidth': g === playlist ? 2 : 1,
                'borderBottomColor': g === playlist ? '#a6d2a5' : '#e3e3e3'
              }]} onPress={this.onPress.bind(this, g)}>
                <Text style={styles.genre}>{g.toUpperCase()}</Text>
              </TouchableOpacity>
            )
          })}
        </ScrollView>
      </View>
    )
  }
}

let styles = StyleSheet.create({
  container: {
    height: 40,
    width: deviceWidth,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e3e3e3'
  },
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderLeftColor: '#e3e3e3'
  },
  genre: {
    fontWeight: '300',
    fontSize: 11,
    color: '#adadad',
  }
})

export default Toolbar
