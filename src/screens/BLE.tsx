import React, {useEffect, useState} from 'react';

import useBLE from './useBLE';

import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import DeviceModal from './DeviceModal';

const BLE = () => {
  const {allDevices, connectToDevice, connectedDevice, disconnectFromDevice, scanForPeripherals, requestLocationPermission} = useBLE();

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  useEffect(() => {
    requestLocationPermission();
    scanForDevices();

  }, []);

  const hideModal = () => {
    setIsModalVisible(false);
  };

  const scanForDevices = async () => {
    scanForPeripherals();
  };

  const openModal = async () => {
    setIsModalVisible(true);
  };

  // console.log("allDevices", allDevices)

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.heartRateTitleWrapper}>
        {connectedDevice ? (
        <>
          {/* <PulseIndicator /> */}
          <Text style={styles.heartRateTitleText}>Your Heart Rate Is:</Text>
          <Text style={styles.heartRateText}>{heartRate} bpm</Text>
        </>
      ) : (
        <Text style={styles.heartRateTitleText}>
          Please Connect to a Heart Rate Monitor
        </Text>
      )}
      </View>
      <TouchableOpacity
      onPress={connectedDevice ? disconnectFromDevice : openModal}
      style={styles.ctaButton}
    >
      <Text style={styles.ctaButtonText}>
        {connectedDevice ? "Disconnect" : "Connect"}
      </Text>
    </TouchableOpacity>
      <DeviceModal
        closeModal={hideModal}
        visible={true}
        connectToPeripheral={connectToDevice}
        devices={allDevices}
      />
    </SafeAreaView>
  );
};

export default BLE;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  heartRateTitleWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heartRateTitleText: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginHorizontal: 20,
    color: 'black',
  },
  heartRateText: {
    fontSize: 25,
    marginTop: 15,
  },
  ctaButton: {
    backgroundColor: '#FF6060',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    marginHorizontal: 20,
    marginBottom: 5,
    borderRadius: 8,
  },
  ctaButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});
