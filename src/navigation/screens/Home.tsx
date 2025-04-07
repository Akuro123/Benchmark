
import { Button, Text } from '@react-navigation/elements';
import { StyleSheet, View, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';

export function Home() {
  const navigation = useNavigation();

  



  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.cardText}>Test1</Text>
     
      </View>
      <View style={styles.card}>
        <Text style={styles.cardText}>Test 2</Text>
      
      </View>
      <View style={styles.card}>
        <Text style={styles.cardText}>Test 3</Text>
      
      </View>
      <View style={styles.card}>
        <Text style={styles.cardText}>Test 4</Text>
   
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  card: {
    width: '100%',
    maxWidth: 450,
    height: 130,
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  cardText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    textAlign: 'center',
  },
});