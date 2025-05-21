import React from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';
import CampoDeTexto from './CampoDeTexto'; 

const Exercicio4 = () => {
  const mostrarMensagem = (mensagem: string) => {
    Alert.alert("Texto Recebido", mensagem);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Exercício 5</Text>
      <CampoDeTexto onPressBotao={mostrarMensagem} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f0f0'
  },
  titulo: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold'
  }
});

export default Exercicio4;
