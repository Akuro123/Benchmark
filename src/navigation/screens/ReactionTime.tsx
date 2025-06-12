import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { addResult } from "../../db/results";
import { getLoggedInUser } from "../../db/session";

type Status = 'countdown' | 'waiting' | 'ready' | 'clicked';

export default function ReactionTime() {
  const [status, setStatus] = useState<Status>('countdown');
  const [message, setMessage] = useState<string>("Kliknij aby zaczac");
  const [reactionTime, setReactionTime] = useState<number | null>(null);
  const [countdown, setCountdown] = useState<number>(3);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (status === 'countdown') {
      let count = 3;
      setCountdown(count);
      const countdownInterval = setInterval(() => {
        count -= 1;
        if (count === 0) {
          clearInterval(countdownInterval);
          setStatus('waiting');
          startTest();
        } else {
          setCountdown(count);
        }
      }, 1000);
    }
  }, [status]);

  const startTest = () => {
    setMessage('Czekaj na kolor czerwony');

    const randomDelay = Math.floor(Math.random() * 3000) + 2000;

    timeoutRef.current = setTimeout(() => {
      setStatus('ready');
      setMessage('KLIKNIJ TERAZ');
      startTimeRef.current = new Date().getTime();
      setReactionTime(null);
    }, randomDelay);
  };

  const handlePress = () => {
    if (status === 'waiting') {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setMessage('Za wcześnie! Spróbuj jeszcze raz.');
      setStatus('clicked');
    } else if (status === 'ready') {
      const endTime = new Date().getTime();
      const start = startTimeRef.current;
      if (start) {
        const time = endTime - start;
        setReactionTime(time);
        setMessage(`Twój czas reakcji: ${time} ms`);

        getLoggedInUser().then(user => {
          addResult(user.id, 'reaction_time', time);
        });
      }
      setStatus('clicked');
    }
  };

  const restart = () => {
    setReactionTime(null);
    setStatus('countdown');
    setCountdown(3);
  };

  return (
    <View style={styles.container}>
      {status === 'countdown' ? (
        <Text style={styles.countdownText}>{countdown}</Text>
      ) : (
        <TouchableOpacity
          onPress={status === 'clicked' ? restart : handlePress}
          style={[
            styles.button,
            status === 'waiting'
              ? styles.green
              : status === 'ready'
              ? styles.red
              : styles.gray
          ]}
        >
          <Text style={styles.text}>
            {status === 'clicked'
              ? 'Spróbuj ponownie'
              : message}
          </Text>
        </TouchableOpacity>
      )}
      {reactionTime !== null && status === 'clicked' && (
        <Text style={styles.result}>Twój wynik: {reactionTime} ms</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1976D2',
    padding: 20,
  },
  countdownText: {
    fontSize: 64,
    color: 'white',
    fontWeight: 'bold',
  },
  button: {
    width: '100%',
    paddingVertical: 60,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  green: {
    backgroundColor: 'green',
  },
  red: {
    backgroundColor: 'red',
  },
  gray: {
    backgroundColor: 'gray',
  },
  text: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
  },
  result: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  restart: {
    color: '#00f',
    fontSize: 18,
    textDecorationLine: 'underline',
  },
});