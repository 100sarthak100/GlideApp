import {StyleSheet, Text, View} from 'react-native';

const styles = StyleSheet.create({
  deviceContainer: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    backgroundColor: 'lightred',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'black',
    minHeight: 50
  },

  main: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 10,
    backgroundColor: 'pink'
  },

  name: {
    color: 'black'
  }
});

export default styles;
