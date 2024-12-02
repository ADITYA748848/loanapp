import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { TextInput, Button, Card, useTheme } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CalculatorsScreen = () => {
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [time, setTime] = useState('');
  const [emi, setEMI] = useState('');
  const theme = useTheme();

  const calculateEMI = async () => {
    const P = parseFloat(principal);
    const R = parseFloat(rate) / 12 / 100;
    const N = parseFloat(time) * 12;
    const emiValue = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
    const result = emiValue.toFixed(2);
    setEMI(result);

    const historyItem = {
      type: 'EMI',
      principal: P,
      rate,
      time,
      result,
    };
    await AsyncStorage.setItem(
      `history_${Date.now()}`,
      JSON.stringify(historyItem)
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={styles.card}>
        <Card.Title title="EMI Calculator" titleStyle={styles.cardTitle} />
        <Card.Content>
          <TextInput
            label="Principal Amount"
            keyboardType="numeric"
            value={principal}
            onChangeText={setPrincipal}
            mode="outlined"
            style={styles.input}
          />
          <TextInput
            label="Annual Interest Rate (%)"
            keyboardType="numeric"
            value={rate}
            onChangeText={setRate}
            mode="outlined"
            style={styles.input}
          />
          <TextInput
            label="Loan Tenure (Years)"
            keyboardType="numeric"
            value={time}
            onChangeText={setTime}
            mode="outlined"
            style={styles.input}
          />
          <Button
            mode="contained"
            onPress={calculateEMI}
            style={styles.button}
            buttonColor={theme.colors.primary}
          >
            Calculate EMI
          </Button>
          {emi ? (
            <Text style={styles.resultText}>
              Your Monthly EMI: <Text style={styles.resultValue}>₹{emi}</Text>
            </Text>
          ) : null}
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  card: { marginBottom: 16 },
  cardTitle: { fontSize: 20, fontWeight: 'bold' },
  input: { marginBottom: 16 },
  button: { marginTop: 8, borderRadius: 8 },
  resultText: { marginTop: 16, fontSize: 18, fontWeight: 'bold' },
  resultValue: { color: '#6200ee' },
});

export default CalculatorsScreen;
