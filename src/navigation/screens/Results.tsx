import React, { useEffect, useState, useCallback } from 'react';
import { getLoggedInUser } from '../../db/session';
import { getUserResults } from '../../db/results';
import { View, Text, StyleSheet, ScrollView, RefreshControl } from 'react-native';

export default function Results() {
  const [results, setResults] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);

  const loadResults = useCallback(async () => {
    const user = await getLoggedInUser();
    if (user) {
      setUserName(user.name); 
      const userResults = await getUserResults(user.id);
      console.log("Zalogowany użytkownik:", user);
      setResults(userResults);
    }
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadResults();
    setRefreshing(false);
  }, [loadResults]);

  useEffect(() => {
    loadResults();
  }, [loadResults]);

  const formatScore = (game: string, score: number): string => {
    const normalizedGame = game.toLowerCase().replace(/\s+/g, '');
    const levelBasedGames = ['numbermemory', 'sequencememory', 'chaintest'];
    return levelBasedGames.includes(normalizedGame)
      ? `Poziom ${score}`
      : `${score} ms`;
  };
  

  const gameLabels: Record<string, string> = {
  reaction_time: 'Reaction Time',
  numbermemory: 'Number Memory',
  sequencememory: 'Sequence Memory',
  chaintest: 'Chain Test',
};

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Text style={styles.title}>Twoje wyniki</Text>
      {userName && (
        <Text style={styles.subtitle}>Użytkownik: {userName}</Text>
      )}
      {results.length === 0 ? (
        <Text style={styles.text}>Brak zapisanych wyników.</Text>
      ) : (
        results.map((result) => (
          <View key={result.id} style={styles.resultBox}>
            <Text style={styles.text}>
                Gra: {gameLabels[result.game.toLowerCase()] || result.game} | Wynik: {formatScore(result.game, result.score)}
              </Text>
            <Text style={styles.text}>
              Data: {new Date(result.timestamp).toLocaleString()}
            </Text>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#1565C0',
    flex: 1,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    
    marginBottom: 20,
  
  },
resultBox: {
  marginBottom: 15,
  padding: 15,
  backgroundColor: '#1976D2',
  borderRadius: 10,
  width: '100%',
  borderWidth: 2,
  borderColor: '#fff',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.3,
  shadowRadius: 3,
  elevation: 4,
},
  text: {
    color: '#fff',
    fontSize: 16,
  },
});
