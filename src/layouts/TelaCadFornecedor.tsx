import React, { useState, useEffect } from "react";
import { Alert, Pressable, StyleSheet, Text, TextInput, View, Image, ScrollView } from "react-native";
import firestore from "@react-native-firebase/firestore";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {CadastroFornecedorProps} from "../navigation/HomeNavigator";


const TelaCadFornecedor = (props:CadastroFornecedorProps) => {
  const [nome, setNome] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [produtos, setProdutos] = useState<any[]>([]);
  const [produtosSelecionados, setProdutosSelecionados] = useState<string[]>([]);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection("produtos")
      .onSnapshot((snapshot) => {
        const lista = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProdutos(lista);
      });

    return unsubscribe;
  }, []);

  const toggleProduto = (id: string) => {
    if (produtosSelecionados.includes(id)) {
      setProdutosSelecionados(produtosSelecionados.filter((pid) => pid !== id));
    } else {
      setProdutosSelecionados([...produtosSelecionados, id]);
    }
  };

  function verificarCampos() {
    if (!nome.trim()) {
      Alert.alert("Nome em branco", "Digite um nome.");
      return false;
    }
    if (!cnpj.trim()) {
      Alert.alert("CNPJ em branco", "Digite o CNPJ.");
      return false;
    }
    if (!telefone.trim()) {
      Alert.alert("Telefone em branco", "Digite o telefone.");
      return false;
    }
    if (!email.trim()) {
      Alert.alert("Email em branco", "Digite o email.");
      return false;
    }
    return true;
  }

  function cadastrarFornecedor() {
    if (!verificarCampos()) return;

    const fornecedor = {
      nome,
      cnpj,
      telefone,
      email,
      produtos: produtosSelecionados,
    };

    firestore()
      .collection("fornecedores")
      .add(fornecedor)
      .then(() => {
        Alert.alert("Fornecedor cadastrado", "Dados gravados com sucesso.");
        props.navigation.goBack();
      })
      .catch((error) => {
        Alert.alert("Erro ao cadastrar", String(error));
      });
  }

  function cancelarCadastro() {
    setNome("");
    setCnpj("");
    setTelefone("");
    setEmail("");
    setProdutosSelecionados([]);
  }

  const urlImagem = "https://cdn-icons-png.flaticon.com/512/1098/1098081.png";

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: urlImagem }} style={styles.imagem} />
      <Text style={styles.titulo}>Cadastro de Fornecedor</Text>

      <Text style={styles.label}>Nome:</Text>
      <TextInput value={nome} onChangeText={setNome} style={styles.input} placeholder="Nome do fornecedor" />

      <Text style={styles.label}>CNPJ:</Text>
      <TextInput value={cnpj} onChangeText={setCnpj} style={styles.input} placeholder="CNPJ" />

      <Text style={styles.label}>Telefone:</Text>
      <TextInput value={telefone} onChangeText={setTelefone} style={styles.input} placeholder="Telefone" keyboardType="phone-pad" />

      <Text style={styles.label}>Email:</Text>
      <TextInput value={email} onChangeText={setEmail} style={styles.input} placeholder="Email" keyboardType="email-address" />

      <Text style={styles.label}>Produtos Fornecidos:</Text>
      {produtos.map((produto) => (
        <Pressable key={produto.id} onPress={() => toggleProduto(produto.id)} style={styles.produtoItem}>
          <Text style={{ color: produtosSelecionados.includes(produto.id) ? "#4CAF50" : "#333" }}>
            {produtosSelecionados.includes(produto.id) ? "✓ " : ""}{produto.nome}
          </Text>
        </Pressable>
      ))}

      <View style={styles.buttonsContainer}>
        <Pressable style={styles.botaoCadastrar} onPress={cadastrarFornecedor}>
          <Text style={styles.textoBotao}>Cadastrar</Text>
        </Pressable>
        <Pressable style={styles.botaoCancelar} onPress={cancelarCadastro}>
          <Text style={styles.textoBotao}>Cancelar</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f4f4f4",
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
    marginTop: 15,
    marginBottom: 8,
  },
  input: {
    height: 40,
    backgroundColor: "#fff",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
  },
  produtoItem: {
    padding: 10,
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
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

export default TelaCadFornecedor;