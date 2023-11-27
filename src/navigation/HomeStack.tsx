import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Home from '../screen/Home/Home';

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
        initialRouteName='Home'
        screenOptions={{
            headerShown: false
        }}
    >
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
};

export default HomeStack;
