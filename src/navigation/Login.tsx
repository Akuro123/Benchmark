import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert, TouchableOpacity } from 'react-native';
import { loginUser } from '../db/users';
import { setLoggedInUser } from '../db/session';
import { useNavigation } from '@react-navigation/native';

export default function Login() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Błąd', 'Wprowadź email i hasło.');
      return;
    }

    const user = await loginUser(email, password);
    if (user) {
      await setLoggedInUser(user);
      navigation.navigate('Drawer'); // Przejdź do Home po zalogowaniu
    } else {
      Alert.alert('Błąd logowania', 'Nieprawidłowy email lub hasło.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Logowanie</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Hasło"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Button title="Zaloguj się" onPress={handleLogin} />

      <TouchableOpacity onPress={() => navigation.navigate('Register')} style={styles.registerButton}>
        <Text style={styles.registerText}>Nie masz konta? Zarejestruj się</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    marginBottom: 20,
    borderRadius: 10,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  registerButton: {
    marginTop: 20,
    alignSelf: 'center',
  },
  registerText: {
    color: '#0411FB',
    fontWeight: '600',
    fontSize: 16,
  },
});
