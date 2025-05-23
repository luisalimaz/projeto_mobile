import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Alert,
  ScrollView,
} from "react-native";
import firestore from "@react-native-firebase/firestore";
import { useRoute, useNavigation } from "@react-navigation/native";

interface Fornecedor {
  id: string;
  nome: string;
  produtos: string[];
}

const TelaDetalhesProduto = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { produtoId } = route.params as { produtoId: string };

  const [produto, setProduto] = useState<any>(null);
  const [fornecedores, setFornecedores] = useState<Fornecedor[]>([]);

  useEffect(() => {
    const unsubscribeProduto = firestore()
      .collection("produtos")
      .doc(produtoId)
      .onSnapshot((doc) => {
        setProduto({ id: doc.id, ...doc.data() });
      });

    const unsubscribeFornecedores = firestore()
      .collection("fornecedores")
      .where("produtos", "array-contains", produtoId)
      .onSnapshot((snapshot) => {
        const lista = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Fornecedor[];
        setFornecedores(lista);
      });

    return () => {
      unsubscribeProduto();
      unsubscribeFornecedores();
    };
  }, [produtoId]);

  const atualizarProduto = () => {
    if (
      !produto.nome ||
      !produto.descricao ||
      isNaN(produto.preco) ||
      isNaN(produto.estoque)
    ) {
      Alert.alert("Erro", "Preencha os dados corretamente.");
      return;
    }

    firestore()
      .collection("produtos")
      .doc(produto.id)
      .update({
        nome: produto.nome,
        descricao: produto.descricao,
        preco: parseFloat(produto.preco),
        estoque: parseInt(produto.estoque),
      })
      .then(() => Alert.alert("Atualizado com sucesso!"))
      .catch((err) => Alert.alert("Erro ao atualizar", String(err)));
  };

  const excluirProduto = () => {
    Alert.alert("Confirmar exclusão", "Deseja excluir este produto?", [
      { text: "Cancelar" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: () => {
          firestore()
            .collection("produtos")
            .doc(produto.id)
            .delete()
            .then(() => {
              Alert.alert("Produto excluído");
              navigation.goBack();
            })
            .catch((err) =>
              Alert.alert("Erro ao excluir produto", String(err))
            );
        },
      },
    ]);
  };

  if (!produto) return <Text style={styles.loading}>Carregando...</Text>;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Detalhes do Produto</Text>

      <TextInput
        style={styles.input}
        value={produto.nome}
        onChangeText={(text) => setProduto({ ...produto, nome: text })}
        placeholder="Nome"
        placeholderTextColor="#d3a2c7"
      />
      <TextInput
        style={[styles.input, styles.textArea]}
        value={produto.descricao}
        onChangeText={(text) => setProduto({ ...produto, descricao: text })}
        placeholder="Descrição"
        placeholderTextColor="#d3a2c7"
        multiline
        numberOfLines={4}
      />
      <TextInput
        style={styles.input}
        value={String(produto.preco)}
        onChangeText={(text) => setProduto({ ...produto, preco: text })}
        placeholder="Preço"
        keyboardType="numeric"
        placeholderTextColor="#d3a2c7"
      />
      <TextInput
        style={styles.input}
        value={String(produto.estoque)}
        onChangeText={(text) => setProduto({ ...produto, estoque: text })}
        placeholder="Estoque"
        keyboardType="numeric"
        placeholderTextColor="#d3a2c7"
      />

      {/* Lista de fornecedores relacionados */}
      <View style={styles.fornecedoresContainer}>
        <Text style={styles.fornecedoresTitulo}>Fornecedores:</Text>
        {fornecedores.length === 0 ? (
          <Text style={styles.semFornecedor}>
            Nenhum fornecedor cadastrado para este produto.
          </Text>
        ) : (
          fornecedores.map((f) => (
            <Text key={f.id} style={styles.fornecedorNome}>
              • {f.nome}
            </Text>
          ))
        )}
      </View>

      <Pressable style={styles.botaoSalvar} onPress={atualizarProduto}>
        <Text style={styles.textoBotao}>Salvar Alterações</Text>
      </Pressable>

      <Pressable style={styles.botaoExcluir} onPress={excluirProduto}>
        <Text style={styles.textoBotao}>Excluir Produto</Text>
      </Pressable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: "#fff0f6",
    flexGrow: 1,
  },
  loading: {
    marginTop: 50,
    fontSize: 18,
    color: "#b159b9",
    fontWeight: "600",
    textAlign: "center",
  },
  titulo: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 30,
    color: "#8e4f9e",
    textAlign: "center",
    fontFamily: "System",
  },
  input: {
    backgroundColor: "#f9e6f7",
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 20,
    color: "#6e2f73",
    shadowColor: "#b159b9",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  fornecedoresContainer: {
    marginBottom: 30,
    padding: 20,
    backgroundColor: "#f3d9f3",
    borderRadius: 16,
    shadowColor: "#b159b9",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6,
  },
  fornecedoresTitulo: {
    fontWeight: "700",
    fontSize: 20,
    color: "#8e4f9e",
    marginBottom: 12,
  },
  fornecedorNome: {
    fontSize: 18,
    marginLeft: 12,
    marginBottom: 8,
    color: "#6e2f73",
  },
  semFornecedor: {
    fontSize: 16,
    fontStyle: "italic",
    color: "#9e7da7",
    textAlign: "center",
  },
  botaoSalvar: {
    backgroundColor: "#b159b9",
    paddingVertical: 14,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: "#8e4f9e",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 7,
  },
  botaoExcluir: {
    backgroundColor: "#e44a82",
    paddingVertical: 14,
    borderRadius: 12,
    shadowColor: "#d14375",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 7,
  },
  textoBotao: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700",
    fontSize: 18,
  },
});

export default TelaDetalhesProduto;
