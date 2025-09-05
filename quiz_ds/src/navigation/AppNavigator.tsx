import React from 'react';
import { NavigationContainer } from '@react-navigation/native'; 
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importa todas as telas que vamos usar no app
import LoginScreen from '../screens/LoginScreen';
import QuizScreen from '../screens/QuizScreen';
import CharadaScreen from '../screens/CharadaScreen';
import QRScannerScreen from '../screens/QRScannerScreen';
import ResultScreen from '../screens/ResultsScreen';

/**
 * Tipagem do Stack Navigator
 * - Aqui declaramos as rotas e os parâmetros que cada uma pode receber.
 * - Exemplo: a tela "Charada" precisa de um número de bloco (1, 2 ou 3).
 */
export type RootStackParamList = {
  Login: undefined;                          // não recebe parâmetros
  Quiz: undefined;                           // não recebe parâmetros
  Charada: { bloco: 1 | 2 | 3 };             // recebe o número do bloco
  QRScanner: { bloco: 1 | 2 | 3 };           // idem
  Result: { pontuacao: number } | undefined; // pode receber pontuação ou nada
};

// Cria o "stack" de navegação usando o tipo que definimos
const Stack = createNativeStackNavigator<RootStackParamList>();

/**
 * Componente que define TODA a navegação do app.
 * Aqui dizemos quais telas existem e como se conectam.
 */
export default function AppNavigator() {
  return (
    // NavigationContainer precisa envolver todo o stack
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        
        {/* Tela inicial (Login) */}
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ headerShown: false }} // esconde o header
        />

        {/* Tela de perguntas (quiz) */}
        <Stack.Screen 
          name="Quiz" 
          component={QuizScreen} 
          options={{ title: 'O Explorador da Vida' }} 
        />

        {/* Tela de charada */}
        <Stack.Screen 
          name="Charada" 
          component={CharadaScreen} 
          options={{ title: 'Charada' }} 
        />

        {/* Tela de scanner */}
        <Stack.Screen 
          name="QRScanner" 
          component={QRScannerScreen} 
          options={{ title: 'Escanear QR Code' }} 
        />

        {/* Tela final de resultado */}
        <Stack.Screen 
          name="Result" 
          component={ResultScreen} 
          options={{ title: 'Resultado Final' }} 
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
