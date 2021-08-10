import * as React from 'react';
import 'react-native-gesture-handler';
import {StatusBar} from 'react-native';
import Navigation from './src/navigation';
import {Provider} from 'react-redux';
import store from './src/store';

export default function App() {
  return (
    <>
      <StatusBar hidden={true} />
      <Provider store={store}>
        <Navigation />
      </Provider>
    </>
  );
}
