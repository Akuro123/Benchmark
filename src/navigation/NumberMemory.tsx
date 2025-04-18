import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { getLoggedInUser } from '../db/session';
import { addResult } from '../db/results';

function generateNumber(length: number): string {
  return Array.from({ length }, () => Math.floor(Math.random() * 10)).join('');
}

export default function NumberMemory() {
  const [level, setLevel] = useState(1);
  const [numberToMemorize, setNumberToMemorize] = useState('');
  const [showNumber, setShowNumber] = useState(true);
  const [userInput, setUserInput] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    getLoggedInUser().then((user) => {
      if (user) setUserId(user.id);
    });
  }, []);

  useEffect(() => {
    const newNumber = generateNumber(level);
    setNumberToMemorize(newNumber);
    setShowNumber(true);
    setTimeout(() => setShowNumber(false), 2000 + level * 250);
  }, [level]);

  const handleSubmit = () => {
    if (userInput === numberToMemorize) {
      setLevel((prev) => prev + 1);
      setUserInput('');
    } else {
      setGameOver(true);
      if (userId !== null) {
        addResult(userId, 'NumberMemory', level-1);
      }
    }
  };

  const resetGame = () => {
    setLevel(1);
    setUserInput('');
    setGameOver(false);
  };

  return (
    <View style={styles.container}>
      {!gameOver ? (
        <>
          <Text style={styles.level}>Poziom {level}</Text>
          {showNumber ? (
            <Text style={styles.number}>{numberToMemorize}</Text>
          ) : (
            <>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={userInput}
                onChangeText={setUserInput}
                onSubmitEditing={handleSubmit}
                placeholder="Wpisz zapamiętaną liczbę"
              />
              <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                <Text style={styles.buttonText}>Sprawdź</Text>
              </TouchableOpacity>
            </>
          )}
        </>
      ) : (
        <>
          <Text style={styles.gameOver}>Koniec gry! Osiągnięty poziom: {level-1}</Text>
          <TouchableOpacity onPress={resetGame} style={styles.button}>
            <Text style={styles.buttonText}>Zagraj ponownie</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#121212' },
  level: { color: '#fff', fontSize: 24, marginBottom: 20 },
  number: { color: '#fff', fontSize: 48, fontWeight: 'bold' },
  input: {
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 8,
    color: '#fff',
    padding: 10,
    width: 200,
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#0288D1',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  buttonText: { color: '#fff', fontSize: 18 },
  gameOver: { color: 'red', fontSize: 22, marginBottom: 20 },
});
