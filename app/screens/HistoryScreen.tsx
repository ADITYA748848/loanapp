import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Card } from 'react-native-paper';

const HistoryScreen = () => {
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const keys = await AsyncStorage.getAllKeys();
      const items = await AsyncStorage.multiGet(keys);
      const parsedHistory = items.map(([key, value]) => JSON.parse(value || '{}'));
      setHistory(parsedHistory);
    };

    fetchHistory();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {history.length > 0 ? (
        history.map((item, index) => (
          <Card key={index} style={styles.card}>
            <Card.Content>
              <Text style={styles.cardTitle}>{item.type} Calculation</Text>
              <Text>Principal: ₹{item.principal}</Text>
              <Text>Rate: {item.rate}%</Text>
              <Text>Time: {item.time} years</Text>
              <Text>Result: ₹{item.result}</Text>
            </Card.Content>
          </Card>
        ))
      ) : (
        <Text style={styles.emptyText}>No history available.</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  card: { marginBottom: 16, borderRadius: 8 },
  cardTitle: { fontSize: 18, fontWeight: 'bold' },
  emptyText: { fontSize: 16, textAlign: 'center', marginTop: 20, color: 'gray' },
});

export default HistoryScreen;
