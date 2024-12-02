import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider as PaperProvider, MD3LightTheme as DefaultTheme } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CalculatorsScreen from './screens/CalculatorsScreen';
import HistoryScreen from './screens/HistoryScreen';
import ChartsScreen from './screens/ChartsScreen';

const Tab = createBottomTabNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#6200ee',
    accent: '#03dac4',
    background: '#f5f5f5',
  },
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ color, size }) => {
              let iconName;
              if (route.name === 'Calculators') iconName = 'calculator';
              else if (route.name === 'History') iconName = 'history';
              else if (route.name === 'Charts') iconName = 'chart-bar';
              return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: theme.colors.primary,
            tabBarInactiveTintColor: 'gray',
            tabBarStyle: { backgroundColor: '#ffffff', borderTopWidth: 0 },
          })}
        >
          <Tab.Screen name="Calculators" component={CalculatorsScreen} />
          <Tab.Screen name="History" component={HistoryScreen} />
          <Tab.Screen name="Charts" component={ChartsScreen} />
        </Tab.Navigator>
    </PaperProvider>
  );
}
