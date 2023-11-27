import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

import styles from './styles';
import {beaconCoords} from '../../utils/mockDta';
import QRScanIcon from '../../assets/SVG/QRScanIcon';
import {useBLEContext} from '../../context/useBleContext';
import MapBeacons from '../../screens/MapBeacons/MapBeacons';
import ModifiedMap from '../../screens/MapBeacons/ModifiedMap';

const Map = () => {
  const {allDevices} = useBLEContext();

  return (
    <View style={styles.root}>
      <View style={styles.mapView}>
        <MapBeacons devices={allDevices} grid={beaconCoords} />
      </View>

      <View style={styles.bottomView}>
        <TouchableOpacity style={styles.circle}>
          <QRScanIcon />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Map;
