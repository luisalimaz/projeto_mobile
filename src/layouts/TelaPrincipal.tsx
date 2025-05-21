// layouts/TelaPrincipal.tsx
import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { PrincipalProps } from '../navigation/HomeNavigator'; // Importa a tipagem de navegação
import { styles } from '../styles/styles'; // Estilos externos

const TelaPrincipal = ({ navigation }: PrincipalProps) => {
  return (
    <View style={styles.tela}>
      <Text style={styles.titulo}>Tela Principal</Text>

  


      <Pressable style={styles.botao} onPress={() => navigation.navigate('TelaCadProduto')}>
        <Text style={styles.texto_botao}>Cadastro de Produtos</Text>
      </Pressable>

      <Pressable style={styles.botao} onPress={() => navigation.navigate('TelaListaProdutos')}>
        <Text style={styles.texto_botao}>Lista de Produtos</Text>
      </Pressable>

      <Pressable style={styles.botao} onPress={() => navigation.navigate('TelaCadCategoria')}>
        <Text style={styles.texto_botao}>Cadastro de Categorias</Text>
      </Pressable>

      <Pressable style={styles.botao} onPress={() => navigation.navigate('TelaCadFornecedor')}>
        <Text style={styles.texto_botao}>Cadastro de Fornecedores</Text>
      </Pressable>

      <Pressable style={styles.botao} onPress={() => navigation.navigate('TelaCadVenda')}>
        <Text style={styles.texto_botao}>Cadastro de Vendas</Text>
      </Pressable>
    </View>
  );
};

export default TelaPrincipal;