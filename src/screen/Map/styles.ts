import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    // backgroundColor: 'blue',
    paddingTop: 20
  },

  bottomView: {
    height: 100,
    width: '100%',
    // backgroundColor: 'gray',
    bottom: 20,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },

  circle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'white',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,

    justifyContent: 'center',
    alignItems: 'center'
  },

  mapView: {
    flex: 1,
    // backgroundColor: 'red',
    marginBottom: 100,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default styles;
