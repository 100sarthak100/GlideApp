// import React, {useState} from 'react';
// import Svg, {Rect} from 'react-native-svg';
// import {StyleSheet, View} from 'react-native';

// import {
//   State,
//   PanGestureHandler,
//   PinchGestureHandler,
//   GestureHandlerRootView,
// } from 'react-native-gesture-handler';

// import Animated, {
//   withSpring,
//   useSharedValue,
//   useAnimatedStyle,
//   useAnimatedGestureHandler,
// } from 'react-native-reanimated';

// const TILE_SIZE = 50;
// const MAP_ROWS = 20;
// const MAP_COLS = 20;

// const generateMap = () => {
//   const map = [];
//   for (let i = 0; i < MAP_ROWS; i++) {
//     const row = [];
//     for (let j = 0; j < MAP_COLS; j++) {
//       row.push(i * MAP_COLS + j + 1);
//     }
//     map.push(row);
//   }
//   return map;
// };

// const ZoomableDraggableMap = () => {
//   const scale = useSharedValue(1);
//   const translateX = useSharedValue(0);
//   const translateY = useSharedValue(0);

//   const onPinchGestureEvent = useAnimatedGestureHandler({
//     onActive: event => {
//       scale.value = event.scale;
//     },
//   });

//   const onPanGestureEvent = useAnimatedGestureHandler({
//     onActive: event => {
//       translateX.value = event.translationX;
//       translateY.value = event.translationY;
//     },
//     onEnd: event => {
//       translateX.value = withSpring(0);
//       translateY.value = withSpring(0);
//     },
//   });

//   const animatedStyle = useAnimatedStyle(() => {
//     return {
//       transform: [
//         {translateX: translateX.value},
//         {translateY: translateY.value},
//         {scale: scale.value},
//       ],
//     };
//   });

//   return (
//     <GestureHandlerRootView>
//       <Animated.View style={styles.container}>
//         <PinchGestureHandler onGestureEvent={onPinchGestureEvent}>
//           <Animated.View style={[styles.mapContainer, animatedStyle]}>
//             <PanGestureHandler
//               onGestureEvent={onPanGestureEvent}
//               onHandlerStateChange={onPanGestureEvent}>
//               <Animated.View>
//                 <Svg
//                   width={TILE_SIZE * MAP_COLS}
//                   height={TILE_SIZE * MAP_ROWS}
//                   style={animatedStyle}>
//                   {generateMap().map((row, rowIndex) =>
//                     row.map((tile, colIndex) => (
//                       <Rect
//                         key={`${rowIndex}-${colIndex}`}
//                         x={colIndex * TILE_SIZE}
//                         y={rowIndex * TILE_SIZE}
//                         width={TILE_SIZE}
//                         height={TILE_SIZE}
//                         fill={`rgb(${Math.floor(
//                           Math.random() * 256,
//                         )}, ${Math.floor(Math.random() * 256)}, ${Math.floor(
//                           Math.random() * 256,
//                         )})`}
//                       />
//                     )),
//                   )}
//                 </Svg>
//               </Animated.View>
//             </PanGestureHandler>
//           </Animated.View>
//         </PinchGestureHandler>
//       </Animated.View>
//     </GestureHandlerRootView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   mapContainer: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

// export default ZoomableDraggableMap;

import React from 'react';
import {View, StyleSheet} from 'react-native';
import {
  PinchGestureHandler,
  State,
  PanGestureHandler,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  withDecay,
} from 'react-native-reanimated';
import Svg, {Rect} from 'react-native-svg';

const TILE_SIZE = 50;
const MAP_ROWS = 20;
const MAP_COLS = 20;

const generateMap = () => {
  const map = [];
  for (let i = 0; i < MAP_ROWS; i++) {
    const row = [];
    for (let j = 0; j < MAP_COLS; j++) {
      row.push(i * MAP_COLS + j + 1);
    }
    map.push(row);
  }
  return map;
};

const ZoomableDraggableMap = () => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const baseScale = useSharedValue(1);
  const pinchScale = useSharedValue(1);
  const lastScale = useSharedValue(1);

  const onPinchGestureEvent = useAnimatedGestureHandler({
    onActive: event => {
      pinchScale.value = event.scale;
    },
    onEnd: () => {
      lastScale.value = withSpring(1, {damping: 10, stiffness: 100});
      pinchScale.value = withSpring(1, {damping: 10, stiffness: 100});
    },
  });

  const onPanGestureEvent = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      console.log('onStart', ctx);
      ctx.translateX = translateX.value;
      ctx.translateY = translateY.value;
    },
    onActive: (event, ctx) => {
      console.log('onActive', ctx);

      translateX.value = ctx.translateX + event.translationX;
      translateY.value = ctx.translateY + event.translationY;
    },
    onEnd: () => {
      translateX.value = withDecay({velocity: 0});
      translateY.value = withDecay({velocity: 0});
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: translateX.value + lastScale.value * translateX.value},
        {translateY: translateY.value + lastScale.value * translateY.value},
        {scale: baseScale.value * pinchScale.value * lastScale.value},
      ],
    };
  });

  return (
    // <PinchGestureHandler
    //   onGestureEvent={onPinchGestureEvent}
    //   onHandlerStateChange={onPinchGestureEvent}>
    //   <Animated.View style={[StyleSheet.absoluteFill, animatedStyle]}>
    <Animated.View>
      <PanGestureHandler
        onGestureEvent={onPanGestureEvent}
        onHandlerStateChange={onPanGestureEvent}>
        <Animated.View style={[StyleSheet.absoluteFill]}>
          <Svg width={TILE_SIZE * MAP_COLS} height={TILE_SIZE * MAP_ROWS}>
            {generateMap()?.map((row, rowIndex) =>
              row.map((tile, colIndex) => (
                <Rect
                  key={`${rowIndex}-${colIndex}`}
                  x={colIndex * TILE_SIZE}
                  y={rowIndex * TILE_SIZE}
                  width={TILE_SIZE}
                  height={TILE_SIZE}
                  fill={`rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
                    Math.random() * 256,
                  )}, ${Math.floor(Math.random() * 256)})`}
                />
              )),
            )}
          </Svg>
        </Animated.View>
      </PanGestureHandler>
    </Animated.View>

    //   </Animated.View>
    // </PinchGestureHandler>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ZoomableDraggableMap;
