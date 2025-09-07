import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles/globalStyles'; 

type Props = {
  id: number;
  tema: string;
  bloco: number;
  enunciado: string;
  opcoes: string[];
  resposta_correta: number; // índice da resposta correta
  indexAtual: number; 
  total: number;
  tempo: number;
  onAnswer: (resposta: string) => void;
};

export default function QuestionCard({
  enunciado,
  opcoes,
  resposta_correta,
  indexAtual,
  total,
  tempo,
  onAnswer
}: Props) {
  const [selected, setSelected] = useState<number | null>(null);

  const handlePress = (index: number) => {
    if (selected !== null) return; // já respondeu
    setSelected(index);

    // espera 1s para mostrar cores antes de avançar
    setTimeout(() => {
      onAnswer(opcoes[index]);
      setSelected(null); // reseta para próxima questão
    }, 1000);
  };

  return (
    <View style={{ gap: 12, marginTop: 50,}}>
      <Text style={{ fontSize: 20, fontFamily: 'LexendSemiBold', marginBottom: 10, }}>O Explorador da Vida</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
        <Text style={styles.answersQuestionText}>
          Questão {indexAtual + 1}/{total}
        </Text>

        <Text style={styles.answersQuestionText}>
          Tempo: {tempo}s
        </Text>
      </View>


      <View style={styles.questionStatement}>
        <Text style={styles.questionText}>{enunciado}</Text>
      </View>
      
      <View>
        {opcoes.map((alt, index) => {
          let bgColor = "#F8F9F9";
          let textColor = '#3A3F48';// cor padrão
          if (selected !== null) {
            if (index === resposta_correta) {
              bgColor = "#1B2C46"; // correta
              textColor = '#fff';
            } else if (index === selected) {
              bgColor = "#9F3E3E"; // escolhida errada
              textColor = '#fff';
            }
          }
          return (
            <TouchableOpacity
              key={index}
              onPress={() => handlePress(index)}
              style={[
                styles.answersQuestion,
                { backgroundColor: bgColor }
              ]}
              disabled={selected !== null} // desativa botões depois da escolha
            >
              <Text style={[
              styles.answersQuestionText,
              { color: textColor }
              ]}>{alt}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
