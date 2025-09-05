import React, { useEffect, useState } from 'react';
import { View, Button, ActivityIndicator } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useQuiz } from '../context/QuizContext';
import ResultBox from '../components/ResultBox';
import { postStats } from '../api/quizService';

type Props = NativeStackScreenProps<RootStackParamList, 'Result'>;

export default function ResultScreen({ navigation }: Props) {
  const { alunoRM, pontuacao } = useQuiz();
  const [sending, setSending] = useState(false);

  useEffect(() => {
    // faça o envio automático ao entrar na tela
    (async () => {
      try {
        setSending(true);
        await postStats({
          aluno_rm: alunoRM,
          tema_jogado: 'portugues',
          pontuacao_final: pontuacao,
          total_perguntas: 20,
        });
        
      } catch (e) {
        // opcional: feedback ao usuário
      } finally {
        setSending(false);
      }
    })();
  }, []);

  return (
    <View style={{ padding: 20, gap: 20 }}>
      <ResultBox score={pontuacao} total={20} />
      {sending ? <ActivityIndicator /> : null}
      <Button title="Voltar ao início" onPress={() => navigation.reset({ index: 0, routes: [{ name: 'Login' }] })} />
    </View>
  );
}
