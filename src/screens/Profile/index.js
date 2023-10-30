import React from 'react';
import { View, Text, Image, StyleSheet, FlatList } from 'react-native';

const Profile = () => {
  const posts = [
    { id: '1', imageUrl: 'https://i.pinimg.com/originals/2d/2c/06/2d2c06aacc7543bbeecf4e6f136f3b29.jpg' },
    { id: '3', imageUrl: 'https://i.pinimg.com/originals/65/3f/98/653f985a33fe6e825435311ae017dcd5.jpg' },
    { id: '2', imageUrl: 'https://i.pinimg.com/originals/c3/11/1a/c3111a6bdc0db98a1e740b5bcce12bec.jpg' },
    { id: '4', imageUrl: 'https://i.pinimg.com/originals/d0/3f/32/d03f328b56b55298e39d48720518fd2d.jpg' },
    { id: '5', imageUrl: 'https://i.pinimg.com/originals/cb/bf/19/cbbf198e30e18574fa253d4a5720cbaa.jpg' },
    { id: '6', imageUrl: 'https://i.pinimg.com/originals/7b/53/32/7b53328252fcf58b95c6c54d08ddd3de.jpg' },
    { id: '7', imageUrl: 'https://i.pinimg.com/originals/03/67/85/036785db5cb7947afc4b0012be840aed.jpg' },
    { id: '8', imageUrl: 'https://i.pinimg.com/originals/eb/c0/0c/ebc00c894efcd8db18c489b50da3b71b.jpg' },
    { id: '9', imageUrl: 'https://i.pinimg.com/originals/58/e6/23/58e6238bb7f07a559b7d60ef97c8c1b3.jpg' },
    
  ];

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://i.pinimg.com/originals/40/14/ac/4014ac4a0c445c38779653390765fbac.jpg' }} 
        style={styles.coverImage}
      />
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: 'https://i.pinimg.com/originals/cd/82/92/cd82928af39f781f1b381907ae3032a1.jpg' }}
          style={styles.profileImage}
        />
        <Text style={styles.name}>ARIKA RISMA N</Text>
        <Text style={styles.seni}> ~~Seniman~~ </Text>
        
      </View>
      <Text style={styles.postsTitle}>About You</Text>
      <Text style={styles.bio}>You’ve gotta dance like there’s nobody watching, love like you’ll never be hurt, sing like there’s nobody listening, and live like it’s heaven on earth</Text>
      <Text style={styles.postsTitle}>Postingan</Text>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        numColumns={3}
        renderItem={({ item }) => (
          <Image source={{ uri: item.imageUrl }} style={styles.postImage} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'black',
  },
  coverImage: {
    width: '100%',
    height: 200,
  },
  profileContainer: {
    alignItems: 'center',
    position: 'absolute',
    marginTop: 10, 
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 75,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 5,
    color:'black',
  },

  seni: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color:'black',
  },
  
  bio: {
    fontSize: 15,
    marginTop: 10,
    textAlign: 'center',
  },
  postsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
  postImage: {
   
    width: 120,
    height: 120,
    margin: 10,
  },
});

export default Profile;
