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
          pega a banana, o leite, o liquidificador e bate
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#886A08',  
  },
  header: {
    height: 500,  
  },
  headerImage: {
    width: '100%',  
    height: '100%' 
  },
  content: {
    flex: 1,
    justifyContent: 'center',  
    alignItems: 'center',      
  },
  text: {
    fontSize: 30,
    color: 'white',  
  },
});
