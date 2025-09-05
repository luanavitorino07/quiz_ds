import React from 'react';
import { View, Text } from 'react-native';

export default function ResultBox({ score, total }: { score: number; total: number }) {
  return (
    <View style={{ gap: 8 }}>
      <Text style={{ fontSize: 22, fontWeight: '700' }}>Resultado</Text>
      <Text style={{ fontSize: 16 }}>Você acertou {score} de {total}.</Text>
    </View>
  );
}
