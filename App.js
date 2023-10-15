import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity, TouchableWithoutFeedback, Modal, Alert, ImageBackground, TextInput, Button } from 'react-native';
import { Notification, SearchNormal, Receipt21, Clock, Message, ArrowRight2, } from 'iconsax-react-native';
import { fontType, colors } from './src/assets/theme';

const HomeScreen = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');

  const handleSearchPress = (text) => {
    setSearchText(text);
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleProfilePress = () => {
    toggleModal();
  };

  const handleEditProfile = () => {
    toggleModal();
   
  };

  const handleLogout = () => {
    toggleModal();
    
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.imageBanner}>
          <View style={styles.header}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>SITARIKA</Text>
            </View>
            <View style={styles.notificationContainer}>
              <Notification color={colors.black()} variant="Linear" size={24} />
            </View>
            <View style={styles.profileContainer}>
              <TouchableOpacity onPress={handleProfilePress}>
                <Image
                  source={{
                    uri: 'https://i.pinimg.com/originals/2d/2c/06/2d2c06aacc7543bbeecf4e6f136f3b29.jpg',
                  }}
                  style={styles.profileImage}
                />
              </TouchableOpacity>
            </View>


          </View>
          <View style={styles.header}>
            <Text style={styles.title}>Welcome , Arika</Text>
          </View>
          <View style={{ paddingHorizontal: 24, marginTop: 10, }}>
            <View style={styles.searchContainer}>
              <TextInput
                style={styles.input}
                placeholder="Cari Tarian ..."
                onChangeText={handleSearchPress}
                value={searchText}
                placeholderTextColor="gray"
              />
              <View style={styles.searchButtonContainer}>
                <TouchableOpacity style={styles.searchButton}>
                  <SearchNormal color={colors.black()} variant="Linear" size={24} style={styles.icon} />
                </TouchableOpacity>
              </View>
            </View>

          </View>
        </View>
        <JelajahiTarian />
        <TariPopuler />
        <KategoriTarian/>
        <InfoTari />
      </ScrollView>
      <Modal
        visible={isModalVisible}
        animationType="none"
        transparent={true}
        onRequestClose={toggleModal}
      >
        <TouchableWithoutFeedback onPress={toggleModal}>
          <View style={styles.overlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Profil Anda</Text>
              <TouchableOpacity onPress={handleEditProfile}>
                <Text style={styles.modalItem}>Edit Profil</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleLogout}>
                <Text style={styles.modalItem}>Logout</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={toggleModal}>
                <Text style={styles.modalItem}>Batal</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>

  );
};

const JelajahiTarian = () => {
  return (
    <View style={styles.headerSeniDaerah}>
      <View style={styles.TariPopulerTitleContainer}>
        <Text style={styles.textSeni}>Jelajahi Tarian Daerah</Text>
        <ArrowRight2 color={colors.black()} variant="Linear" size={20} />
      </View>
      <View style={styles.listBlog}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal
          contentContainerStyle={{ gap: 15 }}>
          <View style={{ ...itemSeniDaerah.cardItem, marginLeft: 0 }}>
            <ImageBackground
              style={itemSeniDaerah.cardImage}
              resizeMode="cover"
              imageStyle={{ borderRadius: 15 }}
              source={{
                uri: 'https://i.pinimg.com/originals/58/8b/99/588b99846fc1cbb8931753142614aaf0.jpg',
              }}
            >
              <View style={itemSeniDaerah.cardContent}>
                <View style={itemSeniDaerah.cardInfo}>
                  <Text style={itemSeniDaerah.cardTitle}>
                    Jawa Timur
                  </Text>
                </View>
              </View>
            </ImageBackground>
          </View>
          <View style={{ ...itemSeniDaerah.cardItem, marginLeft: 0 }}>
            <ImageBackground
              style={itemSeniDaerah.cardImage}
              resizeMode="cover"
              imageStyle={{ borderRadius: 15 }}
              source={{
                uri: 'https://www.itiakladomudo.com/wp-content/uploads/2017/11/rumah-gadang-minangkabau-570x320.jpg',
              }}
            >
              <View style={itemSeniDaerah.cardContent}>
                <View style={itemSeniDaerah.cardInfo}>
                  <Text style={itemSeniDaerah.cardTitle}>
                    Sumatra Barat
                  </Text>
                </View>
              </View>
            </ImageBackground>
          </View>

        </ScrollView>
      </View>
    </View>
  );
};

