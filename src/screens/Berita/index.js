import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { newsData } from '../../../data';
import { useNavigation } from '@react-navigation/native';
const navigation = useNavigation();

const NewsComponent = ({ id, title, description, imageUrl }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('BeritaDetail', { blogId: id })}>
      <Image
        source={{ uri: imageUrl }}
        style={styles.image}
      />
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

const NewsScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.judul}>^^ BERITA TARI INDONESIA ^^</Text>
        <Text style={styles.time}>Berita Informasi Terkini </Text>
      </View>

      {newsData.map((news, index) => (
        <NewsComponent
          key={index}
          id={news.id}
          title={news.title}
          description={news.description}
          imageUrl={news.imageUrl}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    backgroundColor: 'black',
    padding: 16,
    paddingBottom: 80,
  },
  container: {
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 15,
    color: 'white',
  },
  judul: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 15,
    color: 'white',
  },
  description: {
    fontSize: 15,
    color: 'gray',
    marginTop: 5,
    textAlign: 'justify',
  },

  time: {
    fontSize: 15,
    color: 'gray',
    marginTop: 5,
    textAlign: 'center',
  },
});

export default NewsScreen;
