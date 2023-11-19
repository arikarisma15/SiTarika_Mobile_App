import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Animated } from 'react-native';
import React, { useState, useRef } from 'react';
import { ArrowLeft, Like1, Receipt21, Message, Share, More } from 'iconsax-react-native';
import { useNavigation } from '@react-navigation/native';
import { newsData } from '../../../data';
import FastImage from 'react-native-fast-image';
const formatNumber = number => {
  if (number >= 1000000000) {
    return (number / 1000000000).toFixed(1).replace(/\.0$/, '') + 'B';
  }
  if (number >= 1000000) {
    return (number / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (number >= 1000) {
    return (number / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  return number.toString();
};
const BeritaDetail = ({ route }) => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const diffClampY = Animated.diffClamp(scrollY, 0, 52);
  const headerY = diffClampY.interpolate({
    inputRange: [0, 52],
    outputRange: [0, -52],
  });
  const bottomBarY = diffClampY.interpolate({
    inputRange: [0, 52],
    outputRange: [0, 52],
  });
  const { blogId } = route.params;
  const [iconStates, setIconStates] = useState({
    liked: { variant: 'Linear', color: 'black' },
    bookmarked: { variant: 'Linear', color: 'black' },
  });
  const selectedBlog = newsData.find(blog => blog.id === blogId);
  const navigation = useNavigation();
  const toggleIcon = iconName => {
    setIconStates(prevStates => ({
      ...prevStates,
      [iconName]: {
        variant: prevStates[iconName].variant === 'Linear' ? 'Bold' : 'Linear',
        color:
          prevStates[iconName].variant === 'Linear'
            ? 'blue'
            : 'black',
      },
    }));
  };
  return (
    <View style={styles.container}>
      <Animated.View style={[styles.header, { transform: [{ translateY: headerY }] }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft
            color={'white'}
            variant="Linear"
            size={24}
          />
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 20 }}>
          <More
            color={'white'}
            variant="Linear"
          />
        </View>
      </Animated.View>
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true },
        )}
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingTop: 62,
          paddingBottom: 54,
        }}>
        <FastImage
          style={styles.image}
          source={{
            uri: selectedBlog.imageUrl,
            headers: { Authorization: 'someAuthToken' },
            priority: FastImage.priority.high,
          }}
          resizeMode={FastImage.resizeMode.cover}>
        </FastImage>
        <View style={styles.profileContainer}>
          <FastImage
            source={{
              uri: 'https://i.pinimg.com/564x/54/8a/65/548a659c2b06a877516d3c998f5b0939.jpg',
              headers: { Authorization: 'someAuthToken' },
              priority: FastImage.priority.high,
            }}
            style={styles.profileImage}
          />
          <View style={{ marginLeft: 10 }}>
            <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 14 }}>{selectedBlog.uploadBy}</Text>
            <Text style={{ color: 'black', fontWeight: '300', fontSize: 12 }}>{selectedBlog.createdAt}</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 15,
          }}>
          <Text style={styles.category}>{selectedBlog.category}</Text>
        </View>
        <Text style={styles.title}>{selectedBlog.title}</Text>
        <Text style={styles.content}>{selectedBlog.description}</Text>
      </Animated.ScrollView>
    </View>
  );
};
export default BeritaDetail;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  profileContainer: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  header: {
    paddingHorizontal: 24,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    height: 52,
    paddingTop: 8,
    paddingBottom: 4,
    position: 'absolute',
    zIndex: 1000,
    top: 0,
    right: 0,
    left: 0,
    backgroundColor: '#060606',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  image: {
    height: 200,
    width: 'auto',
    borderRadius: 15,
  },
  info: {
    color: 'black',
    fontSize: 12,
  },
  category: {
    backgroundColor: 'rgb(252, 186, 3)',
    borderRadius: 50,
    padding: 10,
    color: 'white',
    fontSize: 12,
  },
  title: {
    fontSize: 20,
    color: 'black',
    marginTop: 10,
  },
  content: {
    color: 'black',
    fontSize: 14,
    lineHeight: 20,
    marginTop: 15,
    textAlign: 'justify',
  },
});