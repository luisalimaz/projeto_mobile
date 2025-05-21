import React, { useState } from "react";
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
} from "react-native";
import firestore from "@react-native-firebase/firestore";
import { CadastroProdutoProps } from "../navigation/HomeNavigator";

const TelaCadProduto = (props: CadastroProdutoProps) => {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [estoque, setEstoque] = useState("");

  function verificarCampos() {
    if (!nome.trim()) {
      Alert.alert("Nome em branco", "Digite o nome do produto");
      return false;
    }
    if (!descricao.trim()) {
      Alert.alert("Descrição em branco", "Digite a descrição do produto");
      return false;
    }
    if (!preco.trim() || isNaN(Number(preco))) {
      Alert.alert("Preço inválido", "Digite um valor numérico para o preço");
      return false;
    }
    if (!estoque.trim() || isNaN(Number(estoque))) {
      Alert.alert("Estoque inválido", "Digite um valor numérico para o estoque");
      return false;
    }
    return true;
  }

  function cadastrarProduto() {
    if (!verificarCampos()) return;

    const produto = {
      nome,
      descricao,
      preco: parseFloat(preco),
      estoque: parseInt(estoque),
    };

    firestore()
      .collection("produtos")
      .add(produto)
      .then(() => {
        Alert.alert("Produto Cadastrado", "Dados gravados com sucesso.");
        props.navigation.goBack();
      })
      .catch((error) => {
        Alert.alert("Erro ao cadastrar", String(error));
      });
  }

  function cancelarCadastro() {
    setNome("");
    setDescricao("");
    setPreco("");
    setEstoque("");
  }

  const urlImagem = "https://cdn-icons-png.flaticon.com/512/1170/1170678.png";

  return (
    <View style={styles.container}>
      <Image source={{ uri: urlImagem }} style={styles.imagem} />
      <Text style={styles.titulo}>Cadastro de Produto</Text>

      <Text style={styles.label}>Nome do Produto:</Text>
      <TextInput
        value={nome}
        onChangeText={setNome}
        placeholder="Digite o nome do produto"
        style={styles.input}
      />

      <Text style={styles.label}>Descrição:</Text>
      <TextInput
        value={descricao}
        onChangeText={setDescricao}
        placeholder="Digite a descrição do produto"
        style={styles.input}
      />

      <Text style={styles.label}>Preço:</Text>
      <TextInput
        value={preco}
        onChangeText={setPreco}
        placeholder="Digite o preço"
        keyboardType="numeric"
        style={styles.input}
      />

      <Text style={styles.label}>Quantidade em Estoque:</Text>
      <TextInput
        value={estoque}
        onChangeText={setEstoque}
        placeholder="Digite a quantidade"
        keyboardType="numeric"
        style={styles.input}
      />

      <View style={styles.buttonsContainer}>
        <Pressable style={styles.botaoCadastrar} onPress={cadastrarProduto}>
          <Text style={styles.textoBotao}>Cadastrar</Text>
        </Pressable>
        <Pressable style={styles.botaoCancelar} onPress={cancelarCadastro}>
          <Text style={styles.textoBotao}>Cancelar</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f4f4f4",
    justifyContent: "center",
  },
  imagem: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginBottom: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingLeft: 10,
    backgroundColor: "#fff",
  },
  buttonsContainer: {
    marginTop: 20,
  },
  botaoCadastrar: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    borderRadius: 5,
    marginBottom: 10,
  },
  botaoCancelar: {
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

export default TelaCadProduto;