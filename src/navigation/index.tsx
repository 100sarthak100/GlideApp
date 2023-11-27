import {Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import styles from './styles';
import MapStack from './MapStack';
import HomeStack from './HomeStack';
import DeviceStack from './DeviceStack';
import HomeIcon from '../assets/SVG/HomeIcon';
import MapArrowIcon from '../assets/SVG/MapArrowIcon';
import BluetoothIcon from '../assets/SVG/BluetoothIcon';

const Tab = createBottomTabNavigator();

export const Navigation = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            height: 68,
            backgroundColor: '#FFF',
            elevation: 20,
          },
        }}>
        <Tab.Screen
          name="HomeStack"
          component={HomeStack}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({focused}) => {
              const textStyle = focused
                ? styles.textFocused
                : styles.textInactive;

              const color = focused ? 'blue' : 'gray';

              const strokeWidth = focused ? 2 : 1.5;

              return (
                <View style={styles.tabContainer}>
                  <HomeIcon color={color} strokeWidth={strokeWidth} />
                  <Text style={textStyle}>Home</Text>
                </View>
              );
            },
          }}
        />
        <Tab.Screen
          name="MapStack"
          component={MapStack}
          options={{
            tabBarLabel: 'Map',
            tabBarIcon: ({focused}) => {
              const textStyle = focused
                ? styles.textFocused
                : styles.textInactive;

              const color = focused ? 'blue' : 'gray';

              const strokeWidth = focused ? 2 : 1.5;

              return (
                <View style={styles.tabContainer}>
                  <MapArrowIcon color={color} strokeWidth={strokeWidth} />
                  <Text style={textStyle}>Map</Text>
                </View>
              );
            },
          }}
        />
        <Tab.Screen
          name="DeviceStack"
          component={DeviceStack}
          options={{
            tabBarLabel: 'Devices',
            tabBarIcon: ({focused}) => {
              const textStyle = focused
                ? styles.textFocused
                : styles.textInactive;

              const color = focused ? 'blue' : 'gray';

              const strokeWidth = focused ? 2 : 1.5;

              return (
                <View style={styles.tabContainer}>
                  <BluetoothIcon color={color} strokeWidth={strokeWidth} />
                  <Text style={textStyle}>Devices</Text>
                </View>
              );
            },
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
