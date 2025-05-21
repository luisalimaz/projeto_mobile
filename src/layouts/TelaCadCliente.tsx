import React, { useState } from "react";
import { Alert, Pressable, StyleSheet, Text, TextInput, View, Switch, Image } from "react-native";
import firestore from "@react-native-firebase/firestore";
import { cadastroProps } from "../navigation/HomeNavigator";
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Setting a timer']);

const TelaCadCliente = (props: cadastroProps) => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [comorbidade, setComorbidade] = useState(false);

  console.log('Tela de cadastro de cliente iniciada');

  function verificarCampos() {
    console.log('Verificando campos');
    if (!nome.trim()) {
      console.log('Nome em branco');
      Alert.alert("Nome em branco", "Digite um nome");
      return false;
    }
    if (!email.trim()) {
      console.log('Email em branco');
      Alert.alert("Email em branco", "Digite um email");
      return false;
    }
    if (!telefone.trim()) {
      console.log('Telefone em branco');
      Alert.alert("Telefone em branco", "Digite um telefone");
      return false;
    }
    console.log('Campos válidos');
    return true;
  }

  function cadastrarCliente() {
    console.log('Cadastrando cliente');
    if (!verificarCampos()) return;

    const cliente = {
      nome,
      email,
      telefone,
      comorbidade,
    };

    console.log('Dados do cliente:', cliente);

    firestore()
      .collection("clientes")
      .add(cliente)
      .then(() => {
        console.log('Cliente cadastrado com sucesso');
        Alert.alert("Cliente Cadastrado", "Dados gravados com sucesso.");
        props.navigation.goBack();
      })
      .catch((error) => {
        console.log('Erro ao cadastrar cliente:', error);
        Alert.alert("Erro ao cadastrar", String(error));
      });
  }

  function cancelarCadastro() {
    console.log('Cadastro cancelado');
    setNome("");
    setEmail("");
    setTelefone("");
    setComorbidade(false);
  }

  const urlImagem = "https://cdn-icons-png.flaticon.com/512/6009/6009864.png";

  return (
    <View style={styles.container}>
      <Image source={{ uri: urlImagem }} style={styles.imagem} />
      <Text style={styles.titulo}>Cadastro de Cliente</Text>

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
        <Switch value={comorbidade} onValueChange={setComorbidade} />
        <Text style={styles.switchLabel}>{comorbidade ? "Sim" : "Não"}</Text>
      </View>

      <View style={styles.buttonsContainer}>
        <Pressable style={styles.botaoCadastrar} onPress={cadastrarCliente}>
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

export default TelaCadCliente;
import { Alert, Pressable, StyleSheet, Text, TextInput, View, Switch, Image } from "react-native";
import firestore from "@react-native-firebase/firestore";
import { cadastroProps } from "../navigation/HomeNavigator";

const TelaCadCliente = (props: cadastroProps) => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [comorbidade, setComorbidade] = useState(false);

  function verificarCampos() {
    if (!nome.trim()) {
      Alert.alert("Nome em branco", "Digite um nome");
      return false;
    }
    if (!email.trim()) {
      Alert.alert("Email em branco", "Digite um email");
      return false;
    }
    if (!telefone.trim()) {
      Alert.alert("Telefone em branco", "Digite um telefone");
      return false;
    }
    return true;
  }

  function cadastrarCliente() {
    if (!verificarCampos()) return;

    const cliente = {
      nome,
      email,
      telefone,
      comorbidade,
    };

    firestore()
      .collection("clientes")
      .add(cliente)
      .then(() => {
        Alert.alert("Cliente Cadastrado", "Dados gravados com sucesso.");
        props.navigation.goBack();
      })
      .catch((error) => {
        Alert.alert("Erro ao cadastrar", String(error));
      });
  }

  function cancelarCadastro() {
    setNome("");
    setEmail("");
    setTelefone("");
    setComorbidade(false);
  }

  const urlImagem = "https://cdn-icons-png.flaticon.com/512/6009/6009864.png";

  return (
    <View style={styles.container}>
      <Image source={{ uri: urlImagem }} style={styles.imagem} />
      <Text style={styles.titulo}>Cadastro de Cliente</Text>

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
        <Switch value={comorbidade} onValueChange={setComorbidade} />
        <Text style={styles.switchLabel}>{comorbidade ? "Sim" : "Não"}</Text>
      </View>

      <View style={styles.buttonsContainer}>
        <Pressable style={styles.botaoCadastrar} onPress={cadastrarCliente}>
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

export default TelaCadCliente;
