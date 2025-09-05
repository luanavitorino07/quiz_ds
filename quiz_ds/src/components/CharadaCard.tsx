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
    <View style={{ gap: 8 }}>
      <Text style={{ fontSize: 20, fontWeight: '700', fontFamily: 'LexendSemiBold', }}>Charada</Text>
      <Text  style={styles.questionStatement}>{charada_texto}</Text>
      
    </View>
  );
}
