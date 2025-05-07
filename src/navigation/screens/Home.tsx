import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { getLoggedInUser } from './../../db/session';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';


export function Home() {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    const checkLogin = async () => {
      const user = await getLoggedInUser();
      if (!user) {
        navigation.navigate('Login');
      } else {
        setLoggedIn(true);
      }
    };
    checkLogin();
  }, []);

  if (!loggedIn) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Witaj! Zaloguj się lub załóż konto</Text>
      </View>
    );
  }

  return (
    <View style={styles.fullContainer}>
    
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.row}>
          <GameTile
            title="Reaction Time"
            description="Test your visual reflexes."
            icon={require('../../assets/bolt.png')}
            onPress={() => navigation.navigate('ReactionTime')}
          />
          <GameTile
            title="Sequence Memory"
            description="Remember an increasingly long pattern of button presses."
            icon={require('../../assets/grid.png')}
            onPress={() => navigation.navigate('SequenceMemory')}
          />
        </View>

        <View style={styles.row}>
          <GameTile
            title="Number Memory"
            description="Remember the longest number you can."
            icon={require('../../assets/numbers.png')}
            onPress={() => navigation.navigate('NumberMemory')}
          />
          <GameTile
            title="Chimp Test"
            description="Are you smarter than a chimpanzee?"
            icon={require('../../assets/numbers.png')}
            onPress={() => navigation.navigate('Chaintest')}
          />
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.navigate('Results')}>
          <Image source={require('../../assets/score.png')} style={styles.footerIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Image source={require('../../assets/profile.png')} style={styles.footerIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

type GameTileProps = {
  title: string;
  description: string;
  icon: any;
  onPress: () => void;
};

function GameTile({ title, description, icon, onPress }: GameTileProps) {
  return (
    <TouchableOpacity style={styles.tile} onPress={onPress}>
      <Image source={icon} style={styles.tileIcon} />
      <Text style={styles.tileTitle}>{title}</Text>
      <Text style={styles.tileDesc}>{description}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  fullContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#0411FB',
    paddingVertical: 20,
    alignItems: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  content: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    justifyContent: 'flex-start', 
    flexGrow: 1, 
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  tile: {
    width: '47%', 
    height: 180, 
    backgroundColor: '#f3f7ff',
    borderRadius: 15, 
    padding: 20,
    alignItems: 'center',
  },
  tileIcon: {
    width: 70, 
    height: 70, 
    marginBottom: 10,
    tintColor: '#4a90e2',
  },
  tileTitle: {
    fontSize: 14, 
    fontWeight: 'bold',
    marginBottom: 8, 
    textAlign: 'center',
  },
  tileDesc: {
    fontSize: 12, 
    textAlign: 'center',
    color: '#444',
  },
  footer: {
    flexDirection: 'row',
    backgroundColor: '#1976D2',
    paddingVertical: 15,
    justifyContent: 'space-around',
    marginBottom: 50,
  },
  footerIcon: {
    width: 30,
    height: 30,
    tintColor: '#fff',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
  },
});
