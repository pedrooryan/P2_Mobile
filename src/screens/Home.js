import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';

export default function Home() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../assets/1.png')}
          style={styles.headerImage}
        />
      </View>

      <View style={styles.content}>
        <Text style={[styles.text, { fontFamily: 'Roboto' }]}>
          Organizar faz bem!
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6c4ab6',  
  },
  header: {
    height: 200,  
  },
  headerImage: {
    width: '100%',  
    height: '100%', 
    resizeMode: 'cover',  
  },
  content: {
    flex: 1,
    justifyContent: 'center',  
    alignItems: 'center',      
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',  
  },
});
