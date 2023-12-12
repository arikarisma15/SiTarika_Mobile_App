import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native';
import { newsData } from '../../../data';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Setting2, Edit, Add } from "iconsax-react-native";
import { colors, fontType } from "../../assets/theme";
import axios from 'axios';
import firestore from '@react-native-firebase/firestore';

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
  const [loading, setLoading] = useState(true);
  const [blogData, setBlogData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  // const getDataBlog = async () => {
  //   try {
  //     const response = await axios.get(
  //       'https://6567ff2e9927836bd973fa98.mockapi.io/sitarika/Berita',
  //     );
  //     setBlogData(response.data);
  //     setLoading(false)
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const onRefresh = useCallback(() => {
  //   setRefreshing(true);
  //   setTimeout(() => {
  //     getDataBlog()
  //     setRefreshing(false);
  //   }, 1500);
  // }, []);

  // useFocusEffect(
  //   useCallback(() => {
  //     getDataBlog();
  //   }, [])
  // );
  useEffect(() => {
    const subscriber = firestore()
      .collection('berita')
      .onSnapshot(querySnapshot => {
        const blogs = [];
        querySnapshot.forEach(documentSnapshot => {
          blogs.push({
            ...documentSnapshot.data(),
            id: documentSnapshot.id,
          });
        });
        setBlogData(blogs);
        setLoading(false);
      });
    return () => subscriber();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      firestore()
        .collection('blog')
        .onSnapshot(querySnapshot => {
          const blogs = [];
          querySnapshot.forEach(documentSnapshot => {
            blogs.push({
              ...documentSnapshot.data(),
              id: documentSnapshot.id,
            });
          });
          setBlogData(blogs);
        });
      setRefreshing(false);
    }, 1500);
  }, []);
  return (
    <View style={{ flex: 1, backgroundColor: 'black', }}>
      <ScrollView contentContainerStyle={styles.scrollContainer} refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
        <View style={styles.container}>
          <Text style={styles.judul}>^^ BERITA TARI INDONESIA ^^</Text>
          <Text style={styles.time}>Berita Informasi Terkini </Text>
        </View>

        {loading ? (
          <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
            <ActivityIndicator size={'large'} color={colors.blue()} />
          </View>
        ) : (
          blogData.map((news, index) => (
            <NewsComponent
              key={index}
              id={news.id}
              title={news.title}
              description={news.description}
              imageUrl={news.image}
            />
          ))
        )}
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
