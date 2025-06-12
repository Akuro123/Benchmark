import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, View, Button, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { logoutUser, getLoggedInUser } from '../../db/session';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

const profileIcon = require('../../assets/profile.png');

type ProfileScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Profile'>;

export default function Profile() {
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const user = await getLoggedInUser();
      setUsername(user?.name || 'Unknown');
    })();
  }, []);

  const handleLogout = async () => {
    await logoutUser();
    navigation.getParent()?.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image source={profileIcon} style={styles.avatar} />
        <Text style={styles.name}>{username}</Text>
        <Text style={styles.title}>Użytkownik aplikacji</Text>
        <View style={styles.infoBox}>
       
        </View>
        <View style={styles.button}>
          <Button title="Wyloguj się"  onPress={handleLogout} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1976D2',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#2196F3',
    padding: 30,
    borderRadius: 20,
    alignItems: 'center',
    width: '100%',
    maxWidth: 350,
    elevation: 10,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#fff',
    marginBottom: 15,
    resizeMode: 'cover',
  },
  name: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  title: {
    fontSize: 16,
    color: '#e3f2fd',
    marginBottom: 20,
  },
  infoBox: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    width: '100%',
  },
  infoText: {
    color: '#bbdefb',
    fontSize: 14,
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#1565C0',
    borderRadius: 10,
    overflow: 'hidden',
    width: '100%',
  },
});
