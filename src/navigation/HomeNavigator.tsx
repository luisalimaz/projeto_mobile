import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack";

// Telas principais
import TelaPrincipal from "../layouts/TelaPrincipal";

// Telas de produto
import TelaCadProduto from "../layouts/TelaCadProduto";
import TelaListaProdutos from "../layouts/TelaListaProdutos";
import TelaDetalhesProduto from "../layouts/TelaDetalhesProduto";

// Telas de categoria
import TelaCadCategoria from "../layouts/TelaCadCategoria";

// Telas de fornecedor
import TelaCadFornecedor from "../layouts/TelaCadFornecedor";

// Telas de venda
import TelaCadVenda from "../layouts/TelaCadVenda";

// Define quais as telas e os parâmetros de cada tela
type RootStackParamList = {
  TelaPrincipal: undefined;
  TelaCadProduto: undefined;
  TelaListaProdutos: undefined;
  TelaDetalhesProduto: { produtoId: string };
  TelaCadCategoria: undefined;
  TelaCadFornecedor: undefined;
  TelaCadVenda: undefined;
};

// Cria a Stack (navegação em pilha)
const Stack = createNativeStackNavigator<RootStackParamList>();

// Cria o navegador da pilha
const HomeNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="TelaPrincipal"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="TelaPrincipal" component={TelaPrincipal} />
      <Stack.Screen name="TelaCadProduto" component={TelaCadProduto} />
      <Stack.Screen name="TelaListaProdutos" component={TelaListaProdutos} />
      <Stack.Screen name="TelaDetalhesProduto" component={TelaDetalhesProduto} />
      <Stack.Screen name="TelaCadCategoria" component={TelaCadCategoria} />
      <Stack.Screen name="TelaCadFornecedor" component={TelaCadFornecedor} />
      <Stack.Screen name="TelaCadVenda" component={TelaCadVenda} />
    </Stack.Navigator>
  );
};

// Tipagens para props de navegação
type PrincipalProps = NativeStackScreenProps<RootStackParamList, 'TelaPrincipal'>;
type CadastroProdutoProps = NativeStackScreenProps<RootStackParamList, 'TelaCadProduto'>;
type ListaProdutosProps = NativeStackScreenProps<RootStackParamList, 'TelaListaProdutos'>;
type DetalhesProdutoProps = NativeStackScreenProps<RootStackParamList, 'TelaDetalhesProduto'>;
type CadastroCategoriaProps = NativeStackScreenProps<RootStackParamList, 'TelaCadCategoria'>;
type CadastroFornecedorProps = NativeStackScreenProps<RootStackParamList, 'TelaCadFornecedor'>;
type CadastroVendaProps = NativeStackScreenProps<RootStackParamList, 'TelaCadVenda'>;

export default HomeNavigator;

// Exporta os tipos
export type {
  PrincipalProps,
  CadastroProdutoProps,
  ListaProdutosProps,
  DetalhesProdutoProps,
  CadastroCategoriaProps,
  CadastroFornecedorProps,
  CadastroVendaProps
};