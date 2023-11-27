/* eslint-disable no-bitwise */
import base64 from 'react-native-base64';
import {useMemo, useState} from 'react';

import {
  Device,
  BleError,
  BleManager,
  Characteristic,
  ScanMode,
} from 'react-native-ble-plx';

import {debounce} from 'lodash';

import {
  RESULTS,
  PERMISSIONS,
  openSettings,
  checkNotifications,
  check as checkPermission,
  checkMultiple as checkMultiplePermission,
  request as requestPermissions,
  requestMultiple as requestMultiplePermissions,
} from 'react-native-permissions';

interface BluetoothLowEnergyApi {
  requestPermissions(): Promise<boolean>;
  requestLocationPermission(): void;
  scanForPeripherals(): void;
  connectToDevice: (deviceId: Device) => Promise<void>;
  disconnectFromDevice: () => void;
  connectedDevice: Device | null;
  allDevices: Device[];
  heartRate: number;
}

function useBLE(): BluetoothLowEnergyApi {
  const [scanning, setScanning] = useState(false);

  const bleManager = useMemo(() => new BleManager(), []);
  const [allDevices, setAllDevices] = useState<Device[]>([]);
  const [connectedDevice, setConnectedDevice] = useState<Device | null>(null);

  const DEBOUNCE_INTERVAL = 500;
  const debouncedSetAllDevices = debounce(setAllDevices, DEBOUNCE_INTERVAL);

  const permissions = [
    PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
    PERMISSIONS.ANDROID.BLUETOOTH_SCAN,
    PERMISSIONS.ANDROID.BLUETOOTH_ADVERTISE,
  ];

  const checkAllPermission = async () => {
    return new Promise((resolve, reject) => {
      checkMultiplePermission(permissions).then(statuses => {
        const p1 =
          statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION] === 'granted';
        const p2 =
          statuses[PERMISSIONS.ANDROID.BLUETOOTH_CONNECT] === 'granted';
        const p3 = statuses[PERMISSIONS.ANDROID.BLUETOOTH_SCAN] === 'granted';
        const p4 =
          statuses[PERMISSIONS.ANDROID.BLUETOOTH_ADVERTISE] === 'granted';

        let noPermissionList = [];

        if (!p1) {
          noPermissionList.push(permissions?.[0]);
        }

        if (!p2) {
          noPermissionList.push(permissions?.[1]);
        }

        if (!p3) {
          noPermissionList.push(permissions?.[2]);
        }

        if (!p4) {
          noPermissionList.push(permissions?.[3]);
        }

        console.log('statuses', noPermissionList);

        requestMultiplePermissions(noPermissionList)
          .then(result => {
            console.log('status2', result);

            for (let m in result) {
              console.log('m', m);
              if (result?.[m] !== 'granted') {
                resolve({
                  ok: false,
                  msg: `${m} permission denied`,
                });
              }
            }

            resolve({
              ok: true,
              msg: 'Access Granted',
            });
          })
          .catch(error => {
            // Alert.alert('Alert', error);
            reject(error);
          });
      });
    });
  };

  const isDuplicateDevice = (devices: Device[], nextDevice: Device) =>
    devices.findIndex(device => nextDevice.id === device.id) > -1;

  function calculateDistance(rssi, txPower) {
    const n = 2.0; // Path loss exponent

    // Calculate distance using the provided formula
    return rssi ? Math.pow(10, (-75 - rssi) / (10 * 3)) : -1;
  }

  const callbackFunc = (error, device) => {
    // console.log('res', error, device);

    if (error) {
      console.log('error', error);
    }

    if (device) {
      debouncedSetAllDevices((prevState: Device[]) => {
        let updatedDevices = [...prevState];

        if (!isDuplicateDevice(prevState, device)) {
          let newObj = {
            ...device,
            dist: -1,
            numOfSamples: 0,
            distanceBuffer: [-1, -1, -1],
          };
          updatedDevices.push(newObj);
        } else {
          // Update existing device
          let index = updatedDevices.findIndex(d => d.id === device.id);
          let prevDev = updatedDevices[index];

          let numOfSamples = prevDev?.numOfSamples ?? 0;
          let dist = prevDev?.dist ?? -1;
          let distanceBuffer = prevDev?.distanceBuffer ?? [-1, -1, -1];

          // Check for uninitialized or invalid RSSI and power
          let currentRSSI = device?.rssi;
          let currentPower = device?.txPowerLevel;

          if (currentRSSI !== undefined && currentPower !== undefined) {
            // Calculate distance based on the received signal strength indicator (RSSI) and transmit power
            let currentDistance = calculateDistance(currentRSSI, currentPower);

            // Update distanceBuffer only if there's a significant change in distance
            if (
              Math.abs(currentDistance - distanceBuffer[numOfSamples % 3]) > 0.1
            ) {
              distanceBuffer[numOfSamples % 3] = currentDistance;
            }

            if (distanceBuffer.includes(-1)) {
              dist = -1;
            } else {
              // Weighted average calculation
              const weights = [0.4, 0.3, 0.3]; // Adjust weights based on preference
              const weightedSum = distanceBuffer.reduce(
                (sum, value, index) => sum + value * weights[index],
                0,
              );
              dist = Math.round(weightedSum);
            }
          }

          let updatedObj = {
            ...device,
            dist,
            numOfSamples: ++numOfSamples,
            distanceBuffer,
          };

          // Update the existing device in the list
          updatedDevices[index] = updatedObj;

          // Remove the device if data is not changing and numOfSamples is low and not changing
          if (
            numOfSamples < 5 && // Low numOfSamples threshold (adjust as needed)
            distanceBuffer.every(val => val === -1) // Check if distanceBuffer is not changing
          ) {
            console.log('name', device?.name);
            updatedDevices = updatedDevices.filter(d => d.id !== device.id);
          }
        }

        // Sort the devices based on some criteria, e.g., device ID
        updatedDevices.sort((a, b) => a.id.localeCompare(b.id));


        // console.log('updatedDevices', updatedDevices);
        return updatedDevices;
      });
    }
  };

  const scanForPeripherals = () => {
    bleManager.startDeviceScan(
      null,
      {
        allowDuplicates: true,
        scanMode: ScanMode.LowPower,
      },
      callbackFunc,
    );
  };

  const connectToDevice = async (device: Device) => {
    try {
      const deviceConnection = await bleManager.connectToDevice(device.id);
      setConnectedDevice(deviceConnection);
      await deviceConnection.discoverAllServicesAndCharacteristics();
      bleManager.stopDeviceScan();
      // startStreamingData(deviceConnection);
    } catch (e) {
      console.log('FAILED TO CONNECT', e);
    }
  };

  const disconnectFromDevice = () => {
    if (connectedDevice) {
      bleManager.cancelDeviceConnection(connectedDevice.id);
      setConnectedDevice(null);
      // setHeartRate(0);
    }
  };

  // const onHeartRateUpdate = (
  //   error: BleError | null,
  //   characteristic: Characteristic | null
  // ) => {
  //   if (error) {
  //     console.log(error);
  //     return -1;
  //   } else if (!characteristic?.value) {
  //     console.log("No Data was recieved");
  //     return -1;
  //   }

  //   const rawData = base64.decode(characteristic.value);
  //   let innerHeartRate: number = -1;

  //   const firstBitValue: number = Number(rawData) & 0x01;

  //   if (firstBitValue === 0) {
  //     innerHeartRate = rawData[1].charCodeAt(0);
  //   } else {
  //     innerHeartRate =
  //       Number(rawData[1].charCodeAt(0) << 8) +
  //       Number(rawData[2].charCodeAt(2));
  //   }

  //   setHeartRate(innerHeartRate);
  // };

  // const startStreamingData = async (device: Device) => {
  //   if (device) {
  //     device.monitorCharacteristicForService(
  //       HEART_RATE_UUID,
  //       HEART_RATE_CHARACTERISTIC,
  //       onHeartRateUpdate
  //     );
  //   } else {
  //   }  //     console.("No Device Connected");

  // };

  // console.log("allDevices", allDevices)
  return {
    scanning,
    checkAllPermission,
    scanForPeripherals,
    connectToDevice,
    allDevices,
    connectedDevice,
    disconnectFromDevice,
    // heartRate,
  };
}

export default useBLE;
