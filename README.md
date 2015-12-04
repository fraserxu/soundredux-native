# SoundRedux Native

> In an effort to learn es6 and [redux](https://github.com/rackt/redux), this is SoundRedux, a simple [Soundcloud](http://soundcloud.com) client

I have a blog post sharing my experience [Building A Native Soundcloud Android App With React Native And Redux](https://wiredcraft.com/blog/native-soundcloud-android-app/)

In an effort to learn es6 and [redux](https://github.com/rackt/redux), [react-native](https://facebook.github.io/react-native/) this is SoundRedux Native, a simple [Soundcloud](http://soundcloud.com) native client.

This repo is stolen from the awesome [soundredux](https://soundredux.io/) project by @andrewngu , I've been using it instead of the official Soundclould client for a week.

![soundredux-native](https://cloud.githubusercontent.com/assets/1183541/11113509/83e13790-8958-11e5-9faa-831b7f7ba0e8.gif)


### What I've learned

* Having redux as the data layer, it takes no effort to switch the view layer from DOM to react-native
* Writing CSS with flexbox is easy than normal CSS
* Building a native module for react-native is simple and straightforword thanks to the effort and nice design from Facebook
* Soundcloud API is awesome

Currently only focused on Android developement because I don't have an iOS device and it's only fun when your code running on your own device.

The code is still a mess with ES6 + ES5 code mixed together. And I haven't done import all the features from soundredux and some of the code is even not used yet.

### Developement

1. `npm install`
2. Check [Android Setup](https://facebook.github.io/react-native/docs/android-setup.html#content)
3. `react-native run-android`

Feedback, issues, etc. are more than welcome!

### TODO

- [x] InfinteScroll to load more songs
- [x] To be able to switch genre
- [ ] Clean up code
- [x] A modal to display song detail like the official client
- [ ] iOS

### Notes:

To run it on a real device, bundle the jsfile into the apk by running:

* create an assets folder under `android/app/src/main`
* curl "http://localhost:8081/index.android.bundle?platform=android" -o "android/app/src/main/assets/index.android.bundle"

Thanks to my awesome colleague [@xeodou](https://github.com/xeodou) who build the native Android player [react-native-player](https://github.com/xeodou/react-native-player)module on top of ExoPlayer.
