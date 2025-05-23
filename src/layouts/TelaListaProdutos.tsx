import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  Pressable,
  ScrollView,
} from "react-native";
import firestore from "@react-native-firebase/firestore";

interface Produto {
  id: string;
  nome: string;
  preco: number;
}

interface Fornecedor {
  id: string;
  nome: string;
  cnpj: string;
  telefone: string;
  email: string;
  produtos: string[]; // ids dos produtos que fornece
}

type ViewType = "produtos" | "fornecedores";

const TelaListaProdutosFornecedores = (props: any) => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [fornecedores, setFornecedores] = useState<Fornecedor[]>([]);
  const [buscaProduto, setBuscaProduto] = useState("");
  const [buscaFornecedor, setBuscaFornecedor] = useState("");
  const [view, setView] = useState<ViewType>("produtos"); // toggle view

  useEffect(() => {
    const unsubProdutos = firestore()
      .collection("produtos")
      .onSnapshot((snapshot) => {
        const lista = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Produto[];
        setProdutos(lista);
      });

    const unsubFornecedores = firestore()
      .collection("fornecedores")
      .onSnapshot((snapshot) => {
        const lista = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Fornecedor[];
        setFornecedores(lista);
      });

    return () => {
      unsubProdutos();
      unsubFornecedores();
    };
  }, []);

  // Filtrar produtos pelo nome (busca)
  const produtosFiltrados = produtos.filter((p) =>
    p.nome.toLowerCase().includes(buscaProduto.toLowerCase())
  );

  // Filtrar fornecedores pelo nome (busca)
  const fornecedoresFiltrados = fornecedores.filter((f) =>
    f.nome.toLowerCase().includes(buscaFornecedor.toLowerCase())
  );

  // Obter nomes dos fornecedores que fornecem o produto
  const obterNomesFornecedores = (produtoId: string): string[] => {
    return fornecedores
      .filter((f) => f.produtos.includes(produtoId))
      .map((f) => f.nome);
  };

  // Obter nomes dos produtos que o fornecedor oferece
  const obterNomesProdutos = (idsProdutos: string[]) => {
    return produtos
      .filter((p) => idsProdutos.includes(p.id))
      .map((p) => p.nome);
  };

  return (
    <View style={styles.container}>
      {/* Toggle simples */}
      <View style={styles.toggleContainer}>
        <Pressable
          onPress={() => setView("produtos")}
          style={[
            styles.toggleButton,
            view === "produtos" && styles.toggleButtonActive,
          ]}
        >
          <Text
            style={[
              styles.toggleText,
              view === "produtos" && styles.toggleTextActive,
            ]}
          >
            Produtos
          </Text>
        </Pressable>
        <Pressable
          onPress={() => setView("fornecedores")}
          style={[
            styles.toggleButton,
            view === "fornecedores" && styles.toggleButtonActive,
          ]}
        >
          <Text
            style={[
              styles.toggleText,
              view === "fornecedores" && styles.toggleTextActive,
            ]}
          >
            Fornecedores
          </Text>
        </Pressable>
      </View>

      {view === "produtos" ? (
        <>
          <Text style={styles.titulo}>Produtos</Text>
          <TextInput
            placeholder="Buscar produto"
            value={buscaProduto}
            onChangeText={setBuscaProduto}
            style={styles.input}
          />
          <FlatList
            data={produtosFiltrados}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              const nomesFornecedores = obterNomesFornecedores(item.id);
              return (
                <Pressable
                  style={styles.item}
                  onPress={() =>
                    props.navigation.navigate("TelaDetalhesProduto", {
                      produtoId: item.id,
                    })
                  }
                >
                  <Text style={styles.nome}>{item.nome}</Text>
                  <Text style={styles.desc}>Preço: R$ {item.preco}</Text>
                  {nomesFornecedores.length > 0 && (
                    <Text style={styles.fornecedor}>
                      Fornecedor(es): {nomesFornecedores.join(", ")}
                    </Text>
                  )}
                </Pressable>
              );
            }}
            ListEmptyComponent={
              <Text style={{ textAlign: "center", marginTop: 20 }}>
                Nenhum produto encontrado.
              </Text>
            }
          />
        </>
      ) : (
        <>
          <Text style={styles.titulo}>Fornecedores</Text>
          <TextInput
            placeholder="Buscar fornecedor"
            value={buscaFornecedor}
            onChangeText={setBuscaFornecedor}
            style={styles.input}
          />
          <ScrollView style={{ flex: 1 }}>
            {fornecedoresFiltrados.length === 0 && (
              <Text style={{ textAlign: "center", marginTop: 20 }}>
                Nenhum fornecedor encontrado.
              </Text>
            )}
            {fornecedoresFiltrados.map((fornecedor) => {
              const nomesProdutos = obterNomesProdutos(fornecedor.produtos || []);
              return (
                <View key={fornecedor.id} style={styles.cardFornecedor}>
                  <Text style={styles.nome}>{fornecedor.nome}</Text>
                  <Text style={styles.info}>CNPJ: {fornecedor.cnpj}</Text>
                  <Text style={styles.info}>Telefone: {fornecedor.telefone}</Text>
                  <Text style={styles.info}>Email: {fornecedor.email}</Text>
                  <Text style={styles.info}>
                    Produtos:{" "}
                    {nomesProdutos.length > 0
                      ? nomesProdutos.join(", ")
                      : "Nenhum"}
                  </Text>
                </View>
              );
            })}
          </ScrollView>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  toggleContainer: {
    flexDirection: "row",
    marginBottom: 15,
    borderRadius: 8,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#b159b9",
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: "#f3e8f7",
    alignItems: "center",
  },
  toggleButtonActive: {
    backgroundColor: "#b159b9",
  },
  toggleText: {
    color: "#8e4f9e",
    fontWeight: "700",
  },
  toggleTextActive: {
    color: "#fff",
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#8e4f9e",
  },
  input: {
    borderColor: "#b159b9",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 40,
    marginBottom: 15,
    color: "#6e2f73",
  },
  item: {
    padding: 15,
    backgroundColor: "#f9e6f7",
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#d18ccb",
  },
  nome: { fontSize: 18, fontWeight: "700", color: "#6e2f73", marginBottom: 4 },
  desc: { fontSize: 14, color: "#7a4e85" },
  fornecedor: { fontSize: 13, color: "#7a4e85", marginTop: 6 },
  cardFornecedor: {
    backgroundColor: "#f9e6f7",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#d18ccb",
  },
  info: { fontSize: 14, color: "#7a4e85", marginBottom: 4 },
});

export default TelaListaProdutosFornecedores;
