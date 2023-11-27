import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  deviceContainer: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1.5,
    borderColor: '#D1D0CE',
    minHeight: 100,
  },

  main: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 10,
  },

  name: {
    color: 'black',
  },

  label: {
    color: 'black',
    fontSize: 30,
  },

  labelConatiner: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 10,
  },

  emptyContainer: {
    minHeight: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
    borderRadius: 6,
    marginTop: 50,
  },
});

export default styles;
