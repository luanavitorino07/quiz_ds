
import { API_BASE } from '../config/env'; 
import { Charada, Question, StatsPayload } from '../types/quiz';

export async function fetchQuestions(): Promise<Question[]> {
  const res = await fetch(`${API_BASE}/api/quiz/portugues`, { method: 'GET' });
  if (!res.ok) throw new Error(`Erro ao buscar perguntas: ${res.status}`);

  const data = await res.json();

  const perguntasArray: Question[] = data.perguntas ?? [];
  return perguntasArray;
}

export async function fetchCharadas(): Promise<Charada[]> {
  const res = await fetch(`${API_BASE}/api/charadas/biologia`, { method: 'GET' });
  if (!res.ok) throw new Error(`Erro ao buscar charadas: ${res.status}`);
  
  const data = await res.json();

  // a API já retorna array direto
  if (Array.isArray(data)) {
    return data;
  }

  throw new Error("Formato inesperado: " + JSON.stringify(data));
}

export async function postStats(payload: StatsPayload): Promise<void> {
  const res = await fetch(`${API_BASE}/api/stats`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Erro ao enviar stats: ${res.status}`);
}
