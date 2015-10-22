import React from 'react-native'
// import App from '../containers/app'

// import NavigationBar from './navigation-bar'
// import SceneConfig from './scene-config'

let {
  ActionSheetIOS,
  Image,
  Navitator,
  Text,
  TouchableOpacity,
  View
} = React

class Scene extends React.Component {
  constructor (props) {
    super(props)
  }
  // renderScene (route, navigator) {
  //   const Component = route.component
  //   return (
  //     <View style={{flex: 1}}>
  //       <NavigationBar
  //         backgroundStyle={{backgroundColor: '#0f1726'}}
  //         buttonsColor='#1bce7c'
  //         customTitle={route.customTitle}
  //         customPrev={(route.component === App && this.state.showFilter === true) && this.renderPrev()}
  //         navigator={navigator}
  //         route={route}
  //         statusBar='lightContent'
  //         title={route.title}
  //         titleColor='#1bce7c'
  //       />
  //       <Component
  //         navigator={navigator}
  //         route={route}
  //         filter={this.state.filter}
  //         showFilter={this._showFilter.bind(this)}
  //         {...route.passProps}
  //       />
  //     </View>
  //   )
  // }
  render () {
    return (
      <Text>
        Sound Redux Native
      </Text>
    )
  }
}

export default Scene
