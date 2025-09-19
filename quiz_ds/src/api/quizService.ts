
import { API_BASE } from '../config/env'; 
import { Charada, Question, StatsPayload } from '../types/quiz';

export async function fetchQuestions(): Promise<Question[]> {
  const res = await fetch(`${API_BASE}/api/quiz/biologia`, { method: 'GET' });
  if (!res.ok) throw new Error(`Erro ao buscar perguntas: ${res.status}`);

  const data = await res.json();

  const perguntasArray: Question[] = data.perguntas ?? [];
  return perguntasArray;
}

export async function fetchCharadas(): Promise<Charada[]> {
  const res = await fetch(`${API_BASE}/api/charadas`, { method: 'GET' });
  if (!res.ok) throw new Error(`Erro ao buscar charadas: ${res.status}`);
  
  const data = await res.json();

  if (!Array.isArray(data)) throw new Error("Formato inesperado: " + JSON.stringify(data));

 
  const shuffle = <T>(array: T[]): T[] => {
    const a = [...array];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  const charadasEmbaralhadas = shuffle(data);

  return charadasEmbaralhadas.slice(0, 4);
}

export async function postStats(payload: StatsPayload): Promise<void> {
  const res = await fetch(`${API_BASE}/api/stats`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Erro ao enviar stats: ${res.status}`);
}
