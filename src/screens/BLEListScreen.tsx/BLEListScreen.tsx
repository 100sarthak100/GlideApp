import {Alert, FlatList, RefreshControl, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';

import styles from './styles';
import useB from '../useBLE';
import useBLE from '../useBLE';
import MapBeacons from '../MapBeacons/MapBeacons';
import {beaconCoords} from '../../utils/mockDta';
import ModifiedMap from '../MapBeacons/ModifiedMap';

const BLEListScreen = props => {
  const {
    scanning,
    allDevices,
    connectToDevice,
    checkAllPermission,
    connectedDevice,
    disconnectFromDevice,
    scanForPeripherals,
  } = useBLE();

  const [devices, setDevices] = useState(allDevices ?? []);

    useEffect(() => {
      setDevices(allDevices);
    }, [allDevices?.length]);

  const check = async () => {
    try {
      const a = await checkAllPermission();

      if (!a?.ok) {
        // Alert.alert('Alert', `${a?.msg}`);
      }

      scanForPeripherals();
    } catch (error) {
      Alert.alert('Alert', `${error}`);
    }
  };

  useEffect(() => {
    check();
  }, []);

//   const simulateDistanceChange = () => {
//     const a = allDevices?.map(m => {
//       return {
//         ...m,
//         distance: Math.random() * 10,
//       };
//     });

//     console.log('a', a);
//     return a;
//   };

//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       let m = simulateDistanceChange();
//       setDevices(m);
//     }, 5000);

//     return () => clearInterval(intervalId);
//   }, [allDevices]);

  const renderItem = ({item}) => {
    // console.log('item1', item);

    return (
      <View style={styles.deviceContainer}>
        <Text style={styles.name}>{item?.name ?? item?.id}</Text>
        <Text style={styles.name}>RSSI: {item?.rssi}</Text>

        <Text style={styles.name}>DIST: {item?.dist}</Text>
      </View>
    );
  };

  const onRefresh = () => {
    scanForPeripherals();
  };

  return (
    // <ModifiedMap devices={allDevices} grid={beaconCoords}>
    <MapBeacons devices={devices} grid={beaconCoords} />
    // </ModifiedMap>
  );

  return (
    <View style={styles.main}>
      <FlatList
        data={allDevices}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => {
          return `${item?.id}`;
        }}
        refreshControl={
          <RefreshControl refreshing={scanning} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

export default BLEListScreen;
