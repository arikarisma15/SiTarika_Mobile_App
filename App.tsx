import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const LandingPage = () => {
  return (
    <View style={styles.container}>
      {/* <Image
        source={require('android/app/src/assets/logo.png')} // Ganti dengan path gambar yang sesuai
        style={styles.image}
      /> */}
      <Text style={styles.heading}>SITARIKA</Text>
      <Text style={styles.subHeading}>Indonesian Dance Mobile Apps</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Mulai</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EEBE13', // Ganti dengan warna latar yang sesuai
  },
  image: {
    width: 250,
    height: 250,
    marginBottom: 20,
  },
  heading: {
    color:'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subHeading: {
    fontSize: 16,
    color: 'white',
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#007AFF', // Ganti dengan warna tombol yang sesuai
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LandingPage;
