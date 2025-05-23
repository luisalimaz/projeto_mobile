import React, { useState, useEffect } from "react";
import { Alert, Pressable, StyleSheet, Text, TextInput, View, Image, ScrollView } from "react-native";
import firestore from "@react-native-firebase/firestore";
import { CadastroFornecedorProps } from "../navigation/HomeNavigator";

const TelaCadFornecedor = (props: CadastroFornecedorProps) => {
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

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        <Image
          source={require('../images/logo.png')} // arquivo local      
          style={styles.imagem_200}
          resizeMode="cover"
        />
      </View>

      <Text style={styles.label}>Nome:</Text>
      <TextInput
        value={nome}
        onChangeText={setNome}
        style={styles.input}
        placeholder="Nome do fornecedor"
        placeholderTextColor="#b484b3"
      />

      <Text style={styles.label}>CNPJ:</Text>
      <TextInput
        value={cnpj}
        onChangeText={setCnpj}
        style={styles.input}
        placeholder="CNPJ"
        placeholderTextColor="#b484b3"
      />

      <Text style={styles.label}>Telefone:</Text>
      <TextInput
        value={telefone}
        onChangeText={setTelefone}
        style={styles.input}
        placeholder="Telefone"
        keyboardType="phone-pad"
        placeholderTextColor="#b484b3"
      />

      <Text style={styles.label}>Email:</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        placeholderTextColor="#b484b3"
      />

      <Text style={styles.label}>Produtos Fornecidos:</Text>
      {produtos.map((produto) => (
        <Pressable
          key={produto.id}
          onPress={() => toggleProduto(produto.id)}
          style={[
            styles.produtoItem,
            produtosSelecionados.includes(produto.id) && styles.produtoSelecionado,
          ]}
        >
          <Text style={{ color: produtosSelecionados.includes(produto.id) ? "#fff" : "#7a4e85" }}>
            {produtosSelecionados.includes(produto.id) ? "✓ " : ""}
            {produto.nome}
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
    padding: 25,
    backgroundColor: "#fdf6fb",
    flexGrow: 1,
  },
  imagem_200: {
    width: 200,
    height: 200,
    alignSelf: "center",
    marginBottom: 25,
    borderRadius: 100, // borda arredondada, deixa circular
    borderWidth: 2,
    borderColor: "#d88fc4",
    backgroundColor: "#fff",
  },
  imagem: {
    width: 110,
    height: 110,
    alignSelf: "center",
    marginBottom: 25,
    borderRadius: 55,
    borderWidth: 2,
    borderColor: "#d88fc4",
    backgroundColor: "#fff",
  },
  titulo: {
    fontSize: 26,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 30,
    color: "#8e4f9e",
    fontFamily: "HelveticaNeue-Medium",
  },
  label: {
    fontSize: 17,
    marginTop: 20,
    marginBottom: 8,
    color: "#a46d9d",
    fontWeight: "600",
  },
  input: {
    height: 45,
    backgroundColor: "#fff0f7",
    borderColor: "#d18ccb",
    borderWidth: 1.5,
    borderRadius: 10,
    paddingLeft: 15,
    color: "#6e2f73",
    fontWeight: "500",
    fontSize: 15,
  },
  produtoItem: {
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#d3a9d8",
    marginBottom: 12,
    backgroundColor: "#f9e6f7",
  },
  produtoSelecionado: {
    backgroundColor: "#b765af",
    borderColor: "#973f93",
  },
  buttonsContainer: {
    marginTop: 30,
  },
  botaoCadastrar: {
    backgroundColor: "#b159b9",
    paddingVertical: 15,
    borderRadius: 12,
    marginBottom: 14,
    shadowColor: "#b159b9",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 15,
    elevation: 5,
  },
  botaoCancelar: {
    backgroundColor: "#d884c6",
    paddingVertical: 15,
    borderRadius: 12,
    shadowColor: "#d884c6",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 3,
  },
  textoBotao: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700",
    fontSize: 18,
    fontFamily: "HelveticaNeue-Medium",
  },
});

export default TelaCadFornecedor;
