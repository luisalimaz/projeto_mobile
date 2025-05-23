import React from "react";
import { View, Text, Pressable, ScrollView, Image, StyleSheet } from "react-native";
import { PrincipalProps } from "../navigation/HomeNavigator";

const TelaPrincipal = ({ navigation }: PrincipalProps) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Logo redonda */}
      <Image
        source={require('../images/logo.png')}
        style={styles.logo}
        resizeMode="cover"
      />

      <Pressable style={styles.botao} onPress={() => navigation.navigate("TelaCadProduto")}>
        <Text style={styles.textoBotao}>Cadastro de Produtos</Text>
      </Pressable>

      <Pressable style={styles.botao} onPress={() => navigation.navigate("TelaListaProdutos")}>
        <Text style={styles.textoBotao}>Lista de Produtos</Text>
      </Pressable>

      <Pressable style={styles.botao} onPress={() => navigation.navigate("TelaCadCategoria")}>
        <Text style={styles.textoBotao}>Categorias Disponiveis</Text>
      </Pressable>

      <Pressable style={styles.botao} onPress={() => navigation.navigate("TelaCadFornecedor")}>
        <Text style={styles.textoBotao}>Cadastro de Fornecedores</Text>
      </Pressable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff0f6",
    padding: 30,
    justifyContent: "center",
    alignItems: "center",
  },
logo: {
  width: 240,
  height: 240,
  marginBottom: 40,
  borderRadius: 120,
},

  botao: {
    backgroundColor: "#e83e8c",
    paddingVertical: 16,
    paddingHorizontal: 30,
    borderRadius: 12,
    marginVertical: 10,
    width: "80%",
    shadowColor: "#e83e8c",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
    alignItems: "center",
  },
  textoBotao: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default TelaPrincipal;
