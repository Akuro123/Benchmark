import React, { useEffect, useState } from 'react';
import { Button, Text } from '@react-navigation/elements';
import { StyleSheet, View, ScrollView, Touchable, TouchableOpacity } from 'react-native';

import { getLoggedInUser } from './../../db/session';
import { useNavigation } from '@react-navigation/native';

export function Home() {
  const [users, setUsers] = useState<any[]>([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const checkLogin = async () => {
      const user = await getLoggedInUser();
      if (!user) {
        navigation.navigate('Login');
      }else{
        setLoggedIn(true);
      }
    };
  
   
    checkLogin();
  }, []);

  

  if (!loggedIn) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Witaj! Zaloguj się lub załóż konto</Text>
        <View style={styles.buttonContainer}>
          <Button title="Zaloguj się" onPress={() => navigation.navigate('Login')} />
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Zarejestruj się" onPress={() => navigation.navigate('Register')} />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Wybierz grę</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ReactionTime')}
      >
        <Text style={styles.buttonText}>Czas reakcji</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('SequenceMemory')}
      >
        <Text style={styles.buttonText}>Zapamiętywanie sekwencji</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('NumberMemory')}
      >
        <Text style={styles.buttonText}>Zapamiętywanie liczb</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Chaintest')}
      >
        <Text style={styles.buttonText}>Test łańcucha</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Results')}
      >
        <Text style={styles.buttonText}>Wyniki</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#0411FB',
    marginBottom: 30,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#0411FB',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});