import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, Alert, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { getRandomQuestions, useQuiz } from '../context/QuizContext';
import QuestionCard from '../components/QuestionCard';
import { fetchQuestions } from '../api/quizService';
import { Question } from '../types/quiz';
import { API_BASE } from '../config/env';

console.log(API_BASE);

type Props = NativeStackScreenProps<RootStackParamList, 'Quiz'>;

export default function QuizScreen({ navigation }: Props) {
  const {
    pontuacao, setPontuacao,
    desbloqueadoAte
  } = useQuiz();


  // Carrega perguntas 1x (ou usa mock se API indisponível)
  const [perguntas, setPerguntas] = useState<Question[]>([]);
  const [loading, setLoading] = useState(false);
  const [perguntaAtual, setPerguntaAtual] = useState(0);

  useEffect(() => {
    getRandomQuestions()
      .then(qs => {
        setPerguntas(qs);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // Quando o usuário responde:
    const handleAnswer = (alt: string) => {
    const q = perguntas[perguntaAtual];
    const acertou = alt === q.correta;
    if (acertou) setPontuacao(pontuacao + 1);

    const proxima = perguntaAtual + 1;

    // terminou todas?
    if (proxima >= perguntas.length) {
      navigation.replace('Result', { pontuacao: acertou ? pontuacao + 1 : pontuacao });
      return;
    }

    // checa se precisa ir para a charada (após 5, 10, 15 → índices 4, 9, 14)
    const pontosDeCharada = [5, 10, 15]; // contagem humana
    const proximaHumana = proxima + 1;

    if (pontosDeCharada.includes(proximaHumana)) {
      // só pode continuar se o bloco foi desbloqueado via QR (desbloqueadoAte controla isso)
      if (proxima > desbloqueadoAte) {
        // leva para a charada (bloco 1/2/3)
        const bloco = proximaHumana === 5 ? 1 : proximaHumana === 10 ? 2 : 3;
        navigation.navigate('Charada', { bloco });
        return;
      }
    }

    setPerguntaAtual(proxima);
  };

  if (loading || !perguntas.length) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  // bloqueio visual: se tentar avançar além do permitido
  if (perguntaAtual > desbloqueadoAte) {
    Alert.alert('Bloqueado', 'Resolva a charada e escaneie o QR Code para liberar o próximo bloco.');
    const bloco = perguntaAtual + 1 === 5 ? 1 : perguntaAtual + 1 === 10 ? 2 : 3;
    navigation.navigate('Charada', { bloco });
    return null;
  }

  return (
    <ScrollView style={{ height: '100%', padding: 20, backgroundColor: '#FFF', marginBottom: 20,}}>
    <QuestionCard
        enunciado={perguntas[perguntaAtual].enunciado}
        opcoes={perguntas[perguntaAtual].opcoes}
        resposta_correta={perguntas[perguntaAtual].resposta_correta}
        indexAtual={perguntaAtual}
        total={perguntas.length}
        onAnswer={handleAnswer} id={0} tema={''} bloco={0}    />

    </ScrollView>
  );
}
