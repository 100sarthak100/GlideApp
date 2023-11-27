import React, {useEffect, useState} from 'react';
import {Dimensions, FlatList, Text, View} from 'react-native';

import styles from './styles';
import {mockData} from '../../utils/mockDta';
import Row from './Row';

let {width: ScreenWidth, height: ScreenHeight} = Dimensions.get('screen');

const Home = () => {
  let squareWidth = ScreenWidth - 24;
  let squareHeight = ScreenHeight - 24;

  const getMap = () => {
    let data = mockData ?? [];

    let length = mockData?.length;
    let width = mockData?.[0]?.length;

    // console.log('data', data, width, length, ScreenWidth, ScreenHeight);

    let widthOfParts = Math.ceil(squareWidth / width);

    let renderArr = [];

    // console.log("numOfBoxes", numOfBoxes)

    for (let i = 0; i < length; i++) {
      let rowArr = mockData?.[i];
      console.log('rowArr', rowArr);

      for (let j = 0; j < rowArr?.length; j++) {
        let col = rowArr?.[j];
        console.log('col', col);
      }
    }

    return {
      widthOfParts,
    };
  };

  const [mainData, setMainData] = useState({});

  useEffect(() => {
    let dataObj = getMap();

    setMainData(dataObj);
  }, []);

  const renderRow = ({item: row}) => {
    return <Row data={row} w={mainData?.widthOfParts} />;
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'red'
      }}>
      <FlatList
        data={mockData}
        renderItem={renderRow}
        keyExtractor={(row, index) => `${index}`}
        horizontal={false}
        contentContainerStyle={{
            // flex: 1,
            justifyContent: 'center',
            // alignItems: 'center',
            // backgroundColor: 'yellow'
        }}
      />
    </View>
  );
};

export default Home;
