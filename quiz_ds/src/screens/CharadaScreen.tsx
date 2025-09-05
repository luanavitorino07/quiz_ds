import React, { useEffect, useState } from 'react';
import { View,  TouchableOpacity, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import CharadaCard from '../components/CharadaCard';
import styles from '../styles/globalStyles'; 
import { fetchCharadas, fetchQuestions } from '../api/quizService';
import { Charada } from '../types/quiz';

type Props = NativeStackScreenProps<RootStackParamList, 'Charada'>;


export default function CharadaScreen({ route, navigation }: Props) {
  const { bloco } = route.params;
  const [CHARADAS, setCHARADAS] = useState<Charada[]>([]);
  useEffect(() => {
    const load = async () => {
      const cs = await fetchCharadas();
      setCHARADAS(cs);
    };
    load(); // <- chama a função
  }, []);
  
  return (
    <View style={{ padding: 20, backgroundColor: '#fff', height: '100%', gap:20}}>
      <CharadaCard charada_texto={CHARADAS[0]?.charada_texto} id={''} tema_value={''} qr_code_id={0} resposta_texto={''} />

    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('QRScanner', { bloco })}>
        <Text style={styles.buttonText}>Scannear QR Code</Text>
      </TouchableOpacity>

      <Text style={styles.placeholder}>
      Leia o QR Code disponível no local indicado pela charada.
      </Text>
    </View>


  );
}
