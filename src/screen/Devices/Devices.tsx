import React from 'react';
import {RefreshControl} from 'react-native-gesture-handler';
import {ActivityIndicator, FlatList, Text, View} from 'react-native';

import styles from './styles';
import DeviceItem from './DeviceItem';
import {useBLEContext} from '../../context/useBleContext';

const Devices = () => {
  const {allDevices = [], scanForPeripherals} = useBLEContext();

  const renderItem = ({item}) => {
    return <DeviceItem item={item} />;
  };

  const onRefresh = () => {
    scanForPeripherals();
  };

  console.log('al', allDevices?.length);

  const ListEmptyComponent = () => {
    return (
      <View style={styles.emptyContainer}>
        <ActivityIndicator color="black" />
      </View>
    )
  }

  return (
    <View style={styles.main}>
      <View style={styles.labelConatiner}>
        <Text style={styles.label}>{allDevices?.length} BLE Devices</Text>
      </View>

      <FlatList
        data={allDevices ?? []}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={ListEmptyComponent}
        keyExtractor={item => {
          return `${item?.id}`;
        }}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

export default Devices;
