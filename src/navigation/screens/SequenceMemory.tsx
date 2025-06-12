import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Animated } from 'react-native';
import { addResult } from '../../db/results';
import { getLoggedInUser } from '../../db/session';

const TILE_COUNT = 9;
const TILE_GRID_SIZE = 3;
const BASE_SEQUENCE_LENGTH = 1;

function getRandomSequence(length: number) {
  return Array.from({ length }, () => Math.floor(Math.random() * TILE_COUNT));
}

export default function SequenceMemory() {
  const [level, setLevel] = useState(1);
  const [sequence, setSequence] = useState<number[]>([]);
  const [userInput, setUserInput] = useState<number[]>([]);
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
  const [showSequence, setShowSequence] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  // Licznik i kontrola pierwszego uruchomienia
  const [countdown, setCountdown] = useState<number | null>(3);
  const [hasStarted, setHasStarted] = useState(false);

  const saveResult = async () => {
    const user = await getLoggedInUser();
    if (user) {
      await addResult(user.id, 'Sequence Memory', level - 1);
    } else {
      console.warn('Nie zalogowano – wynik nie został zapisany');
    }
  };

  const [tileAnims] = useState<Animated.Value[]>(
    () => Array.from({ length: TILE_COUNT }, () => new Animated.Value(0))
  );

  // 🔁 Licznik na start ekranu
  useEffect(() => {
    if (!hasStarted) {
      setHasStarted(true);
      let count = 3;
      setCountdown(count);
      const interval = setInterval(() => {
        count--;
        if (count <= 0) {
          clearInterval(interval);
          setCountdown(null);
          const initialTile = Math.floor(Math.random() * TILE_COUNT);
          setSequence([initialTile]);
          setShowSequence(true);
        } else {
          setCountdown(count);
        }
      }, 666); // przyspieszone 1.5x (1000ms / 1.5 ≈ 666ms)
    }
  }, []);

  // 🔄 Pokazywanie sekwencji (miganie)
  useEffect(() => {
    if (showSequence) {
      let i = 0;
      const interval = setInterval(() => {
        const current = sequence[i];
        animateTile(current);
        i++;
        if (i >= sequence.length) {
          clearInterval(interval);
          setTimeout(() => setShowSequence(false), 500);
        }
      }, 800);
    }
  }, [sequence, showSequence]);

  const animateTile = (index: number) => {
    if (!tileAnims[index]) return;
    Animated.sequence([
      Animated.timing(tileAnims[index], {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(tileAnims[index], {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const handleTileClick = (index: number) => {
    if (showSequence || gameOver) return;
    animateTile(index);
    const newInput = [...userInput, index];
    setUserInput(newInput);
    if (sequence[newInput.length - 1] !== index) {
      setGameOver(true);
      saveResult();
    } else if (newInput.length === sequence.length) {
      setTimeout(() => {
        setLevel(level + 1);
        const newSeq = getRandomSequence(BASE_SEQUENCE_LENGTH + level);
        setSequence(newSeq);
        setUserInput([]);
        setShowSequence(true);
      }, 1000);
    }
  };

  const resetGame = () => {
    setLevel(1);
    const newSeq = getRandomSequence(BASE_SEQUENCE_LENGTH);
    setSequence(newSeq);
    setUserInput([]);
    setShowSequence(true);
    setGameOver(false);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#1976D2', justifyContent: 'center', alignItems: 'center' }}>
      {countdown !== null ? (
        <Text style={{ color: 'white', fontSize: 48, marginBottom: 40 }}>{countdown}</Text>
      ) : (
        <>
          <Text style={{ color: 'white', fontSize: 24, marginBottom: 20 }}>
            Level: <Text style={{ color: 'white' }}>{level}</Text>
          </Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', width: TILE_GRID_SIZE * 90, justifyContent: 'center' }}>
            {Array.from({ length: TILE_COUNT }).map((_, i) => {
              const bgColor = tileAnims[i].interpolate({
                inputRange: [0, 1],
                outputRange: ['#1565C0', 'white'],
              });
              return (
                <TouchableOpacity key={i} onPress={() => handleTileClick(i)} activeOpacity={1}>
                  <Animated.View
                    style={{
                      width: 80,
                      height: 80,
                      margin: 5,
                      borderRadius: 10,
                      backgroundColor: bgColor,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  />
                </TouchableOpacity>
              );
            })}
          </View>
          {gameOver && (
            <View style={{ marginTop: 20 }}>
              <Text style={{ color: 'white', fontSize: 20, marginBottom: 10 }}>Game Over</Text>
              <TouchableOpacity onPress={resetGame} style={{ backgroundColor: '#0288D1', padding: 10, borderRadius: 5 }}>
                <Text style={{ color: 'white', fontSize: 16 }}>Restart</Text>
              </TouchableOpacity>
            </View>
          )}
        </>
      )}
    </View>
  );
}