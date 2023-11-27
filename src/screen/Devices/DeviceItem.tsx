import React from 'react';
import {Text, View} from 'react-native';

import styles from './styles';

const DeviceItem = props => {
  const {item = {}} = props;

  return (
    <View style={styles.deviceContainer}>
      <Text style={styles.name}>{item?.name ?? item?.id}</Text>
      <Text style={styles.name}>RSSI: {item?.rssi}</Text>

      <Text style={styles.name}>DIST: {item?.dist}</Text>
    </View>
  );
};

export default DeviceItem;
