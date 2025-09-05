
import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native';
import { useQuiz } from '../context/QuizContext';
import styles from '../styles/globalStyles'; 

// Importa tipagem do React Navigation
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

// Declara que essa tela é a de "Login"
type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
  // pega funções do contexto global
  const { setAlunoRM, setPerguntaAtual, setPontuacao, setDesbloqueadoAte } = useQuiz();

  // estado local para o input do RM
  const [rm, setRm] = useState('');

  // função chamada ao clicar em "Iniciar"
  const iniciar = () => {
    if (!rm.trim()) return; // se vazio, não faz nada

    setAlunoRM(rm.trim());     // salva RM no contexto
    setPerguntaAtual(0);       // começa na primeira questão
    setPontuacao(0);           // zera pontuação
    setDesbloqueadoAte(4);     // libera as primeiras 5 questões (índice 0..4)

    navigation.replace('Quiz'); // vai direto para tela do Quiz
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../../assets/logo.png')} style={styles.logoImage} />
      </View>

      <Text style={styles.title}>O Explorador da Vida</Text>

      <View style={styles.placeholder}>
        <Text style={styles.placeholder}>Seu R.M.</Text>
        <TextInput
          keyboardType="number-pad"
          style={styles.input}
          value={rm}                // valor atual do estado
          onChangeText={setRm}      // atualiza o estado quando digitar
        />
        </View>

      
      <TouchableOpacity style={styles.button} onPress={iniciar}>
        <Text style={styles.buttonText}>Iniciar</Text>
      </TouchableOpacity>
    </View>
  );
}
