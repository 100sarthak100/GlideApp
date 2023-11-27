import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

import Animated, {
  withTiming,
  withSpring,
  useSharedValue,
  useDerivedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
} from 'react-native-reanimated';

import {
  PinchGestureHandler,
  PinchGestureHandlerGestureEvent,
  PinchGestureHandlerStateChangeEvent,
} from 'react-native-gesture-handler';
import MapBeacons from './MapBeacons';

const ModifiedMap = (props) => {
  const scale = useSharedValue(1);
  const focalX = useSharedValue(0);
  const focalY = useSharedValue(0);

  // Store initial values
  const initialFocalX = useDerivedValue(() => 0);
  const initialFocalY = useDerivedValue(() => 0);

  const pinchHandler = useAnimatedGestureHandler<PinchGestureHandlerGestureEvent>({
    onActive: event => {
      scale.value = event.scale;
    },
    onEnd: () => {
      // Use withSpring to smoothly animate the transition back to the initial scale
      scale.value = withSpring(1);
      focalX.value = withSpring(initialFocalX.value);
      focalY.value = withSpring(initialFocalY.value);
    },
  });

  const onPinchStateChange = (event: PinchGestureHandlerStateChangeEvent) => {
    if (event.nativeEvent.oldState === 4 /* PinchGestureHandlerState.END */) {
      // Update initial values
      initialFocalX.value += event.nativeEvent.focalX;
      initialFocalY.value += event.nativeEvent.focalY;
    }
  };

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: focalX.value },
        { translateY: focalY.value },
        { scale: scale.value },
      ],
    };
  });

  const focalPointStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: -focalX.value },
        { translateY: -focalY.value },
      ],
    };
  });

  return (
    <PinchGestureHandler
      onGestureEvent={pinchHandler}
      onHandlerStateChange={onPinchStateChange}>
      <Animated.View style={[styles.container, rStyle]}>
        {/* Your zoomable content goes here */}
        {/* <Text>Zoomable View</Text> */}
        {/* {props?.children} */}
        {/* <MapBeacons
        devices={props?.allDevices} grid={props?.beaconCoords} 
        /> */}
        {/* <Animated.View style={[styles.focalPoint, focalPointStyle]} /> */}
      </Animated.View>
    </PinchGestureHandler>
  );
};

export default ModifiedMap;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgray',
  },

  focalPoint: {
    position: 'absolute',
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'red',
  },
});
