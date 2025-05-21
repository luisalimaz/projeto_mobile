import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  Pressable,
} from "react-native";
import firestore from "@react-native-firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { Produto } from "../types/Produto";
import { DetalhesProdutoProps, ListaProdutosProps } from "../navigation/HomeNavigator";

const TelaListaProdutos = (props:ListaProdutosProps) => { 
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [busca, setBusca] = useState("");
 

  useEffect(() => {
    const unsubscribe = firestore()
      .collection("produtos")
      .onSnapshot((snapshot) => {
        const lista = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }as Produto));
        setProdutos(lista);
      });

    return () => unsubscribe();
  }, []);

  const produtosFiltrados = produtos.filter((p) =>
    p.nome.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Produtos</Text>
      <TextInput
        placeholder="Buscar por nome"
        value={busca}
        onChangeText={setBusca}
        style={styles.input}
      />
      <FlatList
        data={produtosFiltrados}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable
            style={styles.item}
            onPress={() => props.navigation.navigate("TelaDetalhesProduto", { produtoId: item.id })}
          >
            <Text style={styles.nome}>{item.nome}</Text>
            <Text style={styles.desc}>Preço: R$ {item.preco}</Text>
          </Pressable>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  titulo: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  item: {
    padding: 15,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    marginBottom: 10,
  },
  nome: { fontSize: 18, fontWeight: "bold" },
  desc: { fontSize: 14, color: "#555" },
});

export default TelaListaProdutos;