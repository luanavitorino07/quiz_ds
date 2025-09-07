import React from 'react';
import { View, Text } from 'react-native';
import styles from '../styles/globalStyles';

export default function ResultBox({ score, total, rmAluno, tempo }: { score: number; total: number; rmAluno: string; tempo: number; }) {
  return (
    <View style={{ gap: 8, marginTop: 50 }}>
      <Text style={{ fontSize: 20, fontFamily: 'LexendSemiBold', marginBottom: 10, }}>O Explorador da Vida</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
        <Text style={styles.answersQuestionText}>
          Resultado
        </Text>

        <Text style={styles.answersQuestionText}>
          RM: {rmAluno}
        </Text>
      </View>


      <View style={[styles.questionStatement, {backgroundColor: "#DFE8F4",}]}>
        <Text style={styles.questionText}>Acertos: {score}/{total}</Text>
        <Text style={styles.questionText}>Tempo: {tempo}s</Text>
      </View>
    </View>
  );
}
