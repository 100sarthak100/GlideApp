import React, {useEffect} from 'react';
import {Alert, Text, View} from 'react-native';

import styles from './styles';
import {useBLEContext} from '../../context/useBleContext';

const Home = () => {
  const {checkAllPermission, scanForPeripherals} = useBLEContext();

  const check = async () => {
    try {
      const a = await checkAllPermission?.();

      if (!a?.ok) {
        // Alert.alert('Alert', `${a?.msg}`);
      }

      scanForPeripherals?.();
    } catch (error) {
      Alert.alert('Alert', `${error}`);
    }
  };

  // console.log("allDevices", allDevices?.length)

  useEffect(() => {
    console.log('check runs');
    check();
  }, []);

  return (
    <View style={styles.root}>
      <Text
        style={{
          fontSize: 20,
          color: 'black',
        }}>
        //TODO: Car Info
      </Text>
    </View>
  );
};

export default Home;
