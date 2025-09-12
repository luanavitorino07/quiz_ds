import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { getRandomQuestions, useQuiz } from '../context/QuizContext';
import QuestionCard from '../components/QuestionCard';
import { Question } from '../types/quiz';

type Props = NativeStackScreenProps<RootStackParamList, 'Quiz'>;

export default function QuizScreen({ navigation }: Props) {
  const { 
    pontuacao, 
    setPontuacao, 
    desbloqueadoAte, 
    setDesbloqueadoAte,
    tempoQuiz, 
    setTempoQuiz, 
    quizRodando, 
    setQuizRodando 
  } = useQuiz();

  const [perguntas, setPerguntas] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [perguntaAtual, setPerguntaAtual] = useState(0);

  // Pega perguntas aleatórias
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

  // Começa o quiz
  useEffect(() => {
    setQuizRodando(true);
    return () => setQuizRodando(false);
  }, []);

  const handleAnswer = (altIndex: number, acertou: boolean) => {
    // Atualiza pontuação
    if (acertou) {
      setPontuacao(prev => {
        const novoValor = prev + 1;
        return novoValor;
      });
    }

    const proxima = perguntaAtual + 1;
    const perguntasCharada = [5, 10, 15];

    // Verifica se deve abrir Charada
    if (perguntasCharada.includes(proxima) && proxima > desbloqueadoAte) {
      const bloco =
        proxima === 5 ? 1 :
        proxima === 10 ? 2 : 3; // só 3 blocos
      setDesbloqueadoAte(proxima);
      setPerguntaAtual(proxima);
      navigation.navigate('Charada', { bloco });
      return;
    }

    // Fim do quiz
    if (proxima >= perguntas.length) {
      setQuizRodando(false);
      navigation.replace('Result');
      return;
    }

    // Avança para a próxima pergunta
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
        onAnswer={handleAnswer}
        id={0}
        tema={''}
        bloco={0}
        tempo={tempoQuiz}
      />
    </ScrollView>
  );
}
