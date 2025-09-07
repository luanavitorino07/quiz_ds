import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, Alert, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { getRandomQuestions, useQuiz } from '../context/QuizContext';
import QuestionCard from '../components/QuestionCard';
import { Question } from '../types/quiz';
import { API_BASE } from '../config/env';

console.log(API_BASE);

type Props = NativeStackScreenProps<RootStackParamList, 'Quiz'>;


export default function QuizScreen({ navigation }: Props) {
  const { pontuacao, setPontuacao, desbloqueadoAte, tempoQuiz, setTempoQuiz, quizRodando, setQuizRodando } = useQuiz();

  const [perguntas, setPerguntas] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    setQuizRodando(true); // começa na primeira pergunta
    return () => setQuizRodando(false); // para quando sair da tela ou terminar
  }, []);

  
  useEffect(() => {
    if (perguntaAtual > desbloqueadoAte) {
      Alert.alert(
        'Bloqueado',
        'Resolva a charada e escaneie o QR Code para liberar o próximo bloco.'
      );
      const bloco =
        perguntaAtual + 1 === 5 ? 1 :
        perguntaAtual + 1 === 10 ? 2 : 3;
      navigation.navigate('Charada', { bloco });
    }
  }, [perguntaAtual, desbloqueadoAte, navigation]);



  const handleAnswer = (alt: string) => {
    const q = perguntas[perguntaAtual];
    const acertou = alt === q.correta;
    if (acertou) setPontuacao(pontuacao + 1);

    const proxima = perguntaAtual + 1;

    if (proxima >= perguntas.length) {
      setQuizRodando(false);
      navigation.replace('Result', { pontuacao: acertou ? pontuacao + 1 : pontuacao });
      return;
    }

    const pontosDeCharada = [5, 10, 15];
    const proximaHumana = proxima + 1;

    if (pontosDeCharada.includes(proximaHumana)) {
      if (proxima > desbloqueadoAte) {
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


  return (
    <ScrollView style={{ flex: 1, padding: 20, backgroundColor: '#FFF', marginBottom: 20 }}>
      
      <QuestionCard
        enunciado={perguntas[perguntaAtual].enunciado}
        opcoes={perguntas[perguntaAtual].opcoes}
        resposta_correta={perguntas[perguntaAtual].resposta_correta}
        indexAtual={perguntaAtual}
        total={perguntas.length}
        onAnswer={handleAnswer} id={0} tema={''} bloco={0} 
        tempo={tempoQuiz}
      />
    </ScrollView>
  );
}
