import React, { useState,useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { addResult } from "../../db/results";
import { getLoggedInUser } from "../../db/session";

type Status='waiting' | 'ready' | 'clicked';


export default function ReactionTime() {
  const [status,setStatus]=useState<Status>('waiting')
  const [message,setMessage]=useState<string>("Kliknij aby zaczac");
  const [reactionTime,setReactionTime]=useState<number | null>(null);
  const timeoutRef=useRef<NodeJS.Timeout | null>(null);
  const startTimeRef=useRef<number | null>(null);

const startTest = () => {
setStatus('waiting');
setMessage('Czekaj na kolor czerwony');
setReactionTime(null);

const randomDelay= Math.floor(Math.random()*3000)+2000;

timeoutRef.current = setTimeout(()=>{
  setStatus('ready');
  setMessage('KLIKNIJ TERAZ');
  startTimeRef.current = new Date().getTime();

  },randomDelay);
};
const handlePress = () =>{
  if(status === 'waiting'){
    if(timeoutRef.current){
      clearTimeout(timeoutRef.current);
    }
    setMessage('Za wczesnie! sprobuj jeszcze raz.')
  } else if (status === 'ready'){
    const endTime = new Date().getTime();
    const start = startTimeRef.current;
    if (start){
      const time = endTime-start;
      setReactionTime(time);
      setMessage(`Twoj czas reakcji: ${time} ms`);

      getLoggedInUser().then(user =>{
        addResult(user.id, 'reaction_time',time)
      })
    }
  } 
  setStatus('clicked');

};
  return (
  <View style={styles.container}>
    <TouchableOpacity
      onPress={handlePress}
      style={[
        styles.button,
        status === 'waiting'
        ? styles.green
        : status === 'ready'
        ? styles.red
        :styles.gray
      ]}
    >
      <Text style={styles.text}>{message}</Text>
      
    </TouchableOpacity>
    {reactionTime !==null && (
      <Text style={styles.result}>Twoj wynik: {reactionTime} ms</Text>
    )}
    {status === 'clicked' && (
      <TouchableOpacity onPress={startTest}>
        <Text style={styles.restart}>Sprobuj ponownie</Text>
      </TouchableOpacity>
    )}
  </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#222',
    padding: 20,
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