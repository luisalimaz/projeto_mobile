import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Alert,
} from "react-native";
import firestore from "@react-native-firebase/firestore";
import { useRoute, useNavigation } from "@react-navigation/native";

const TelaDetalhesProduto = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { produtoId } = route.params as { produtoId: string };

  const [produto, setProduto] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection("produtos")
      .doc(produtoId)
      .onSnapshot((doc) => {
        setProduto({ id: doc.id, ...doc.data() });
      });

    return () => unsubscribe();
  }, []);

  const atualizarProduto = () => {
    if (!produto.nome || !produto.descricao || isNaN(produto.preco) || isNaN(produto.estoque)) {
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
            });
        },
      },
    ]);
  };

  if (!produto) return <Text>Carregando...</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Detalhes do Produto</Text>

      <TextInput
        style={styles.input}
        value={produto.nome}
        onChangeText={(text) => setProduto({ ...produto, nome: text })}
        placeholder="Nome"
      />
      <TextInput
        style={styles.input}
        value={produto.descricao}
        onChangeText={(text) => setProduto({ ...produto, descricao: text })}
        placeholder="Descrição"
      />
      <TextInput
        style={styles.input}
        value={String(produto.preco)}
        onChangeText={(text) => setProduto({ ...produto, preco: text })}
        placeholder="Preço"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        value={String(produto.estoque)}
        onChangeText={(text) => setProduto({ ...produto, estoque: text })}
        placeholder="Estoque"
        keyboardType="numeric"
      />

      <Pressable style={styles.botaoSalvar} onPress={atualizarProduto}>
        <Text style={styles.textoBotao}>Salvar Alterações</Text>
      </Pressable>

      <Pressable style={styles.botaoExcluir} onPress={excluirProduto}>
        <Text style={styles.textoBotao}>Excluir Produto</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  titulo: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    height: 40,
  },
  botaoSalvar: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    borderRadius: 5,
    marginBottom: 10,
  },
  botaoExcluir: {
    backgroundColor: "#F44336",
    paddingVertical: 12,
    borderRadius: 5,
  },
  textoBotao: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default TelaDetalhesProduto;