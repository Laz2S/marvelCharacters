import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomePage from '../screens/Home';
import DetailPage from '../screens/Detail';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomePage}
          options={{
            headerShown: false,
            cardStyle: {
              backgroundColor: 'white',
            },
          }}
        />
        <Stack.Screen
          name="Details"
          component={DetailPage}
          options={{
            headerTitle: () => <></>,
            headerTransparent: true,
            headerTintColor: 'white',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
