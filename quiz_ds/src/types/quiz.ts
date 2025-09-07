// src/types/quiz.ts
export type Question = {
  opcoes: string[];
  resposta_correta: number;
  bloco: number;
  id: string;
  enunciado: string;
  alternativas: string[];
  correta: string;
};

export type Charada = {
  id:string,
  tema_value:string,
  qr_code_id:number,
  charada_texto:string,
  resposta_texto:string
};
export type StatsPayload = {
  aluno_rm: string;
  tema_jogado: string;
  pontuacao_final: number;
  total_perguntas: number;
  tempo: number;
};
