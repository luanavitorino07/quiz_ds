import React from 'react';
import { NavigationContainer } from '@react-navigation/native'; 
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importa todas as telas que vamos usar no app
import LoginScreen from '../screens/LoginScreen';
import QuizScreen from '../screens/QuizScreen';
import CharadaScreen from '../screens/CharadaScreen';
import QRScannerScreen from '../screens/QRScannerScreen';
import ResultScreen from '../screens/ResultsScreen';

export type RootStackParamList = {
  Login: undefined;
  Quiz: undefined;
  Charada: { bloco: 1 | 2 | 3 };
  QRScanner: { 
    blocoNumero: number;        
    respostaCorreta: string;     
  };
  Result: { pontuacao: number } | undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();


export default function AppNavigator() {
  return (
    
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login"  screenOptions={{ headerShown: false }} 
      >
        
 
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ headerShown: false }} 
        />

        <Stack.Screen 
          name="Quiz" 
          component={QuizScreen} 
          options={{ title: 'O Explorador da Vida' }} 
        />

    
        <Stack.Screen 
          name="Charada" 
          component={CharadaScreen} 
          options={{ title: 'Charada' }} 
        />

   
        <Stack.Screen 
          name="QRScanner" 
          component={QRScannerScreen} 
          options={{ title: 'Escanear QR Code' }} 
        />

      
        <Stack.Screen 
          name="Result" 
          component={ResultScreen} 
          options={{ title: 'Resultado Final' }} 
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
