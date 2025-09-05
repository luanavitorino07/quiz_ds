import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Question } from '../types/quiz';
import { fetchQuestions } from '../api/quizService';


import { shuffleArray } from '../utils/array';


type QuizContextType = {
  alunoRM: string;
  setAlunoRM: (v: string) => void;

  perguntas: Question[];
  setPerguntas: (q: Question[]) => void;

  perguntaAtual: number;                // índice atual (0..19)
  setPerguntaAtual: (i: number) => void;

  pontuacao: number;                    // acertos
  setPontuacao: (n: number) => void;

  desbloqueadoAte: number;              // maior índice permitido (começa em 4 → 0..4)
  setDesbloqueadoAte: (i: number) => void;
};

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider = ({ children }: { children: ReactNode }) => {
  const [alunoRM, setAlunoRM] = useState('');
  const [perguntas, setPerguntas] = useState<Question[]>([]);
  const [perguntaAtual, setPerguntaAtual] = useState(0);
  const [pontuacao, setPontuacao] = useState(0);

  // Regras: 0..4 (5 questões) → Charada 1 → libera 5..9; depois 10..14; depois 15..19.
  const [desbloqueadoAte, setDesbloqueadoAte] = useState(4);

  return (
    <QuizContext.Provider value={{
      alunoRM, setAlunoRM,
      perguntas, setPerguntas,
      perguntaAtual, setPerguntaAtual,
      pontuacao, setPontuacao,
      desbloqueadoAte, setDesbloqueadoAte
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
