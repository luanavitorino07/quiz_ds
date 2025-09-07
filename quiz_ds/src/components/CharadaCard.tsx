import React from 'react';
import { View, Text } from 'react-native';
import styles from '../styles/globalStyles'; 

type Props = {
  id:string,
  tema_value:string,
  qr_code_id:number,
  charada_texto:string,
  resposta_texto:string
};


export default function CharadaCard({
  id,
  tema_value,
  qr_code_id,
  charada_texto,
  resposta_texto
}: Props) {
  return (
    <View style={{ gap: 8, marginTop:50 }}>
      <Text style={{ fontSize: 20, fontFamily: 'LexendSemiBold', marginBottom: 10, }}>O Explorador da Vida</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
        <Text style={styles.answersQuestionText}>
          Charada
        </Text>
      </View>

      <Text  style={styles.questionStatement}>{charada_texto}</Text>
      
    </View>
  );
}
