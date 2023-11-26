import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { newsData } from '../../../data';
import { useNavigation } from '@react-navigation/native';
import { Setting2, Edit, Add } from "iconsax-react-native";
import { colors, fontType } from "../../assets/theme";
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
    <View>
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
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => navigation.navigate("AddBerita")}
      >
        <Add color={colors.white()} variant="Linear" size={20} />
      </TouchableOpacity>
    </View>


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

  floatingButton: {
    backgroundColor: '#FA6512',
    padding: 15,
    position: 'absolute',
    bottom: 24,
    right: 24,
    borderRadius: 10,
    shadowColor: colors.blue(),
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
});

export default NewsScreen;
