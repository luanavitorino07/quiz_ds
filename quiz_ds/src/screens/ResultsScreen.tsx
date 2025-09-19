import React, { useEffect, useState } from 'react';
import { View, Button, ActivityIndicator, TouchableOpacity, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useQuiz } from '../context/QuizContext';
import ResultBox from '../components/ResultBox';
import { postStats } from '../api/quizService';
import styles from '../styles/globalStyles';

type Props = NativeStackScreenProps<RootStackParamList, 'Result'>;

export default function ResultScreen({ navigation }: Props) {
  const { alunoRM, pontuacao, tempoQuiz, resetTempoQuiz } = useQuiz();
  const [sending, setSending] = useState(false);

  useEffect(() => {
   
    (async () => {
      try {
        setSending(true);
        await postStats({
          aluno_rm: alunoRM,
          tema_jogado: 'biologia',
          pontuacao_final: pontuacao,
          total_perguntas: 20,
          tempo: tempoQuiz
        });
        
      } catch (e) {
        
      } finally {
        setSending(false);
      }
    })();
  }, []);

  return (
    <View style={{ padding: 20, gap: 20, backgroundColor: '#FFF', height:'100%' }}>
      <ResultBox score={pontuacao} total={20} rmAluno={alunoRM} tempo={tempoQuiz} />
      {sending ? <ActivityIndicator /> : null}


      <TouchableOpacity style={styles.button} 
        onPress={() => {
        resetTempoQuiz(); 
        navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
      }}
          
      >
        <Text style={styles.buttonText}>Jogar Novamente</Text>
      </TouchableOpacity>
    </View>
  );
}
