import React, {useEffect} from 'react';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {StatusBar, SafeAreaView, useColorScheme, Alert} from 'react-native';

import {Navigation} from './src/navigation';
import {BLEProvider} from './src/context/useBleContext';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: !isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaView style={backgroundStyle}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <BLEProvider>
          <Navigation />
        </BLEProvider>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

export default App;
