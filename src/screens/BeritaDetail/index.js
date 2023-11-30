import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Animated, ActivityIndicator } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Like1, Receipt21, Message, Share, More } from 'iconsax-react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { newsData } from '../../../data';
import FastImage from 'react-native-fast-image';
import { formatDate } from '../../utils/formatDate';
import ActionSheet from 'react-native-actions-sheet';
import { colors, fontType } from '../../assets/theme';
import axios from 'axios';

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
  const [selectedBlog, setSelectedBlog] = useState(null);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);

  const actionSheetRef = useRef(null);

  const openActionSheet = () => {
    actionSheetRef.current?.show();
  };

  const closeActionSheet = () => {
    actionSheetRef.current?.hide();
  };

  useEffect(() => {
    getBlogById();
  }, [blogId]);

  const getBlogById = async () => {
    try {
      const response = await axios.get(
        `https://6567ff2e9927836bd973fa98.mockapi.io/sitarika/Berita/${blogId}`,
      );
      setSelectedBlog(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const navigateEdit = () => {
    closeActionSheet()
    navigation.navigate('EditBerita', { blogId })
  }
  const handleDelete = async () => {
    await axios.delete(`https://6567ff2e9927836bd973fa98.mockapi.io/sitarika/Berita/${blogId}`)
      .then(() => {
        closeActionSheet()
        navigation.navigate('Berita');
      })
      .catch((error) => {
        console.error(error);
      });
  }
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
          <TouchableOpacity onPress={openActionSheet}>
            <More
              color={'white'}
              variant="Linear"
            />
          </TouchableOpacity>
        </View>
      </Animated.View>
      {loading ? (
        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
          <ActivityIndicator size={'large'} color={colors.blue()} />
        </View>
      ) : (
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
              uri: selectedBlog.image,
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
              <Text style={{ color: 'black', fontWeight: '300', fontSize: 12 }}>{formatDate(selectedBlog?.createdAt)}</Text>
            </View>
          </View>
          {/* <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 15,
            }}>
            <Text style={styles.category}>{selectedBlog.category}</Text>
          </View> */}
          <Text style={styles.title}>{selectedBlog.title}</Text>
          <Text style={styles.content}>{selectedBlog.description}</Text>
        </Animated.ScrollView>
      )}
      <ActionSheet
        ref={actionSheetRef}
        containerStyle={{
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
        }}
        indicatorStyle={{
          width: 100,
        }}
        gestureEnabled={true}
        defaultOverlayOpacity={0.3}>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 15,
          }}
          onPress={navigateEdit}
        >
          <Text
            style={{
              fontFamily: fontType['Pjs-Medium'],
              color: colors.black(),
              fontSize: 18,
            }}>
            Edit
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 15,
          }}
          onPress={handleDelete}>
          <Text
            style={{
              fontFamily: fontType['Pjs-Medium'],
              color: colors.black(),
              fontSize: 18,
            }}>
            Delete
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 15,
          }}
          onPress={closeActionSheet}>
          <Text
            style={{
              fontFamily: fontType['Pjs-Medium'],
              color: 'red',
              fontSize: 18,
            }}>
            Cancel
          </Text>
        </TouchableOpacity>
      </ActionSheet>
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