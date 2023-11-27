import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  textFocused: {
    color: 'blue',
    fontWeight: 'bold',
    paddingVertical: 4,
  },

  textInactive: {
    color: 'gray',
    paddingVertical: 4,
  },

  tabContainer: {
    paddingVertical: 13,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center'
  },

  iconStyleFocues: {
    color: 'blue'
  },

  iconStyleInactive: {
    color: 'gray'
  }
});

export default styles;
