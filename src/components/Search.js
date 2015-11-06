var React = require('react-native');
var {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  TextInput
} = React;

import Icon from 'react-native-vector-icons/MaterialIcons'
var deviceWidth = Dimensions.get('window').width;

class Search extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      text: ''
    }
  }

  onSubmitEditing (e) {
    console.log('value', this.state.text)
  }

  render () {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this.props.navigator.pop()}>
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
    )
  }
}

var styles = StyleSheet.create({
  container: {
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
});

export default Search
