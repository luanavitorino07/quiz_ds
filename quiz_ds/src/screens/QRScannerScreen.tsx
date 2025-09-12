import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Alert, Dimensions } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useQuiz } from '../context/QuizContext';

type Props = NativeStackScreenProps<RootStackParamList, 'QRScanner'>;

const { width, height } = Dimensions.get('window');
const overlaySize = width * 0.7; // tamanho do quadrado guia

export default function QRScannerScreen({ route,navigation }: Props) {
   const { blocoNumero, respostaCorreta } = route.params;
  const { setDesbloqueadoAte } = useQuiz(); 
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);


  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.centered}>
        <Text>Sem acesso à câmera</Text>
        <Button title="Permitir câmera" onPress={requestPermission} />
      </View>
    );
  }

const handleBarCodeScanned = ({ data }: { data: string }) => {
  setScanned(true);
  if (data.toLowerCase() == respostaCorreta.toLowerCase()) {
    Alert.alert("✅ QR Code correto!", "Próximo bloco liberado.");
    const limite = blocoNumero * 5 - 1;
    setDesbloqueadoAte(limite);
    navigation.pop(2);
  } else {
    Alert.alert("❌ QR Code inválido", "O QR não corresponde à resposta dessa charada.");
    setScanned(false);
  }

};

  return (
    <View style={{ flex: 1 }}>
      <CameraView
        style={{ flex: 1 }}
        facing="back"
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
      />

      {/* Overlay quadrado central */}
      <View style={styles.overlay}>
        <View style={styles.cornerTopLeft} />
        <View style={styles.cornerTopRight} />
        <View style={styles.cornerBottomLeft} />
        <View style={styles.cornerBottomRight} />
      </View>

      {scanned && (
        <View style={styles.buttonContainer}>
          <Button title="Escanear novamente" onPress={() => setScanned(false)} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cornerTopLeft: {
    position: 'absolute',
    top: (height - overlaySize) / 2,
    left: (width - overlaySize) / 2,
    width: 40,
    height: 40,
    borderLeftWidth: 4,
    borderTopWidth: 4,
    borderColor: '#FFF',
  },
  cornerTopRight: {
    position: 'absolute',
    top: (height - overlaySize) / 2,
    right: (width - overlaySize) / 2,
    width: 40,
    height: 40,
    borderRightWidth: 4,
    borderTopWidth: 4,
    borderColor: '#FFF',
  },
  cornerBottomLeft: {
    position: 'absolute',
    bottom: (height - overlaySize) / 2,
    left: (width - overlaySize) / 2,
    width: 40,
    height: 40,
    borderLeftWidth: 4,
    borderBottomWidth: 4,
    borderColor: '#FFF',
  },
  cornerBottomRight: {
    position: 'absolute',
    bottom: (height - overlaySize) / 2,
    right: (width - overlaySize) / 2,
    width: 40,
    height: 40,
    borderRightWidth: 4,
    borderBottomWidth: 4,
    borderColor: '#FFF',
  },
});
