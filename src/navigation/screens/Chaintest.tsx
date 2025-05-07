import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { getLoggedInUser } from '../../db/session';
import { addResult } from '../../db/results';

type Tile = {
  id: number;
  number: number;
  x: number;
  y: number;
};

const TILE_SIZE = 70;

export default function Chaintest() {
  const [level, setLevel] = useState(1);
  const [tiles, setTiles] = useState<Tile[]>([]);
  const [hidden, setHidden] = useState(false);
  const [expected, setExpected] = useState(1);
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    loadUser();
    startLevel();
  }, []);

  const loadUser = async () => {
    const user = await getLoggedInUser();
    if (user) {
      setUserId(user.id);
    }
  };

  const generateTiles = (count: number): Tile[] => {
    const positions: Tile[] = [];
    const used = new Set<string>();

    for (let i = 1; i <= count; i++) {
      let x = 0;
      let y = 0;
      let key = '';
      do {
        x = Math.floor(Math.random() * 4); 
        y = Math.floor(Math.random() * 6);
        key = `${x},${y}`;
      } while (used.has(key));
      used.add(key);
      positions.push({ id: i, number: i, x, y });
    }

    return positions;
  };

  const startLevel = () => {
    const newTiles = generateTiles(level + 3);
    setTiles(newTiles);
    setExpected(1);
    setHidden(false);
    setTimeout(() => setHidden(true), 1000 + level * 300);
  };

  const handlePress = (tile: Tile) => {
    if (tile.number === expected) {
      if (expected === tiles.length) {
        setLevel((prev) => prev + 1);
        setTimeout(() => startLevel(), 1000);
      } else {
        setExpected(expected + 1);
      }
    } else {
      saveResult();
      Alert.alert('Koniec gry', `Dotarłeś do poziomu ${level}`, [
        { text: 'Zagraj ponownie', onPress: () => restart() },
      ]);
    }
  };

  const saveResult = async () => {
    if (userId !== null) {
      try {
        await addResult(userId, 'Chaintest', level);
        console.log('Wynik zapisany do bazy');
      } catch (err) {
        console.error('Błąd zapisu wyniku do bazy:', err);
      }
    }
  };

  const restart = () => {
    setLevel(1);
    startLevel();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.level}>Poziom: {level}</Text>
      <View style={styles.grid}>
        {tiles.map((tile) => (
          <TouchableOpacity
            key={tile.id}
            style={[
              styles.tile,
              {
                left: tile.x * (TILE_SIZE + 10),
                top: tile.y * (TILE_SIZE + 10),
              },
            ]}
            onPress={() => handlePress(tile)}
          >
            {!hidden && <Text style={styles.tileText}>{tile.number}</Text>}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1976D2',
    padding: 20,
  },
  level: {
    fontSize: 24,
    color: 'white',
    marginBottom: 10,
    alignSelf: 'center',
  },
  grid: {
    flex: 1,
    position: 'relative',
  },
  tile: {
    position: 'absolute',
    width: TILE_SIZE,
    height: TILE_SIZE,
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tileText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});