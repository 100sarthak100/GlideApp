import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';

import {addCoordinatesToGrid, trilaterate} from '../../utils/mockDta';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import UserArrowIcon from '../../assets/SVG/UserArrowIcon';

const calculateCoordinates = params => {
  const {rowIndex, colIndex, w, h} = params;

  // Assuming each cell has a width and height of w and h
  const x = colIndex * w;
  const y = rowIndex * h;
  return {x, y};
};

const MapBeacons = props => {
  const {grid = [], devices = []} = props;

  const modifiedData = useMemo(() => {
    return addCoordinatesToGrid(grid, devices);
  }, [grid, devices]);

  const [userPos, setUserPos] = useState({x: 0, y: 0});

  const updateUserPosition = () => {
    const newUserPos = trilaterate(
      Object.keys(modifiedData?.deviceMap).map(
        val => modifiedData?.deviceMap[val],
      ),
    );
    setUserPos(newUserPos);
  };

  useEffect(() => {
    updateUserPosition();
  }, [modifiedData?.deviceMap]);

  return (
    <View style={styles.container}>
      {modifiedData?.updatedGrid?.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((cell, colIndex) => {
            let id = cell.metaData.id;
            let val = cell.val;

            let w = cell.metaData.width;
            let h = cell.metaData.height;

            return (
              <View
                key={colIndex}
                style={[
                  styles.cell,
                  {
                    width: w,
                    height: h,
                    backgroundColor:
                      val === 1 ? cell.metaData.color : Colors.lighter,
                  },
                ]}>
                {val === -1 ? (
                  <Text style={styles.obstacle}></Text>
                ) : val === 0 ? (
                  <Text style={styles.emptySlot}></Text>
                ) : (
                  <View style={[styles.beacon]}>
                    <Text style={styles.beaconText}>
                      {modifiedData?.deviceMap?.[id]?.distance}
                    </Text>
                  </View>
                )}
              </View>
            );
          })}
        </View>
      ))}

      {!!userPos && (
        <View
          style={[
            styles.userCell,
            {
              width: 20, // Adjust width as needed
              height: 20, // Adjust height as needed
              // backgroundColor: 'green', // Adjust color as needed
              position: 'absolute',
              left: userPos?.x - 10, // Adjust position based on userPos
              bottom: userPos?.y - 10, // Adjust position based on userPos
            },
          ]}>
          <UserArrowIcon />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: 'pink',
    flexDirection: 'column',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#ccc',
  },
  userCell: {
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 0.5,
    // borderColor: '#ccc',
  },
  emptySlot: {
    fontSize: 14,
  },
  beacon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  beaconText: {
    fontSize: 14,
    color: 'white',
  },
  obstacle: {
    fontSize: 14,
    color: 'black',
  },
});

export default MapBeacons;
