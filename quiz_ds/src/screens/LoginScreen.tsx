
import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native';
import { useQuiz } from '../context/QuizContext';
import styles from '../styles/globalStyles'; 


import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';


type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
 
  const { setAlunoRM, setPerguntaAtual, setPontuacao, setDesbloqueadoAte } = useQuiz();

  const [rm, setRm] = useState('');

  const iniciar = () => {
    if (!rm.trim()) return; 

    setAlunoRM(rm.trim());    
    setPerguntaAtual(0);
    setPontuacao(0);           
    setDesbloqueadoAte(4);     

    navigation.replace('Quiz'); 
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
          value={rm}                
          onChangeText={setRm}      
        />
        </View>

      
      <TouchableOpacity style={styles.button} onPress={iniciar}>
        <Text style={styles.buttonText}>Iniciar</Text>
      </TouchableOpacity>
    </View>
  );
}
