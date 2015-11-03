var React = require('react-native');
var {
  StyleSheet,
  View,
  Text,
  Dimensions,
  ScrollView,
  TouchableOpacity
} = React;

import {GENRES, GENRES_MAP} from '../constants/SongConstants';
var deviceWidth = Dimensions.get('window').width;

class Toolbar extends React.Component {
  constructor (props) {
    super(props)
  }
  render () {
    return (
      <View>
        <ScrollView
          key={'scrollView'}
          contentContainerStyle={styles.container}
          horizontal={true}
          >
          { GENRES.map((g, idx) => {
            return (
              <TouchableOpacity key={idx} style={[styles.item, {
                'borderLeftWidth': idx === 0 ? 0 : 1
              }]}>
                <Text style={styles.genre}>{g.toUpperCase()}</Text>
              </TouchableOpacity>
            )
          })}
        </ScrollView>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // width: deviceWidth,
    height: 40,
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
});

export default Toolbar
