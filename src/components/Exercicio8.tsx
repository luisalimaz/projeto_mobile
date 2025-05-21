
import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

import Exercicio07 from './Exercicio7'; 

const ListaDeItens = () => {
  const [texto, setTexto] = useState('');
  const [itens, setItens] = useState<string[]>([]);
  const [itemSelecionado, setItemSelecionado] = useState<string | null>(null);

  const adicionarItem = () => {
    if (texto.trim() === '') return;
    setItens([...itens, texto]);
    setTexto('');
  };

  const selecionarItem = (item: string) => {
    setItemSelecionado(item);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Lista de Itens</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite algo"
        value={texto}
        onChangeText={setTexto}
      />

      <Pressable style={styles.botao} onPress={adicionarItem}>
        <Text style={styles.textoBotao}>Adicionar</Text>
      </Pressable>

      <FlatList
        data={itens}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => selecionarItem(item)}>
            <Text style={styles.itemLista}>• {item}</Text>
          </TouchableOpacity>
        )}
      />

      {itemSelecionado && (
        <Text style={styles.itemSelecionado}>
          Você selecionou: {itemSelecionado}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#F5F5F5',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 40,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  botao: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: 'center',
  },
  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  itemLista: {
    fontSize: 16,
    marginBottom: 5,
    color: '#444',
  },
  itemSelecionado: {
    marginTop: 20,
    fontSize: 16,
    fontStyle: 'italic',
    color: '#555',
    textAlign: 'center',
  },
});

export default ListaDeItens;