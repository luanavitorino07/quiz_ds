import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Question } from '../types/quiz';
import { fetchQuestions } from '../api/quizService';
import { shuffleArray } from '../utils/array';

type QuizContextType = {
  alunoRM: string;
  setAlunoRM: (v: string) => void;

  perguntas: Question[];
  setPerguntas: (q: Question[]) => void;

  perguntaAtual: number;
  setPerguntaAtual: (i: number) => void;

  pontuacao: number;
  setPontuacao: (n: number) => void;

  desbloqueadoAte: number;
  setDesbloqueadoAte: (i: number) => void;

  tempoQuiz: number;                
  setTempoQuiz: (t: number) => void;   
  quizRodando: boolean;                 
  setQuizRodando: (v: boolean) => void;

  resetTempoQuiz: () => void;          
};


const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider = ({ children }: { children: ReactNode }) => {
  const [alunoRM, setAlunoRM] = useState('');
  const [perguntas, setPerguntas] = useState<Question[]>([]);
  const [perguntaAtual, setPerguntaAtual] = useState(0);
  const [pontuacao, setPontuacao] = useState(0);
  const [desbloqueadoAte, setDesbloqueadoAte] = useState(4);

  
  const [tempoQuiz, setTempoQuiz] = useState(0); 
  const [quizRodando, setQuizRodando] = useState(false);

  const resetTempoQuiz = () => setTempoQuiz(0);

  useEffect(() => {
    if (!quizRodando) return; 

    const timer = setInterval(() => {
      setTempoQuiz(t => t + 1);
    }, 1000);

    return () => clearInterval(timer); 
  }, [quizRodando]);


  return (
    <QuizContext.Provider value={{
      alunoRM, setAlunoRM,
      perguntas, setPerguntas,
      perguntaAtual, setPerguntaAtual,
      pontuacao, setPontuacao,
      desbloqueadoAte, setDesbloqueadoAte,
      tempoQuiz, setTempoQuiz, resetTempoQuiz,
      quizRodando, setQuizRodando

    }}>
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => {
  const ctx = useContext(QuizContext);
  if (!ctx) throw new Error('useQuiz precisa estar dentro de <QuizProvider>');
  return ctx;
};

export async function getRandomQuestions(): Promise<Question[]> {
  const todasPerguntas = await fetchQuestions();
  const blocos = [1, 2, 3, 4];
  let selecionadas: Question[] = [];

  for (const bloco of blocos) {
    const perguntasBloco = todasPerguntas.filter(q => q.bloco === bloco);
    const sorteadas = shuffleArray(perguntasBloco).slice(0, 5);
    selecionadas = [...selecionadas, ...sorteadas];
  }

  return shuffleArray(selecionadas);
}
