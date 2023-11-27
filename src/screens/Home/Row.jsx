import React from 'react';
import {FlatList, TouchableOpacity, View} from 'react-native';

import styles from './styles';
import CarIcon from '../../assets/SVG/CarIcon';

const Row = props => {
  const {data, w} = props;

  const renderItem = ({item}) => {
    if (item.val === -2) {
      return (
        <View
          style={[
            styles.cell,
            styles.emptySpot,
            {
              width: w,
            },
          ]}
        />
      );
    } else if (item.val === -1) {
      return (
        <View
          style={[
            styles.cell,
            styles.parkingSpot,
            {
              width: w,
            },
          ]}
        />
      );
    } else if (item.val === 1) {
      return (
        <TouchableOpacity
          style={[
            styles.cell,
            styles.parkingSpot,
            {
              justifyContent: 'center',
              alignItems: 'center',
              width: w,
            },
          ]}>
          <CarIcon width={30} height={30} />
        </TouchableOpacity>
      );
    }
    return null;
  };

  return (
    <View
      style={{
        flex: 1,
      }}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(cell, index) => `${index}`}
        horizontal
      />
    </View>
  );
};

export default Row;
