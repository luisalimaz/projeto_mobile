import React, { useState } from "react";
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import firestore from "@react-native-firebase/firestore";
import { CadastroProdutoProps } from "../navigation/HomeNavigator";

const categorias = ["Maquiagem", "Perfume", "Skincare"];

const TelaCadProduto = (props: CadastroProdutoProps) => {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [estoque, setEstoque] = useState("");
  const [categoria, setCategoria] = useState<string | null>(null);
  const [imagemUri, setImagemUri] = useState<string | null>(null);

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
    if (!categoria) {
      Alert.alert("Categoria não selecionada", "Selecione uma categoria para o produto");
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
      categoria,
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
    setCategoria(null);
  }

  const urlImagem = "https://cdn-icons-png.flaticon.com/512/1170/1170678.png";

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.container}>
          {imagemUri ? (
            <Image source={{ uri: imagemUri }} style={styles.imagemProduto} />
          ) : (
            <Image source={{ uri: urlImagem }} style={styles.imagem} />
          )}

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

          <Text style={styles.label}>Categoria:</Text>
          <View style={styles.categoriaContainer}>
            {categorias.map((cat) => (
              <Pressable
                key={cat}
                style={[
                  styles.categoriaButton,
                  categoria === cat && styles.categoriaSelecionada,
                ]}
                onPress={() => setCategoria(cat)}
              >
                <Text
                  style={[
                    styles.categoriaTexto,
                    categoria === cat && styles.categoriaTextoSelecionado,
                  ]}
                >
                  {cat}
                </Text>
              </Pressable>
            ))}
          </View>

          <View style={styles.buttonsContainer}>
            <Pressable style={styles.botaoCadastrar} onPress={cadastrarProduto}>
              <Text style={styles.textoBotao}>Cadastrar</Text>
            </Pressable>
            <Pressable style={styles.botaoCancelar} onPress={cancelarCadastro}>
              <Text style={styles.textoBotao}>Cancelar</Text>
            </Pressable>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default TelaCadProduto;

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: "#fafafa",
  },
  imagem: {
    width: 120,
    height: 120,
    alignSelf: "center",
    marginBottom: 16,
    borderRadius: 15,
    backgroundColor: "#e1bee7",
    shadowColor: "#9c27b0",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6,
  },
  imagemProduto: {
    width: 140,
    height: 140,
    alignSelf: "center",
    marginBottom: 16,
    borderRadius: 15,
    shadowColor: "#7b1fa2",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 8,
  },
  titulo: {
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 30,
    color: "#6a1b9a",
    fontFamily: "System",
  },
  label: {
    fontSize: 17,
    marginBottom: 10,
    color: "#4a148c",
    fontWeight: "600",
  },
  input: {
    height: 48,
    borderColor: "#ce93d8",
    borderWidth: 1.5,
    borderRadius: 12,
    marginBottom: 18,
    paddingHorizontal: 15,
    backgroundColor: "#f3e5f5",
    color: "#4a148c",
    fontSize: 16,
    fontWeight: "500",
    shadowColor: "#ba68c8",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },
  categoriaContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 28,
  },
  categoriaButton: {
    flex: 1,
    paddingVertical: 12,
    marginHorizontal: 6,
    backgroundColor: "#ce93d8",
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#ab47bc",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 7,
    elevation: 5,
  },
  categoriaSelecionada: {
    backgroundColor: "#6a1b9a",
  },
  categoriaTexto: {
    color: "#4a148c",
    fontWeight: "700",
    fontSize: 15,
  },
  categoriaTextoSelecionado: {
    color: "#f3e5f5",
  },
  buttonsContainer: {
    marginTop: 12,
    marginBottom: 30,
  },
  botaoCadastrar: {
    backgroundColor: "#7b1fa2",
    paddingVertical: 14,
    borderRadius: 25,
    marginBottom: 16,
    shadowColor: "#4a148c",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 7,
    alignItems: "center",
  },
  botaoCancelar: {
    backgroundColor: "#ab47bc",
    paddingVertical: 14,
    borderRadius: 25,
    shadowColor: "#7b1fa2",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 7,
    elevation: 5,
    alignItems: "center",
  },
  textoBotao: {
    color: "#f3e5f5",
    fontWeight: "700",
    fontSize: 18,
  },
});
