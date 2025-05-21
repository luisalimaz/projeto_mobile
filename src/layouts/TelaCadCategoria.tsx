import React, { useState } from "react";
import { Alert, Pressable, StyleSheet, Text, TextInput, View, Image } from "react-native";
import firestore from "@react-native-firebase/firestore";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {   CadastroCategoriaProps } from "../navigation/HomeNavigator";


const TelaCadCategoria = (props:CadastroCategoriaProps) => {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");

  function verificarCampos() {
    if (!nome.trim()) {
      Alert.alert("Nome em branco", "Digite um nome para a categoria.");
      return false;
    }
    if (!descricao.trim()) {
      Alert.alert("Descrição em branco", "Digite uma descrição.");
      return false;
    }
    return true;
  }

  function cadastrarCategoria() {
    if (!verificarCampos()) return;

    const categoria = {
      nome,
      descricao,
    };

    firestore()
      .collection("categorias")
      .add(categoria)
      .then(() => {
        Alert.alert("Categoria cadastrada", "Dados gravados com sucesso.");
        props.navigation.goBack();
      })
      .catch((error) => {
        Alert.alert("Erro ao cadastrar", String(error));
      });
  }

  function cancelarCadastro() {
    setNome("");
    setDescricao("");
  }

  const urlImagem = "https://cdn-icons-png.flaticon.com/512/990/990276.png";

  return (
    <View style={styles.container}>
      <Image source={{ uri: urlImagem }} style={styles.imagem} />
      <Text style={styles.titulo}>Cadastro de Categoria</Text>

      <Text style={styles.label}>Nome da categoria:</Text>
      <TextInput
        value={nome}
        onChangeText={setNome}
        placeholder="Ex: Maquiagem"
        style={styles.input}
      />

      <Text style={styles.label}>Descrição:</Text>
      <TextInput
        value={descricao}
        onChangeText={setDescricao}
        placeholder="Descreva a categoria"
        style={styles.input}
      />

      <View style={styles.buttonsContainer}>
        <Pressable style={styles.botaoCadastrar} onPress={cadastrarCategoria}>
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

export default TelaCadCategoria;