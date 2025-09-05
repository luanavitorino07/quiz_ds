import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import { QuizProvider } from './src/context/QuizContext';

// Hook para fontes
import { useFonts } from 'expo-font';
import { Text } from 'react-native';

export default function App() {
  // Carrega as fontes
  const [fontsLoaded] = useFonts({
    LexendSemiBold: require('./assets/fonts/Lexend-SemiBold.ttf'),
    LexendRegular: require('./assets/fonts/Lexend-Regular.ttf'),
  });

  // Enquanto não carregou, pode exibir um loading
  if (!fontsLoaded) {
    return <Text>Carregando...</Text>;
  }

  return (
    <QuizProvider>
      <AppNavigator />
    </QuizProvider>
  );
}