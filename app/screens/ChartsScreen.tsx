import React from 'react';
import { View, Dimensions, StyleSheet, Text } from 'react-native';
import { BarChart, PieChart } from 'react-native-chart-kit';

const ChartsScreen = () => {
  const chartConfig = {
    backgroundGradientFrom: '#f5f5f5',
    backgroundGradientTo: '#ffffff',
    color: (opacity = 1) => `rgba(98, 0, 238, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  };

  // Bar Chart Data
  const barData = {
    labels: ['Loan 1', 'Loan 2', 'Loan 3'], // x-axis labels
    datasets: [
      {
        data: [5000, 10000, 15000], // y-axis values
      },
    ],
  };

  // Pie Chart Data
  const pieData = [
    { name: 'EMI 1', population: 5000, color: '#f00', legendFontColor: '#333', legendFontSize: 12 },
    { name: 'EMI 2', population: 10000, color: '#0f0', legendFontColor: '#333', legendFontSize: 12 },
    { name: 'EMI 3', population: 15000, color: '#00f', legendFontColor: '#333', legendFontSize: 12 },
  ];

  return (
    <View style={styles.container}>
      {/* Bar Chart */}
      <Text style={styles.title}>Bar Chart</Text>
      <BarChart
        data={barData}
        width={Dimensions.get('window').width - 32}
        height={220}
        chartConfig={chartConfig}
        fromZero={true} // Ensures the bar chart starts from zero
      />

      {/* Pie Chart */}
      <Text style={styles.title}>Pie Chart</Text>
      <PieChart
        data={pieData}
        width={Dimensions.get('window').width - 32}
        height={220}
        chartConfig={chartConfig}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
});

export default ChartsScreen;
