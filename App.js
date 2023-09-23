import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react'
import Home from './src/screens/home';
import { Provider } from 'react-redux';
import { store } from './store';

const Stack = createStackNavigator();
const App = () => {

  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator>
        
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
        
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}

export default App