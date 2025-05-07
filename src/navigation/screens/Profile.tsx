import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { logoutUser , getLoggedInUser} from '../../db/session';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

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
      <Text>{username}'s Profile</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
});
