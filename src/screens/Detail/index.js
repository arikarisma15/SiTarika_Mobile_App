import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

const NewsComponent = ({ title, description, imageUrl }) => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: imageUrl }}
        style={styles.image}
      />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

const NewsScreen = () => {
  
  const newsData = [
    {
      title: 'Joe Biden Tersenyum Turun dari Pesawat Disambut Tari Pendet',
      description: 'Instagram Live G20 Indonesia menayangkan kedatangan Joe Biden di Bali. Tarian khas Bali langsung menyambutnya yang turun dari pesawat dan berjalan menuju mobil. Ia tampak tersenyum.(Senin, 30 Agu 2022 16:54 ~ infoBali)  ',
      imageUrl: 'https://i.pinimg.com/originals/42/73/11/427311dc24f2297f8d8df36cc5c6cf95.jpg',
    },
    {
      title: 'Wisatawan Kepincut Sendratari Meras Gandrung Banyuwangi',
      description: 'Ini pertama kalinya saya berkunjung ke Banyuwangi. Sangat menarik pentas seni ini, bercerita tentang bagaimana menjadi seorang Gandrung. Dan lokasi pertunjukannya juga sangat keren," kata Ari saat melihat Meras Gandrung pada Rabu (22/3/2023)',
      imageUrl: 'https://i.pinimg.com/originals/92/bd/b3/92bdb36d69ac2d460a7a8b1a5b392c9f.jpg',
    },
    {
      title: 'Tarian Jawa Tengah Bikin Kagum',
      description: 'Tari Gambyong adalah salah satu tarian tradisional Jawa yang kaya akan sejarah dan budaya Indonesia. Tarian ini sering kali dipentaskan dalam berbagai upacara adat, seperti pernikahan, upacara adat, atau acara budaya, dan memiliki makna mendalam di balik gerakan-gerakan yang dilakukan.Tarian ini sudah ada sejak zaman dahulu dan mulai ditampilkan di lingkungan Istana Mangkunegaran pada era 1916-1944 yang sangat terkenal padan jaman itu. (Senin, 22 Agu 2022 16:54 ~ detikJateng)',
      imageUrl: 'https://i.pinimg.com/564x/c7/a4/f4/c7a4f4c6451828baa66311f7f1ea4487.jpg',
    },
    
  ];

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
   <View style={styles.container}>
      <Text style={styles.judul}>^^ BERITA TARI INDONESIA ^^</Text>
      <Text style={styles.time}>Berita Informasi Terkini </Text>
    </View>

      {newsData.map((news, index) => (
        <NewsComponent
          key={index}
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
    paddingBottom: 80, // Mengatur margin bawah untuk memberi ruang bagi konten di bawahnya
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
