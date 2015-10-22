import React from 'react-native'

let {
  TabBarIOS,
  Text
} = React

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedTab: 'house'
    }
  }
  render () {
    <TabBarIOS
      tintColor='#212739'
    />
  }
}
