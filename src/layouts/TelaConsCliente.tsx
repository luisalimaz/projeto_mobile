import { useState, useEffect } from "react";
import { Alert, Pressable, FlatList, StyleSheet, Text, View } from "react-native";

import firestore from "@react-native-firebase/firestore";
import { consClienteProps} from "../navigation/HomeNavigator";
import { Cliente } from "../types/Cliente";
import { styles } from "../styles/styles";

const TelaConsCliente = (props: consClienteProps) => {
  const [clientes, setClientes] = useState<Cliente[]>([]);

  useEffect(() => {
    const subscribe = firestore()
      .collection('clientes')
      .onSnapshot(querySnapshot => {
        const data = querySnapshot.docs.map(doc => {
          return {
            id: doc.id,
            ...doc.data()
          }
        }) as Cliente[];

        setClientes(data);
      });

    return () => subscribe();
  }, []);

  function deletarCliente(id: string) {
    firestore()
      .collection('clientes')
      .doc(id)
      .delete()
      .then(() => {
        Alert.alert("Cliente", "Removido com sucesso");
      })
      .catch((error) => console.log(error));
  }

  function alterarCliente(id: string) {
    // Descomente se já tiver a tela de alteração criada
    // props.navigation.navigate("TelaAltCliente", { id: id });
  }

  return (
    <View style={styles.tela}>
      <Text style={styles.tituloTela}>Listagem de Clientes</Text>

      <FlatList
        data={clientes}
        keyExtractor={(item) => item.id}
        renderItem={(info) => (
          <ItemCliente
            numeroOrdem={info.index + 1}
            cliente={info.item}
            onDeletar={deletarCliente}
            onAlterar={alterarCliente}
          />
        )}
      />

      <View style={styles.centralizar}>
        <Pressable
          style={[styles.botao, { width: '40%' }]}
          onPress={() => props.navigation.goBack()}>
          <Text style={styles.texto_botao}>Voltar</Text>
        </Pressable>
      </View>
    </View>
  );
};

type ItemClienteProps = {
  numeroOrdem: number;
  cliente: Cliente;
  onDeletar: (id: string) => void;
  onAlterar: (id: string) => void;
};

const ItemCliente = (props: ItemClienteProps) => {
  return (
    <View style={styles_local.card}>
      <View style={styles_local.dados_card}>
        <Text style={{ fontSize: 30, color: 'black' }}>
          {props.numeroOrdem + ' - ' + props.cliente.nome}
        </Text>
        <Text style={{ fontSize: 20 }}>
          ID: {props.cliente.id}
        </Text>
        <Text style={{ fontSize: 20 }}>
          CPF: {props.cliente.cpf}
        </Text>
        <Text style={{ fontSize: 20 }}>
          Telefone: {props.cliente.telefone}
        </Text>
      </View>

      <View style={styles_local.botoes_card}>
        <View style={styles_local.botao_deletar}>
          <Pressable onPress={() => props.onDeletar(props.cliente.id)}>
            <Text style={styles_local.texto_botao_card}>X</Text>
          </Pressable>
        </View>
        <View style={styles_local.botao_alterar}>
          <Pressable onPress={() => props.onAlterar(props.cliente.id)}>
            <Text style={styles_local.texto_botao_card}>A</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default TelaConsCliente;

const styles_local = StyleSheet.create({
  card: {
    borderWidth: 2,
    borderColor: 'grey',
    margin: 5,
    borderRadius: 10,
    padding: 3,
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  dados_card: {
    flex: 1,
  },
  botoes_card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  botao_deletar: {
    backgroundColor: 'red',
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  botao_alterar: {
    backgroundColor: 'yellow',
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  texto_botao_card: {
    fontWeight: "bold",
    fontSize: 40,
    color: 'black',
  },
});
