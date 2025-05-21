import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Pressable,
  StyleSheet,
  Alert,
} from "react-native";
import firestore from "@react-native-firebase/firestore";

const TelaCadVenda = ({ navigation }: any) => {
  const [nomeCliente, setNomeCliente] = useState("");
  const [telefoneCliente, setTelefoneCliente] = useState("");
  const [produtos, setProdutos] = useState<any[]>([]);
  const [selecionados, setSelecionados] = useState<string[]>([]);
  const [total, setTotal] = useState(0);

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

  useEffect(() => {
    // Recalcula total sempre que selecionados mudam
    let soma = 0;
    selecionados.forEach((id) => {
      const produto = produtos.find((p) => p.id === id);
      if (produto?.preco) soma += Number(produto.preco);
    });
    setTotal(soma);
  }, [selecionados, produtos]);

  function toggleSelecionado(id: string) {
    if (selecionados.includes(id)) {
      setSelecionados(selecionados.filter((item) => item !== id));
    } else {
      setSelecionados([...selecionados, id]);
    }
  }

  function salvarVenda() {
    if (!nomeCliente.trim()) {
      Alert.alert("Erro", "Digite o nome do cliente");
      return;
    }
    if (!telefoneCliente.trim()) {
      Alert.alert("Erro", "Digite o telefone do cliente");
      return;
    }
    if (selecionados.length === 0) {
      Alert.alert("Erro", "Selecione pelo menos um produto");
      return;
    }

    const venda = {
      dataVenda: new Date(),
      cliente: {
        nome: nomeCliente,
        telefone: telefoneCliente,
      },
      produtosVendidos: selecionados,
      valorTotal: total,
    };

    firestore()
      .collection("vendas")
      .add(venda)
      .then(() => {
        Alert.alert("Sucesso", "Venda cadastrada com sucesso!");
        navigation.goBack();
      })
      .catch((error) => {
        Alert.alert("Erro", "Não foi possível cadastrar venda: " + error);
      });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Cadastro de Venda</Text>

      <Text style={styles.label}>Nome do Cliente:</Text>
      <TextInput
        style={styles.input}
        value={nomeCliente}
        onChangeText={setNomeCliente}
        placeholder="Digite o nome"
      />

      <Text style={styles.label}>Telefone do Cliente:</Text>
      <TextInput
        style={styles.input}
        value={telefoneCliente}
        onChangeText={setTelefoneCliente}
        placeholder="Digite o telefone"
        keyboardType="phone-pad"
      />

      <Text style={styles.label}>Produtos:</Text>
      <FlatList
        data={produtos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const selecionado = selecionados.includes(item.id);
          return (
            <Pressable
              style={[
                styles.itemProduto,
                selecionado && styles.itemSelecionado,
              ]}
              onPress={() => toggleSelecionado(item.id)}
            >
              <Text style={styles.nomeProduto}>{item.nome}</Text>
              <Text style={styles.precoProduto}>R$ {item.preco?.toFixed(2)}</Text>
            </Pressable>
          );
        }}
      />

      <Text style={styles.total}>Valor total: R$ {total.toFixed(2)}</Text>

      <Pressable style={styles.botaoSalvar} onPress={salvarVenda}>
        <Text style={styles.textoBotao}>Salvar Venda</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    alignSelf: "center",
  },
  label: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: "#999",
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  itemProduto: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
    marginBottom: 8,
    backgroundColor: "#fff",
  },
  itemSelecionado: {
    backgroundColor: "#cde1f9",
    borderColor: "#3b82f6",
  },
  nomeProduto: {
    fontSize: 16,
  },
  precoProduto: {
    fontSize: 16,
    fontWeight: "bold",
  },
  total: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 20,
    alignSelf: "flex-end",
  },
  botaoSalvar: {
    backgroundColor: "#4CAF50",
    paddingVertical: 14,
    borderRadius: 6,
  },
  textoBotao: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
  },
});

export default TelaCadVenda;