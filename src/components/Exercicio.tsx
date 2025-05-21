import React, { useState } from "react";
import { StyleSheet, Text, Switch, Pressable, View, Image, TextInput, Alert } from "react-native";

const CadastroPaciente = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [comorbidade, setComorbidade] = useState(false);
  const botaoCadastro = () => {
    Alert.alert(
      "Paciente Cadastrado",
      `Nome: ${nome}\nEmail: ${email}\nTelefone: ${telefone}\nComorbidade: ${comorbidade ? "Sim" : "Não"}`
    );
  };

  const botaoCancelar = () => {
    setNome("");
    setEmail("");
    setTelefone("");
    setComorbidade(false);
  };

  const urlImagem = "https://cdn-icons-png.flaticon.com/512/6009/6009864.png";

  return (
    <View style={styles.container}>
      <Image source={{ uri: urlImagem }} style={styles.imagem} />
      <Text style={styles.titulo}>Cadastro</Text>

      <Text style={styles.label}>Nome:</Text>
      <TextInput
        value={nome}
        onChangeText={setNome}
        placeholder="Digite seu nome completo"
        style={styles.input}
      />

      <Text style={styles.label}>E-mail:</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Digite seu e-mail"
        keyboardType="email-address"
        style={styles.input}
      />

      <Text style={styles.label}>Telefone:</Text>
      <TextInput
        value={telefone}
        onChangeText={setTelefone}
        placeholder="Digite seu telefone"
        keyboardType="phone-pad"
        style={styles.input}
      />

      <Text style={styles.label}>Possui Comorbidade?</Text>
      <View style={styles.switchContainer}>
        <Switch
          value={comorbidade}
          onValueChange={setComorbidade}
        />
        <Text style={styles.switchLabel}>{comorbidade ? "Sim" : "Não"}</Text>
      </View>

      <View style={styles.buttonsContainer}>
        <Pressable style={styles.botaoCadastrar} onPress={botaoCadastro}>
          <Text style={styles.textoBotao}>Cadastrar</Text>
        </Pressable>
        <Pressable style={styles.botaoCancelar} onPress={botaoCancelar}>
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
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  switchLabel: {
    marginLeft: 10,
    fontSize: 16,
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

export default CadastroPaciente;