import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  ActivityIndicator,
} from "react-native";
import firestore from "@react-native-firebase/firestore";

const categoriasFixas = ["Maquiagem", "Perfume", "Skincare"];

const TelaCategoriasProdutos = () => {
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<string | null>(null);
  const [produtos, setProdutos] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (categoriaSelecionada) {
      setLoading(true);
      const unsubscribe = firestore()
        .collection("produtos")
        .where("categoria", "==", categoriaSelecionada)
        .onSnapshot(
          (querySnapshot) => {
            const listaProdutos: any[] = [];
            querySnapshot.forEach((doc) => {
              listaProdutos.push({ id: doc.id, ...doc.data() });
            });
            setProdutos(listaProdutos);
            setLoading(false);
          },
          (error) => {
            console.log(error);
            setLoading(false);
          }
        );
      return () => unsubscribe();
    }
  }, [categoriaSelecionada]);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Escolha a Categoria</Text>

      <View style={styles.botoesContainer}>
        {categoriasFixas.map((cat) => (
          <Pressable
            key={cat}
            style={[
              styles.botaoCategoria,
              categoriaSelecionada === cat && styles.botaoSelecionado,
            ]}
            onPress={() => setCategoriaSelecionada(cat)}
          >
            <Text
              style={[
                styles.textoBotao,
                categoriaSelecionada === cat && styles.textoSelecionado,
              ]}
            >
              {cat}
            </Text>
          </Pressable>
        ))}
      </View>

      {categoriaSelecionada && (
        <View style={styles.listaContainer}>
          <Text style={styles.subtitulo}>Produtos de {categoriaSelecionada}:</Text>
          {loading ? (
            <ActivityIndicator size="large" color="#d81b60" />
          ) : produtos.length === 0 ? (
            <Text style={styles.semProdutos}>Nenhum produto encontrado.</Text>
          ) : (
            <FlatList
              data={produtos}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.produtoItem}>
                  <Text style={styles.nomeProduto}>{item.nome}</Text>
                  <Text style={styles.descricaoProduto}>Descrição: {item.descricao}</Text>
                  <Text style={styles.precoProduto}>Preço: R$ {item.preco.toFixed(2)}</Text>
                  <Text style={styles.estoqueProduto}>Estoque: {item.estoque}</Text>
                </View>
              )}
            />
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fce4ec" },
  titulo: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#ad1457",
  },
  botoesContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  botaoCategoria: {
    backgroundColor: "#f8bbd0",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ec407a",
  },
  botaoSelecionado: {
    backgroundColor: "#c2185b",
    borderColor: "#ad1457",
  },
  textoBotao: {
    fontWeight: "bold",
    color: "#880e4f",
    fontSize: 16,
  },
  textoSelecionado: {
    color: "#fff",
  },
  listaContainer: { flex: 1 },
  subtitulo: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#6a1b9a",
  },
  semProdutos: {
    fontStyle: "italic",
    color: "#8e24aa",
    textAlign: "center",
    marginTop: 20,
  },
  produtoItem: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    borderLeftWidth: 6,
    borderLeftColor: "#ab47bc",
    elevation: 3,
  },
  nomeProduto: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#6a1b9a",
    marginBottom: 4,
  },
  descricaoProduto: { color: "#555", marginBottom: 2 },
  precoProduto: { color: "#d81b60", fontWeight: "bold" },
  estoqueProduto: { color: "#7b1fa2" },
});

export default TelaCategoriasProdutos;
