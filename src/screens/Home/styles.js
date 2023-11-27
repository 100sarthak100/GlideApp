import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'pink',
    justifyContent: 'center',
    alignItems: 'center',
  },

  box: {
    width: 300,
    height: 300,
    borderWidth: 1,
    borderColor: 'black',
  },

  spot: {},

  cell: {
    width: 30,
    height: 30,
    // margin: 2,
  },
  parkingSpot: {
    backgroundColor: 'gray',
  },
  emptySpot: {
    backgroundColor: 'black',
  },

  gridContainer: {
    padding: 16,
  },
});

export default styles;
