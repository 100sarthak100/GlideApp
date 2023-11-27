import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Map from '../screen/Map/Map';

const Stack = createStackNavigator();

const MapStack = () => {
  return (
    <Stack.Navigator
        initialRouteName='Map'
        screenOptions={{
            headerShown: false
        }}
    >
      <Stack.Screen name="Map" component={Map} />
    </Stack.Navigator>
  );
};

export default MapStack;
