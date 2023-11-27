import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Devices from '../screen/Devices/Devices';

const Stack = createStackNavigator();

const DeviceStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Devices"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Devices" component={Devices} />
    </Stack.Navigator>
  );
};

export default DeviceStack;