const TariPopuler = () => {
  return (
    <View style={styles.headerTariPopuler}>
      <View style={styles.TariPopulerTitleContainer}>
        <Text style={styles.textSeni}>Tarian Terpopular</Text>
        <ArrowRight2 color={colors.black()} variant="Linear" size={20} />
      </View>

      <View style={styles.listBlog}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal
          contentContainerStyle={{ gap: 20 }}>
          <View style={{ ...itemTariPopuler.cardItem, marginLeft: 0 }}>
            <ImageBackground
              style={itemTariPopuler.cardImage}
              resizeMode="cover"
              imageStyle={{ borderRadius: 15 }}
              source={{
                uri: 'https://i.pinimg.com/originals/fc/d6/47/fcd6476b9703c94af865a5aeeb510b03.jpg',
              }}
            >
              <View style={itemTariPopuler.cardContent}>
                <View style={itemTariPopuler.textContainer}>
                  <Text style={itemTariPopuler.cardTitle}>Tari Gandrung</Text>
                  <Text style={itemTariPopuler.cardText}> Tari Gandrung yang merupakan tarian khas Banyuwangi yang dibawakan sebagai perwujudan rasa syukur masyarakat setelah panen.</Text>
                </View>

              </View>
            </ImageBackground>
          </View>
          <View style={itemTariPopuler.cardItem}>
            <ImageBackground
              style={itemTariPopuler.cardImage}
              resizeMode="cover"
              imageStyle={{ borderRadius: 15 }}
              source={{
                uri: 'https://i.pinimg.com/originals/c3/11/1a/c3111a6bdc0db98a1e740b5bcce12bec.jpg',
              }}
            >
              <View style={itemTariPopuler.cardContent}>
                <View style={itemTariPopuler.textContainer}>
                  <Text style={itemTariPopuler.cardTitle}>Tari Piring</Text>
                  <Text style={itemTariPopuler.cardText}>Tari piring adalah sebuah tarian tradisional yang berasal dari daerah Solok, Sumatera Barat.</Text>
                </View>
                {/* <View style={itemTariPopuler.cardIcon}>
                  <ArrowRight2 color={colors.white()} variant="Linear" size={20} />
                </View> */}
              </View>
            </ImageBackground>
          </View>
          <View style={itemTariPopuler.cardItem}>
            <ImageBackground
              style={itemTariPopuler.cardImage}
              resizeMode="cover"
              imageStyle={{ borderRadius: 15 }}
              source={{
                uri: 'https://i.pinimg.com/originals/65/3f/98/653f985a33fe6e825435311ae017dcd5.jpg',
              }}
            >
              <View style={itemTariPopuler.cardContent}>
                <View style={itemTariPopuler.textContainer}>
                  <Text style={itemTariPopuler.cardTitle}>Tari Pendet</Text>
                  <Text style={itemTariPopuler.cardText}>Tari Pendet adalah sebuah tari Bali sebagai persembahan untuk para leluhur. Tari Pendet disebut juga Tari Bhatara atau Bhatari.</Text>
                </View>
                {/* <View style={itemTariPopuler.cardIcon}>
                  <ArrowRight2 color={colors.white()} variant="Linear" size={20} />
                </View> */}
              </View>
            </ImageBackground>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const KategoriTarian = () => {
  return (
    <View style={styles.headerTariPopuler}>
      <View style={styles.TariPopulerTitleContainer}>
        <Text style={styles.textSeni}>Kategori Tarian</Text>
        <ArrowRight2 color={colors.black()} variant="Linear" size={20} />
      </View>

      <View style={styles.listBlog}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal
          contentContainerStyle={{ gap: 20 }}>
          <View style={{ ...itemKategori.cardItem, marginLeft: 0 }}>
            <ImageBackground
              style={itemKategori.cardImage}
              resizeMode="cover"
              imageStyle={{ borderRadius: 15 }}
              source={{
                uri: 'https://i.pinimg.com/originals/31/df/3f/31df3f8d29f82dd1ea24a1c3e64ea263.jpg',
              }}
            >
              <View style={itemKategori.cardContent}>
                <View style={itemKategori.textContainer}>
                  <Text style={itemKategori.cardTitle}>Sendratari</Text>
                </View>

              </View>
            </ImageBackground>
          </View>
          <View style={{ ...itemKategori.cardItem, marginLeft: 0 }}>
            <ImageBackground
              style={itemKategori.cardImage}
              resizeMode="cover"
              imageStyle={{ borderRadius: 15 }}
              source={{
                uri: 'https://i.pinimg.com/originals/2d/2c/06/2d2c06aacc7543bbeecf4e6f136f3b29.jpg',
              }}
            >
              <View style={itemKategori.cardContent}>
                <View style={itemKategori.textContainer}>
                  <Text style={itemKategori.cardTitle}>Tari Daerah</Text>
                 
                </View>

              </View>
            </ImageBackground>
          </View>
        </ScrollView>
      </View>

      
    </View>
  );
};

const InfoTari = () => {
  return (
    <View style={styles.headerSeniDaerah}>
      <View style={styles.TariPopulerTitleContainer}>
        <Text style={styles.textSeni}>Informasi Tarian Daerah</Text>
        <ArrowRight2 color={colors.black()} variant="Linear" size={20} />
      </View>
      <View style={infoTari.listCard}>
        <View style={infoTari.cardItem}>
          <Image
            style={infoTari.cardImage}
            source={{
              uri: 'https://pariwisata.kepulauanselayarkab.go.id/wp-content/uploads/2017/02/Tari-Padupa.jpg',
            }}
          />
          <View style={infoTari.cardContent}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View style={{ gap: 5, width: '70%' }}>
                <Text style={infoTari.cardCategory}>Tari Paduppa</Text>
                <Text style={infoTari.cardTitle}>
                  Mengenal Tari Paduppa, Tarian Penyambutan Tamu Khas Suku Bugis
                </Text>
              </View>
              <Receipt21
                color={colors.grey(0.6)}
                variant="Linear"
                size={20}
              />
            </View>
            <View style={infoTari.cardInfo}>
              <Clock
                size={10}
                variant="Linear"
                color={colors.grey(0.6)}
              />
              <Text style={infoTari.cardText}>15 Oktober 2023</Text>
              {/* <Message
                size={10}
                variant="Linear"
                color={colors.grey(0.6)}
              />
              <Text style={infoTari.cardText}>89</Text> */}
            </View>
          </View>
        </View>

      </View>
      <View style={infoTari.listCard}>
        <View style={infoTari.cardItem}>
          <Image
            style={infoTari.cardImage}
            source={{
              uri: 'https://i.pinimg.com/originals/16/1e/8e/161e8e54b3c2dc7b7bd65c9be0f74a93.jpg',
            }}
          />
          <View style={infoTari.cardContent}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View style={{ gap: 5, width: '70%' }}>
                <Text style={infoTari.cardCategory}>Asia Arts Festival</Text>
                <Text style={infoTari.cardTitle}>
                  Bawakan Tari Tradisional, Delegasi Indonesia Raih 11 Emas
                </Text>
              </View>
              <Receipt21
                color={colors.grey(0.6)}
                variant="Linear"
                size={20}
              />
            </View>
            <View style={infoTari.cardInfo}>
              <Clock
                size={10}
                variant="Linear"
                color={colors.grey(0.6)}
              />
              <Text style={infoTari.cardText}>24 Juli 2023</Text>
              {/* <Message
                size={10}
                variant="Linear"
                color={colors.grey(0.6)}
              />
              <Text style={infoTari.cardText}>89</Text> */}
            </View>
          </View>
        </View>

      </View>
    </View>

  );
};


const infoTari = StyleSheet.create({
  listCard: {
    paddingVertical: 10,
  },
  cardItem: {
    backgroundColor: '#E7E3DB',
    flexDirection: 'row',
    borderRadius: 10,
  },
  cardCategory: {
    color: 'rgba(168, 107, 71, 1)',
    fontSize: 10,
    fontFamily: fontType['Pjs-SemiBold'],
  },
  cardTitle: {
    fontSize: 12,
    fontFamily: fontType['Pjs-Bold'],
    color: colors.black(),
  },
  cardText: {
    fontSize: 10,
    fontFamily: fontType['Pjs-Medium'],
    color: 'rgba(168, 107, 71, 0.6)',
  },
  cardImage: {
    width: 100,
    height: 'auto',
    borderRadius: 10,
    resizeMode: 'cover',
  },
  cardInfo: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },
  cardContent: {
    gap: 10,
    justifyContent: 'space-between',
    paddingRight: 10,
    paddingLeft: 15,
    flex: 1,
    paddingVertical: 10,
  },
});
const itemKategori = StyleSheet.create({
  cardItem: {
    width: 'auto',
  },
  cardImage: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },
  cardContent: {
    flexDirection: 'row',
    // justifyContent: 'flex-end',
    padding: 15,
    position: 'absolute',
    bottom: 0,
  },
  cardInfo: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    height: '100%',
    gap: 10,
    maxWidth: '100%',
  },
  cardTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingTop: 8,
  },
  textContainer: {
    flex: 1,
    paddingRight: 8,
  },
  cardTitle: {
    fontFamily: fontType['Pjs-Bold'],
    fontSize: 12,
    color: colors.white(),
  },
  cardText: {
    fontSize: 10,
    color: colors.white(),
    fontFamily: fontType['Pjs-Medium'],
  },
  cardIcon: {
    backgroundColor: colors.black(0.5),
    padding: 5,
    borderColor: colors.white(),
    borderWidth: 0.5,
    borderRadius: 5,
    width: 30,
    height: 30,
  },
})
const itemTariPopuler = StyleSheet.create({
  cardItem: {
    width: 'auto',
  },
  cardImage: {
    width: 200,
    height: 300,
    borderRadius: 5,
  },
  cardContent: {
    flexDirection: 'row',
    // justifyContent: 'flex-end',
    padding: 15,
    position: 'absolute',
    bottom: 0,
  },
  cardInfo: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    height: '100%',
    gap: 10,
    maxWidth: '100%',
  },
  cardTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingTop: 8,
  },
  textContainer: {
    flex: 1,
    paddingRight: 8,
  },
  cardTitle: {
    fontFamily: fontType['Pjs-Bold'],
    fontSize: 14,
    color: colors.white(),
  },
  cardText: {
    fontSize: 10,
    color: colors.white(),
    fontFamily: fontType['Pjs-Medium'],
  },
  cardIcon: {
    backgroundColor: colors.black(0.5),
    padding: 5,
    borderColor: colors.white(),
    borderWidth: 0.5,
    borderRadius: 5,
    width: 30,
    height: 30,
  },
})
const itemSeniDaerah = StyleSheet.create({
  cardItem: {
    width: 'auto',
  },
  cardImage: {
    width: 200,
    height: 100,
    borderRadius: 5,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
  },
  cardInfo: {
    justifyContent: 'flex-end',
    height: '100%',
    gap: 10,
    maxWidth: '60%',
  },
  cardTitle: {
    fontFamily: fontType['Pjs-Bold'],
    fontSize: 14,
    color: colors.white(),
  },
  cardText: {
    fontSize: 10,
    color: colors.white(),
    fontFamily: fontType['Pjs-Medium'],
  },
  cardIcon: {
    backgroundColor: colors.white(0.33),
    padding: 5,
    borderColor: colors.white(),
    borderWidth: 0.5,
    borderRadius: 5,
  },
});
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white(),
  },
  imageBanner: {
    backgroundColor: '#060606',
    width: 'auto',
    height: 200,
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
  },
  header: {
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    height: 52,
    elevation: 8,
    paddingTop: 8,
    paddingBottom: 4
  },
  headerTariPopuler: {
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  headerSeniDaerah: {
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    marginRight: 20,
    fontFamily: fontType['Pjs-ExtraBold'],
    color: colors.white(),
  },
  textSeni: {
    fontSize: 20,
    marginRight: 8,
    fontFamily: fontType['Pjs-ExtraBold'],
    color: colors.black(),
  },
  notificationContainer: {
    // backgroundColor: 'white',
    // padding: 8,
    // borderRadius: 100
  },
  profileContainer: {
    marginLeft: 16,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchButtonContainer: {
    paddingLeft: 14,
  },
  searchButton: {
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: 'black',
    backgroundColor: '#F6B50C',
  },
  icon: {
    margin: 8,
    // marginRight: 8,
  },
  input: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: 'black',
    paddingHorizontal: 14,
    paddingVertical: 2,
    color: 'black',
    height: 45,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    position: 'absolute',
    top: 60,
    right: 25,
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: 'black',

  },
  modalItem: {
    fontSize: 16,
    marginBottom: 12,
    color: 'black',
  },
  listCategory: {
    paddingVertical: 10,
  },
  listBlog: {
    paddingVertical: 10,
    gap: 0,
  },
  TariPopulerTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

});
const category = StyleSheet.create({
  item: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 25,
    alignItems: 'center',
    backgroundColor: colors.grey(0.08),
    marginHorizontal: 5
  },
  title: {
    fontFamily: fontType['Pjs-SemiBold'],
    fontSize: 14,
    lineHeight: 18,
    color: colors.grey(),
  },
})

export default HomeScreen;