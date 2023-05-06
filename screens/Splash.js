import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';

const Splash = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/bomb.png')} style={styles.logo} />
      <Text style={styles.text}>OMEGA</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
  },
});

export default Splash;
