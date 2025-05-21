import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, Alert, StyleSheet } from 'react-native';

const AlunoInfoCompleto = () => {
  const [nome, setNome] = useState('');
  const [nota1, setNota1] = useState('');
  const [nota2, setNota2] = useState('');
  const [media, setMedia] = useState<number | null>(null);
  const [status, setStatus] = useState('');

  const calcularMedia = () => {
    if (nome.trim() === '') {
      Alert.alert('Erro', 'Digite o nome do aluno');
      return;
    }

    const n1 = parseFloat(nota1);
    const n2 = parseFloat(nota2);

    if (isNaN(n1) || isNaN(n2)) {
      Alert.alert('Erro', 'Digite notas válidas');
      return;
    }

    const resultado = (n1 + n2) / 2;
    setMedia(resultado);
    setStatus(resultado >= 7 ? 'Aprovado' : 'Reprovado');
  };

  const limparCampos = () => {
    setNome('');
    setNota1('');
    setNota2('');
    setMedia(null);
    setStatus('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo2}>Nome do Aluno:</Text>
      <TextInput
        style={styles.caixa_texto}
        placeholder="Digite o nome"
        onChangeText={setNome}
        value={nome}
      />

      <Text style={styles.titulo2}>Nota 1:</Text>
      <TextInput
        style={styles.caixa_texto}
        placeholder="Digite a nota 1"
        keyboardType="numeric"
        onChangeText={setNota1}
        value={nota1}
      />

      <Text style={styles.titulo2}>Nota 2:</Text>
      <TextInput
        style={styles.caixa_texto}
        placeholder="Digite a nota 2"
        keyboardType="numeric"
        onChangeText={setNota2}
        value={nota2}
      />

      <Pressable
        style={({ pressed }) => [styles.botao, pressed && styles.click]}
        onPress={calcularMedia}
      >
        <Text style={styles.texto_botao}>Calcular</Text>
      </Pressable>

      <Pressable
        style={[styles.botao, { backgroundColor: '#f44336', marginTop: 10 }]}
        onPress={limparCampos}
      >
        <Text style={styles.texto_botao}>Limpar</Text>
      </Pressable>

      {media !== null && (
        <View style={styles.resultado}>
          <Text style={styles.resultadoTexto}>Aluno: {nome}</Text>
          <Text style={styles.resultadoTexto}>Média: {media.toFixed(1)}</Text>
          <Text style={styles.resultadoTexto}>Status: {status}</Text>

          {status === 'Aprovado' ? (
            <Text style={styles.aprovadoMensagem}>
              Parabéns, {nome}! Você foi aprovado!
            </Text>
          ) : (
            <Text style={styles.reprovadoMensagem}>
              Que pena, {nome}... Você foi reprovado. Sempre de o seu melhor... Tente novamente!
            </Text>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: 20,
  },

  titulo2: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 10,
  },

  caixa_texto: {
    width: '100%',
    height: 50,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },

  botao: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginTop: 20,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },

  click: {
    backgroundColor: '#45a049',
  },

  texto_botao: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },

  resultado: {
    marginTop: 20,
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    alignItems: 'center',
  },

  resultadoTexto: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },

  aprovadoMensagem: {
    marginTop: 10,
    color: '#2e7d32',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  reprovadoMensagem: {
    marginTop: 10,
    color: '#c62828',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default AlunoInfoCompleto;